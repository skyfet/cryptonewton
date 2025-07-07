<div class="overlay">
  <div class="spinner"></div>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--tg-bg-color, rgba(255, 255, 255, 0.9));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--tg-hint-color, #ccc);
    border-top-color: var(--tg-button-color, #0077ff);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
