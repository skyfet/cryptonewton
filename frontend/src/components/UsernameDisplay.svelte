<script>
  export let username = '';
  export let fullName = '';
  export let showUsername = true;
</script>

<h2>
  {#if fullName}
    <b>{fullName}</b>
    {#if showUsername && username}
      <span style="font-weight: normal; color: #888; font-size: 0.9em;">
        (@{username})
      </span>
    {/if}
  {:else}
    <b>{username}</b>
  {/if}
</h2>
