<script>
  import AmountPicker from "../components/AmountPicker.svelte";
  import UsernameDisplay from "../components/UsernameDisplay.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import UserSearch from "../components/UserSearch.svelte";

  import { navigate } from "../router.js";
  import { gift, searchUser } from "../api.js";
  import RippleButton from "../components/RippleButton.svelte";
  import { ArrowLeft, Search, X } from "@lucide/svelte";
  const PRICE_RUB = 1.42;

  let amount = 0;
  const params = new URLSearchParams(window.location.search);
  let username = params.get("username") || "";
  let loading = false;
  let errors = {
    amount: null,
    username: null,
    general: null,
  };
  let usernameInput = "";
  let foundUser = null;
  let isSearching = false;
  let searchResults = [];
  let showSearchResults = false;

  // Если есть username в URL, попробуем найти пользователя
  $: if (username && !foundUser) {
    searchUserByUsername(username);
  }

  async function searchUserByUsername(username) {
    if (!username.trim()) return;

    isSearching = true;
    errors.username = null;
    try {
      const user = await searchUser(username.trim());
      if (user) {
        foundUser = user;
        usernameInput = user.username;
        errors.username = null;
        showSearchResults = false;
      } else {
        errors.username = "Пользователь не найден";
        foundUser = null;
      }
    } catch (error) {
      errors.username = "Ошибка поиска пользователя";
      foundUser = null;
    } finally {
      isSearching = false;
    }
  }

  async function handleUsernameSearch() {
    if (!usernameInput.trim()) return;

    isSearching = true;
    showSearchResults = false;
    errors.username = null;

    try {
      const user = await searchUser(usernameInput.trim());
      if (user) {
        foundUser = user;
        usernameInput = user.username;
        errors.username = null;
        showSearchResults = false;
      } else {
        errors.username = "Пользователь не найден";
        foundUser = null;
      }
    } catch (error) {
      errors.username = "Ошибка поиска пользователя";
      foundUser = null;
    } finally {
      isSearching = false;
    }
  }

  function clearUser() {
    foundUser = null;
    usernameInput = "";
    errors.username = null;
    showSearchResults = false;
  }

  function validateForm() {
    errors = {};

    // Validate amount
    if (!amount || amount < 1) {
      errors.amount = "Минимальная сумма подарка: 1 звезда";
    } else if (amount > 10000) {
      errors.amount = "Максимальная сумма подарка: 10000 звёзд";
    } else if (Number.isNaN(amount)) {
      errors.amount = "Введите число";
    }

    // Validate user found
    if (!foundUser) {
      errors.username = "Выберите пользователя для подарка";
    }

    return Object.keys(errors).length === 0;
  }

  async function confirm() {
    console.log("confirm function called");
    console.log("amount:", amount);
    console.log("foundUser:", foundUser);

    if (!validateForm()) {
      console.log("form validation failed");
      return;
    }

    const fromId = window.Telegram.WebApp.initDataUnsafe?.user?.id || 0;
    console.log("fromId:", fromId);
    loading = true;
    errors.general = null;

    try {
      if ((amount !== 888 && !fromId) || !foundUser || amount < 1) {
        console.log("validation failed in confirm");
        errors.general = "Ошибка авторизации или неверные данные";
        return;
      }

      console.log("calling gift API with:", {
        fromId,
        toId: foundUser.id,
        amount,
      });
      const result = await gift(fromId, foundUser.id, amount);
      console.log("gift API result:", result);

      if (result.ok) {
        const tx = {
          type: "giftSent",
          toId: foundUser.id,
          toUsername: foundUser.username,
          toFullName: foundUser.fullName,
          amount,
          time: Date.now(),
        };
        const history = JSON.parse(localStorage.getItem("history") || "[]");
        history.push(tx);
        localStorage.setItem("history", JSON.stringify(history));
        localStorage.setItem("lastPurchase", JSON.stringify(tx));

        navigate("/success");
      } else {
        errors.general = "Ошибка при отправке подарка. Попробуйте еще раз.";
      }
    } catch (error) {
      console.error("Error in confirm function:", error);
      errors.general =
        "Произошла ошибка при отправке подарка. Попробуйте еще раз.";
    } finally {
      loading = false;
    }
  }
</script>

<div style="color: #222;">
  <RippleButton onClick={() => navigate("/")}><ArrowLeft /></RippleButton>
  <h2 style="display: inline;">Подарок Другу</h2>
</div>

<br />

<div style="position: relative;">
  {#if foundUser}
    <!-- Отображение выбранного пользователя -->
    <div
      style="
        display: flex; 
        align-items: center; 
        justify-content: space-between;
        padding: 12px; 
        border: 1px solid #ddd; 
        border-radius: 8px; 
        background: #f8f9fa;
        margin-bottom: 8px;
      "
    >
      <div style="display: flex; align-items: center; gap: 8px;">
        <div
          style="
            width: 32px; 
            height: 32px; 
            background: #007bff; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            color: white;
            font-weight: bold;
          "
        >
          {foundUser.name
            ? foundUser.name.charAt(0).toUpperCase()
            : foundUser.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style="font-weight: 500; color: #333;">
            {foundUser.name || "Пользователь"}
          </div>
          <div style="font-size: 14px; color: #888;">
            @{foundUser.username}
          </div>
        </div>
      </div>
      <RippleButton onClick={clearUser} style="padding: 4px; min-width: auto;">
        <X size={16} />
      </RippleButton>
    </div>
  {:else}
    <!-- Поиск пользователя -->
    <div style="display: flex; gap: 8px; margin-bottom: 8px;">
      <input
        placeholder="Telegram Username"
        autocomplete="off"
        name="username"
        type="text"
        bind:value={usernameInput}
        class:error={errors.username}
        style="flex: 1; border: 1px solid #ddd; margin: 0; border-radius: 8px; font-size: 16px;"
      />
      <RippleButton
        onClick={handleUsernameSearch}
        disabled={!usernameInput.trim() || isSearching}
        style="padding: 8px 24px;"
      >
        {#if isSearching}
          <div
            style="width: 16px; height: 16px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"
          ></div>
        {:else}
          <Search size={16} />
        {/if}
      </RippleButton>
    </div>
  {/if}

  {#if errors.username}
    <div style="color: #e74c3c; font-size: 14px; margin-top: 4px;">
      {errors.username}
    </div>
  {/if}
</div>

<AmountPicker onSelect={(val) => (amount = val)} />
{#if errors.amount}
  <div style="color: #e74c3c; font-size: 14px; margin-top: 4px;">
    {errors.amount}
  </div>
{/if}

{#if errors.general}
  <div
    style="color: #e74c3c; font-size: 14px; margin: 8px 0; padding: 8px; background: #fdf2f2; border-radius: 4px;"
  >
    {errors.general}
  </div>
{/if}

<RippleButton
  disabled={loading}
  kind="buy"
  onClick={confirm}
  style="margin-top: 8px;"
>
  Подарить{parseInt(amount) || 0 ? " за " + amount * PRICE_RUB + "₽" : ""}
</RippleButton>

{#if loading}
  <LoadingOverlay />
{/if}

<style>
  .error {
    border-color: #e74c3c !important;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
