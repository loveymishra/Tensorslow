/*
 * TENSOR SLOW ACADEMY — site interactions
 * Keep this file in the same folder as index.html and style.css.
 * Update the email address and WhatsApp number before publishing.
 */

(function () {
  "use strict";

  var SITE_CONFIG = {
    email: "loveymishra60@gmail.com",
    // India example: 91 followed by your 10-digit mobile number. Digits only.
    whatsapp: "+91 6306207252"
  };

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function setUpNavigation() {
    var menuToggle = document.getElementById("menuToggle");
    var primaryNav = document.getElementById("primaryNav");

    if (!menuToggle || !primaryNav) return;

    menuToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    var navLinks = primaryNav.querySelectorAll("a");
    Array.prototype.forEach.call(navLinks, function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  function setUpSubjectFilters() {
    var filterButtons = document.querySelectorAll(".filter-button");
    var subjectCards = document.querySelectorAll(".subject-card");
    var filterEmpty = document.getElementById("filterEmpty");

    if (!filterButtons.length || !subjectCards.length) return;

    Array.prototype.forEach.call(filterButtons, function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter") || "all";
        var visibleCount = 0;

        Array.prototype.forEach.call(filterButtons, function (item) {
          var active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });

        Array.prototype.forEach.call(subjectCards, function (card) {
          var visible = filter === "all" || card.getAttribute("data-category") === filter;
          card.classList.toggle("is-hidden", !visible);
          if (visible) visibleCount += 1;
        });

        if (filterEmpty) filterEmpty.hidden = visibleCount !== 0;
      });
    });
  }

  function setUpFaq() {
    var faqButtons = document.querySelectorAll(".faq-question");
    if (!faqButtons.length) return;

    Array.prototype.forEach.call(faqButtons, function (button) {
      button.addEventListener("click", function () {
        var item = button.closest ? button.closest(".faq-item") : null;
        if (!item) return;

        var willOpen = !item.classList.contains("open");
        var allItems = document.querySelectorAll(".faq-item");

        Array.prototype.forEach.call(allItems, function (other) {
          other.classList.remove("open");
          var otherButton = other.querySelector(".faq-question");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        });

        if (willOpen) {
          item.classList.add("open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function setUpInterestLinks() {
    var interestSelect = document.getElementById("interest");
    var interestLinks = document.querySelectorAll("[data-interest]");
    if (!interestSelect || !interestLinks.length) return;

    Array.prototype.forEach.call(interestLinks, function (link) {
      link.addEventListener("click", function () {
        var requested = (link.getAttribute("data-interest") || "").toLowerCase();
        if (!requested) return;

        var options = interestSelect.options;
        var match = null;

        // Prefer an exact match, then try a partial match.
        for (var i = 0; i < options.length; i += 1) {
          var optionText = (options[i].text || "").toLowerCase();
          var optionValue = (options[i].value || "").toLowerCase();
          if (optionText === requested || optionValue === requested) {
            match = options[i];
            break;
          }
        }

        if (!match) {
          for (var j = 0; j < options.length; j += 1) {
            var candidate = (options[j].text || "").toLowerCase();
            if (candidate && (candidate.indexOf(requested) !== -1 || requested.indexOf(candidate) !== -1)) {
              match = options[j];
              break;
            }
          }
        }

        if (match) interestSelect.value = match.value;
      });
    });
  }

  function setUpContactDetails() {
    var emailText = document.getElementById("emailText");
    var whatsappText = document.getElementById("whatsappText");
    var email = SITE_CONFIG.email;
    var whatsapp = SITE_CONFIG.whatsapp;

    if (emailText && email && email.indexOf("YOUR_EMAIL") === -1 && email.indexOf("@") > 0) {
      emailText.textContent = email;
      emailText.href = "mailto:" + email;
    }

    if (whatsappText && whatsapp && !/X/i.test(whatsapp)) {
      var cleanNumber = whatsapp.replace(/\D/g, "");
      if (cleanNumber) {
        whatsappText.textContent = "+" + cleanNumber;
        whatsappText.href = "https://wa.me/" + cleanNumber;
        whatsappText.target = "_blank";
        whatsappText.rel = "noopener noreferrer";
      }
    }
  }

  function setUpContactForm() {
    var contactForm = document.getElementById("contactForm");
    var formMessage = document.getElementById("formMessage");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var email = SITE_CONFIG.email;
      if (!email || email.indexOf("YOUR_EMAIL") !== -1 || email.indexOf("@") < 1) {
        if (formMessage) {
          formMessage.textContent = "Please add your real email address in script.js before publishing. Your enquiry form is ready once this is configured.";
        }
        return;
      }

      var formData = new FormData(contactForm);
      var subject = "Teaching enquiry — " + (formData.get("interest") || "General enquiry");
      var body = [
        "Name: " + (formData.get("name") || ""),
        "Level: " + (formData.get("level") || ""),
        "Preferred format: " + (formData.get("format") || ""),
        "Subject/course: " + (formData.get("interest") || ""),
        "",
        "Goal / question:",
        formData.get("message") || ""
      ].join("\n");

      var mailto = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      window.location.href = mailto;

      if (formMessage) {
        formMessage.textContent = "Your email app should open with the enquiry filled in. Review the message and press Send.";
      }
    });
  }

  function setUpYear() {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function setUpRevealAnimations() {
    var revealItems = document.querySelectorAll(".reveal");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mark JS as active only after this file has successfully executed.
    document.documentElement.classList.add("js-ready");
    document.documentElement.setAttribute("data-js-loaded", "true");

    if (!revealItems.length) return;

    if ("IntersectionObserver" in window && !reduceMotion) {
      var observer = new IntersectionObserver(function (entries, currentObserver) {
        Array.prototype.forEach.call(entries, function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      Array.prototype.forEach.call(revealItems, function (item) {
        observer.observe(item);
      });
    } else {
      Array.prototype.forEach.call(revealItems, function (item) {
        item.classList.add("visible");
      });
    }
  }

  onReady(function () {
    try {
      setUpNavigation();
      setUpSubjectFilters();
      setUpFaq();
      setUpInterestLinks();
      setUpContactDetails();
      setUpContactForm();
      setUpYear();
      setUpRevealAnimations();
    } catch (error) {
      // Keep the page readable even if one interaction fails.
      document.documentElement.classList.remove("js-ready");
      document.documentElement.setAttribute("data-js-loaded", "error");
      if (window.console && console.error) {
        console.error("TensorSlow Academy JavaScript error:", error);
      }
    }
  });
})();
