// Wedding Invitation JavaScript
// Modular structure for better maintainability and clarity

// Configuration and Constants
const CONFIG = {
  FIREBASE: {
    apiKey: "AIzaSyDmypsckUaJPTCr4u-nRtSlCQVmoHGEibk",
    authDomain: "wedding-guestbook-9d290.firebaseapp.com",
    databaseURL:
      "https://wedding-guestbook-9d290-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wedding-guestbook-9d290",
    storageBucket: "wedding-guestbook-9d290.appspot.com",
    messagingSenderId: "955528844935",
    appId: "1:955528844935:web:c9e40f65a4901eba32ca22",
    measurementId: "G-20VMYH24QZ",
  },
  WEDDING_DATE: new Date("2025-11-29T15:00:00+09:00").getTime(), // WIT timezone
  COUNTDOWN_SELECTOR: "#days, #hours, #minutes, #seconds",
  NOTIFICATION_TIMEOUT: 3000,
};

// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

/**
 * Main Application Class
 * Organizes all functionality in a single, cohesive object
 */
class WeddingApp {
  constructor() {
    this.app = initializeApp(CONFIG.FIREBASE);
    this.db = getDatabase(this.app);
    this.state = {
      isMusicPlaying: false,
      isDarkMode: false,
      isInvitationOpened: false,
    };
    this.elements = {};
    this.timers = [];
    this.init();
  }

