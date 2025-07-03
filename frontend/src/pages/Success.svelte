<script>
  import { navigate } from '../router.js';
</script>

<div class="container">
  <div class="check">✓</div>
  <p>Готово</p>
  <button class="btn" on:click={() => navigate('/')}>На главную</button>
</div>

<style>
.check {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid var(--tg-button-color, #0077ff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  font-size: 48px;
  color: var(--tg-button-color, #0077ff);
  animation: pop 0.5s ease;
}
@keyframes pop {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
</style>
