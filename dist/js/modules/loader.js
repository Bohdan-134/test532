export function initLoader() {
    document.addEventListener("DOMContentLoaded", function () {
      const loader = document.querySelector(".loader-wrapper");
      if (loader) loader.classList.add("active");
    });
  
    window.addEventListener("load", function () {
      const loader = document.querySelector(".loader-wrapper");
      if (loader) loader.classList.remove("active");
    });
  }