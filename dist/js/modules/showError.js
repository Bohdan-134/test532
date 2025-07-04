export function initErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    const errorButtons = document.querySelectorAll('[data-error="show"]');
  
    errorButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (!errorMessage) return;
  
        errorMessage.classList.add('active');
  
        setTimeout(() => {
          errorMessage.classList.remove('active');
        }, 3000);
      });
    });
  }