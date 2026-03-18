(function() {
  function setExpanded(toggle, isOpen) {
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  function closeAllDropdowns(dropdowns) {
    dropdowns.forEach(function(dropdown) {
      dropdown.classList.remove("open");
      setExpanded(dropdown.querySelector(".language-dropdown-toggle"), false);
    });
  }

  function initLanguageDropdowns() {
    var dropdowns = document.querySelectorAll(".language-dropdown");
    if (!dropdowns.length) return;

    dropdowns.forEach(function(dropdown) {
      var toggle = dropdown.querySelector(".language-dropdown-toggle");
      if (!toggle) return;

      toggle.addEventListener("click", function(event) {
        event.stopPropagation();
        var willOpen = !dropdown.classList.contains("open");
        closeAllDropdowns(dropdowns);
        if (willOpen) {
          dropdown.classList.add("open");
          setExpanded(toggle, true);
        }
      });
    });

    document.addEventListener("click", function() {
      closeAllDropdowns(dropdowns);
    });

    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        closeAllDropdowns(dropdowns);
      }
    });
  }

  function init() {
    initLanguageDropdowns();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


(function initQR() {
  const qr = document.getElementsByClassName('sticky-qr')[0];
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      qr.classList.add('visible');
    } else {
      qr.classList.remove('visible');
    }
  });
})()
