
      /**
       * Attaches the click event listener to the mobile menu toggle button.
       */
      function attachNavbarEvents() {
        const toggleButton = document.querySelector(".menu-toggle");
        const navLinks = document.querySelector(".nav-links");

        if (toggleButton && navLinks) {
          // Toggle the main menu visibility on mobile
          toggleButton.addEventListener("click", function () {
            navLinks.classList.toggle("active");
          });
        }
      }

      // Ensure the script runs after the entire HTML structure is loaded
      window.onload = attachNavbarEvents;
