export function initTabs() {
    const tabButtons = document.querySelectorAll('button[data-tab]');
    const tabSections = document.querySelectorAll('section[data-tab]');
  
    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
  
        tabButtons.forEach((btn) => {
          btn.classList.toggle('active', btn.dataset.tab === targetTab);
        });
  
        tabSections.forEach((section) => {
          section.classList.toggle('active', section.dataset.tab === targetTab);
        });
      });
    });
  }