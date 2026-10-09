```javascript
"use strict";

// NEXUS AI — Safe interactive experience
document.documentElement.classList.add("js-reveal");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    const open = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );
    menuButton.textContent = open ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("open");
      menuButton.textContent = "☰";
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Scroll reveal
const revealItems = document.querySelectorAll(".reveal");

function showAllContent() {
  document.documentElement.classList.remove("js-reveal");
  revealItems.forEach(function (item) {
    item.classList.add("visible");
  });
}

if (reducedMotion || !("IntersectionObserver" in window)) {
  showAllContent();
} else {
  try {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });

    // Safety fallback: never leave content hidden indefinitely
    window.setTimeout(showAllContent, 2500);
  } catch (error) {
    showAllContent();
    console.error("Scroll reveal fallback:", error);
  }
}

// Cursor glow
const glow = document.querySelector(".cursor-glow");
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (glow && finePointer && !reducedMotion) {
  window.addEventListener(
    "pointermove",
    function (event) {
      glow.style.left = event.clientX + "px";
      glow.style.top = event.clientY + "px";
    },
    { passive: true }
  );
} else if (glow) {
  glow.style.display = "none";
}

// Orb interaction
const orbStage = document.querySelector(".orb-stage");
const orb = document.querySelector(".energy-orb");

if (orbStage && orb && finePointer && !reducedMotion) {
  orbStage.addEventListener("pointermove", function (event) {
    const bounds = orbStage.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    orb.style.translate =
      (x * 12) + "px " + (y * 12) + "px";
  });

  orbStage.addEventListener("pointerleave", function () {
    orb.style.translate = "0px 0px";
  });
}

// Feature card tilt
const cards = document.querySelectorAll(".feature-card");

if (finePointer && !reducedMotion) {
  cards.forEach(function (card) {
    card.addEventListener("pointermove", function (event) {
      const bounds = card.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      const rotateX = (0.5 - y) * 4;
      const rotateY = (x - 0.5) * 5;

      card.style.transform =
        "perspective(900px) rotateX(" + rotateX + "deg) " +
        "rotateY(" + rotateY + "deg) translateY(-3px)";
    });

    card.addEventListener("pointerleave", function () {
      card.style.transform = "";
    });
  });
}

// Sticky-looking navigation background on scroll
const navbar = document.querySelector(".navbar");

function updateNavbar() {
  if (!navbar) return;

  navbar.style.background = window.scrollY > 35
    ? "rgba(7, 7, 17, 0.96)"
    : "rgba(7, 7, 17, 0.88)";
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

// Keep the creator credit year current
const credit = document.querySelector(".footer > span:last-child");

if (credit) {
  credit.textContent =
    "Built by Priyanshu Kumar © " + new Date().getFullYear();
}

console.log("NEXUS AI loaded successfully.");
```