  /**
   * Initialize the application
   * Sets up DOM elements and initializes components
   */
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.setupElements();
      this.initializePreloader();
      this.initializeNavigation();
      this.initializeEnvelopeAnimation();
      this.initializeMusicControls();
      this.initializeThemeToggle();
      this.initializeScrollAnimations();
      this.initializeCountdown();
      this.initializeBackToTop();
      this.initializeGiftButton();
      this.initializeGallery();
      this.initializeWishesForm();
      this.initializeRSVPForm();
      this.initializeLazyLoading();
      this.initializeMobileMenu();
      this.restoreUserPreferences();
      this.window.scrollTo(0, 0);
    });
  }

  /**
   * Setup DOM element references
   */
  setupElements() {
    this.elements = {
      preloader: document.getElementById("preloader"),
      openInvitationBtn: document.getElementById("openInvitation"),
      envelope: document.querySelector(".envelope"),
      invitationContent: document.querySelector(".invitation-content"),
      backgroundMusic: document.getElementById("backgroundMusic"),
      musicToggle: document.getElementById("musicToggle"),
      themeToggle: document.getElementById("themeToggle"),
      navbar: document.getElementById("navbar"),
      wishesForm: document.getElementById("wishesForm"),
      wishesDisplay: document.getElementById("wishesDisplay"),
      rsvpForm: document.getElementById("rsvpForm"),
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
      mobileMenuButton: document.getElementById("mobileMenuButton"),
      mobileMenu: document.getElementById("mobileMenu"),
      scrollDownIndicator: document.getElementById("scrollDownIndicator"),
    };
  }

  /**
   * Preloader functionality
   */
  initializePreloader() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      if (this.elements.preloader) {
        this.elements.preloader.style.opacity = "0";
        setTimeout(() => {
          this.elements.preloader.style.display = "none";
        }, 1000);
      }
    }, 3000);
  }

  /**
   * Navigation functionality
   */

  // Smooth scroll for navigation links
  initializeNavigation() {
    // Smooth scroll for navigation links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("bg-opacity-95", "shadow-lg");
      } else {
        navbar.classList.remove("bg-opacity-95", "shadow-lg");
      }
    });
  }
  /**
   * Envelope opening animation
   */
  initializeEnvelopeAnimation() {
    // Disable scrolling until invitation is opened
    const noScroll = () => window.scrollTo(0, 0);
    window.addEventListener("scroll", noScroll);

    if (this.elements.openInvitationBtn) {
      this.elements.openInvitationBtn.addEventListener("click", () => {
        if (this.elements.envelope) {
          this.elements.envelope.classList.add("opened");
        }

        if (this.elements.invitationContent) {
          this.elements.invitationContent.classList.remove("opacity-0");
        }

        if (this.elements.openInvitationBtn) {
          this.elements.openInvitationBtn.classList.add("opacity-0");
        }

        document.body.classList.remove("overflow-hidden");
        window.removeEventListener("scroll", noScroll);

        // Start background music after animation
        setTimeout(() => {
          this.playBackgroundMusic();
        }, 1000);

        // Hide the button after opening
        setTimeout(() => {
          if (this.elements.openInvitationBtn) {
            this.elements.openInvitationBtn.style.display = "none";
          }
        }, 1500);

        // Set up scroll down indicator after envelope opens
        setTimeout(() => {
          if (this.elements.scrollDownIndicator) {
            this.elements.scrollDownIndicator.classList.remove("opacity-0");
            this.elements.scrollDownIndicator.classList.add("opacity-75");
            this.elements.scrollDownIndicator.style.visibility = "visible";

            // Add click functionality to scroll down
            this.elements.scrollDownIndicator.onclick = () => {
              // Scroll to couple section
              const coupleSection = document.getElementById("couple");
              if (coupleSection) {
                coupleSection.scrollIntoView({
                  behavior: "smooth",
                });
              }
            };
          }
        }, 3000);

        this.state.isInvitationOpened = true;
      });
    }
  }

  /**
   * Music control functionality
   */
  initializeMusicControls() {
    if (this.elements.musicToggle) {
      this.elements.musicToggle.addEventListener("click", () => {
        if (this.state.isMusicPlaying) {
          this.pauseBackgroundMusic();
        } else {
          this.playBackgroundMusic();
        }
      });
    }
  }

  playBackgroundMusic() {
    if (this.elements.backgroundMusic) {
      this.elements.backgroundMusic
        .play()
        .then(() => {
          this.state.isMusicPlaying = true;
          if (this.elements.musicToggle) {
            this.elements.musicToggle.innerHTML =
              '<i class="fas fa-pause text-gold"></i>';
            this.elements.musicToggle.classList.add("music-playing");
          }
        })
        .catch((error) => {
          console.log("Music autoplay prevented:", error);
        });
    }
  }

  pauseBackgroundMusic() {
    if (this.elements.backgroundMusic) {
      this.elements.backgroundMusic.pause();
      this.state.isMusicPlaying = false;
      if (this.elements.musicToggle) {
        this.elements.musicToggle.innerHTML =
          '<i class="fas fa-music text-gold"></i>';
        this.elements.musicToggle.classList.remove("music-playing");
      }
    }
  }

  /**
   * Theme toggle functionality
   */
  initializeThemeToggle() {
    if (this.elements.themeToggle) {
      this.elements.themeToggle.addEventListener("click", () => {
        this.toggleTheme();
      });
    }
  }

  toggleTheme() {
    this.state.isDarkMode = !this.state.isDarkMode;

    if (document.body) {
      document.body.classList.toggle("dark", this.state.isDarkMode);
    }

    if (this.elements.themeToggle) {
      const icon = this.elements.themeToggle.querySelector("i");
      if (icon) {
        if (this.state.isDarkMode) {
          icon.className = "fas fa-sun text-gold";
          localStorage.setItem("theme", "dark");
        } else {
          icon.className = "fas fa-moon text-gold";
          localStorage.setItem("theme", "light");
        }
      }
    }
  }

  /**
   * Scroll animations with Intersection Observer
   */
  initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("fade-in");
      observer.observe(section);
    });
  }

  /**
   * Countdown timer functionality
   */
  initializeCountdown() {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = CONFIG.WEDDING_DATE - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (this.elements.days)
          this.elements.days.textContent = days.toString().padStart(2, "0");
        if (this.elements.hours)
          this.elements.hours.textContent = hours.toString().padStart(2, "0");
        if (this.elements.minutes)
          this.elements.minutes.textContent = minutes
            .toString()
            .padStart(2, "0");
        if (this.elements.seconds)
          this.elements.seconds.textContent = seconds
            .toString()
            .padStart(2, "0");
      } else {
        // Wedding day has arrived
        if (this.elements.days) this.elements.days.textContent = "00";
        if (this.elements.hours) this.elements.hours.textContent = "00";
        if (this.elements.minutes) this.elements.minutes.textContent = "00";
        if (this.elements.seconds) this.elements.seconds.textContent = "00";
      }
    };

    // Update countdown immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    this.timers.push(countdownInterval);
  }

  /**
   * Gift button functionality
   */
  initializeGiftButton() {
    // Create gift button dynamically
    const gift = document.createElement("div");
    gift.id = "gift";
    gift.innerHTML = '<i class="fas fa-gift"></i>';
    document.body.appendChild(gift);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 1500) {
        gift.classList.add("show");
      } else {
        gift.classList.remove("show");
      }
    });

    gift.addEventListener("click", () => {
      const modal = document.getElementById("showModal");
      if (modal) {
        modal.style.display = "flex";
        const panel = modal.querySelector(".bank-modal__panel");

        // Reset to initial state
        panel.classList.remove("opacity-100", "scale-100");
        panel.classList.add("opacity-0", "scale-95");

        // Force reflow to ensure transition is always triggered
        void panel.offsetWidth;

        requestAnimationFrame(() => {
          panel.classList.remove("opacity-0", "scale-95");
          panel.classList.add("opacity-100", "scale-100");
        });
      }
    });

    this.setupBankModal();
  }

  /**
   * Bank modal functionality
   */
  setupBankModal() {
    const modal = document.getElementById("showModal");
    if (!modal) return; // Skip if modal doesn't exist

    // Helper function to close modal
    const closeModal = () => {
      const panel = modal.querySelector(".bank-modal__panel");
      if (panel) {
        panel.classList.remove("opacity-100", "scale-100");
        panel.classList.add("opacity-0", "scale-95");
        setTimeout(() => (modal.style.display = "none"), 300);
      }
    };

    // Handle clicks on elements with data-close-modal
    modal.addEventListener("click", (e) => {
      if (
        e.target.matches("[data-close-modal]") ||
        e.target.closest("[data-close-modal]")
      ) {
        closeModal();
      }
    });

    // Close with Escape key
    document.addEventListener("keydown", (e) => {
      if (!modal || modal.style.display === "none") return;
      if (e.key === "Escape") closeModal();
    });

    // Copy account number functionality
    modal.querySelectorAll(".btn-copy").forEach((btn) => {
      btn.addEventListener("click", async (event) => {
        const account = btn.dataset.account;
        if (!account) return;

        try {
          await navigator.clipboard.writeText(account);
          // Provide feedback
          btn.textContent = "Tersalin ✓";
          setTimeout(() => (btn.textContent = "Salin"), 1500);
        } catch (err) {
          // Fallback: select and copy using execCommand
          const ta = document.createElement("textarea");
          ta.value = account;
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
            btn.textContent = "Tersalin ✓";
            setTimeout(() => (btn.textContent = "Salin"), 1500);
          } catch (err2) {
            alert("Gagal menyalin nomor. Silakan salin manual: " + account);
          }
          document.body.removeChild(ta);
        }
      });
    });

    // Toggle mask/show account number
    modal.querySelectorAll(".btn-toggle-mask").forEach((btn, idx) => {
      const parent = btn.closest(".bank-item");
      const copyBtn = parent ? parent.querySelector(".btn-copy") : null;
      const realAccount = copyBtn ? copyBtn.dataset.account : null;

      btn.addEventListener("click", () => {
        const pressed = btn.getAttribute("aria-pressed") === "true";
        if (!pressed) {
          // Show account number (format with spaces for readability)
          btn.textContent = this.formatAccount(realAccount);
          btn.setAttribute("aria-pressed", "true");
        } else {
          // Hide again
          btn.textContent = "••••••••••";
          btn.setAttribute("aria-pressed", "false");
        }
      });
    });

    // Format account number in groups of 4 digits
    this.formatAccount = (acc) => {
      if (!acc) return "";
      return acc.replace(/(\d{4})(?=\d)/g, "$1 ");
    };

    // Observer to manage body overflow and focus when modal is shown
    const observer = new MutationObserver(() => {
      if (modal.style.display !== "none" && modal.style.display !== "") {
        document.body.style.overflow = "hidden";
        // Focus close button so keyboard users can immediately press Esc/Tab
        const closeBtn = modal.querySelector(".bank-modal__close");
        if (closeBtn) closeBtn.focus();
      } else {
        document.body.style.overflow = "";
      }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ["style"] });
  }

  /**
   * Back to top button functionality
   */
  initializeBackToTop() {
    // Create back to top button
    const backToTop = document.createElement("div");
    backToTop.id = "backToTop";
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    // Show/hide based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    // Scroll to top on click
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /**
   * Gallery functionality
   */
  initializeGallery() {
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Simple zoom effect
        this.style.transform = "scale(1.05)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 200);
      });
    });
  }

  /**
   * Wishes form functionality with Firebase integration
   */
  initializeWishesForm() {
    if (this.elements.wishesForm && this.elements.wishesDisplay) {
      this.elements.wishesForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("wishName").value;
        const message = document.getElementById("wish").value;

        // Push to Firebase
        push(ref(this.db, "messages/weddingA"), {
          name: name,
          message: message,
          time: Date.now(),
        });

        // Show notification
        this.showNotification(message);

        // Reset form
        this.elements.wishesForm.reset();
      });

      // Listen for changes to wishes in Firebase
      onValue(ref(this.db, "messages/weddingA"), (snapshot) => {
        this.elements.wishesDisplay.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();

          const div = document.createElement("div");
          div.className = "bg-white/50 rounded-lg p-6 shadow-lg";
          div.innerHTML = `
            <p class="text-brown-700 italic mb-3">"${data.message}"</p>
            <p class="text-gold font-medium">— ${data.name}</p>
          `;

          // Insert newest first
          this.elements.wishesDisplay.insertBefore(
            div,
            this.elements.wishesDisplay.firstChild
          );
        });
      });
    }
  }

  /**
   * RSVP form functionality
   */
  initializeRSVPForm() {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyRJEpen88xRr1R9-ecuAZb67bMDCpQkDdkE1dd4oZp1kW1CmNeu-mVVmTcAM8nCHpKaQ/exec";

    if (this.elements.rsvpForm) {
      this.elements.rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = {
          nama: e.target.name.value,
          kehadiran: e.target.attendance.value,
          jumlah: e.target.guests.value,
        };

        fetch(scriptURL, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
        })
          .then(() => {
            alert("RSVP berhasil disimpan!");
            e.target.reset();
          })
          .catch(() => alert("Gagal menyimpan data!"));
      });
    }
  }

  /**
   * Lazy loading for images
   */
  initializeLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  /**
   * Mobile menu toggle functionality
   */
  initializeMobileMenu() {
    if (this.elements.mobileMenuButton && this.elements.mobileMenu) {
      this.elements.mobileMenuButton.addEventListener("click", () => {
        this.elements.mobileMenu.classList.toggle("hidden");
      });
    }
  }

  /**
   * Restore user preferences (theme, etc.)
   */
  restoreUserPreferences() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.toggleTheme();
    }
  }

  /**
   * Show notification
   */
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 transform translate-x-full`;

    if (type === "success") {
      notification.classList.add("bg-green-500");
    } else if (type === "error") {
      notification.classList.add("bg-red-500");
    } else {
      notification.classList.add("bg-blue-500");
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.remove("translate-x-full");
    }, 100);

    // Hide notification after timeout
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, CONFIG.NOTIFICATION_TIMEOUT);
  }

  /**
   * Utility: Debounce function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Cleanup function to clear timers and other resources
   */
  destroy() {
    // Clear all timers
    this.timers.forEach((timer) => clearInterval(timer));
    this.timers = [];
  }
}

// Global error handling
window.addEventListener("error", function (e) {
  console.error("An error occurred:", e.error);
});

// Performance monitoring
window.addEventListener("load", function () {
  console.log("Wedding invitation loaded successfully!");
});

// Initialize the application
const weddingApp = new WeddingApp();

// Export for potential testing or extended functionality
export default weddingApp;
