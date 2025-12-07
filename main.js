// Smooth scroll helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  closeMobileMenu();
  window.scrollTo({
    top: el.offsetTop - 70,
    behavior: "smooth",
  });
}

// Mobile nav elements
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("active");
    if (mobileMenu) {
      mobileMenu.classList.toggle("open");
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    }
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}

function closeMobileMenu() {
  if (navToggle) {
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }
  if (mobileMenu) {
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
  }
  document.body.style.overflow = "";
}

// Handy CTA handlers for mobile menu
function handleMobileViewWork() {
  closeMobileMenu();
  scrollToSection("projects");
}

function handleMobileBook() {
  closeMobileMenu();
  scrollToSection("contact");
}

// Close mobile menu on "Esc" key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileMenu();
});

// Close mobile menu if window resized to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 780) closeMobileMenu();
});

// Scroll reveal using IntersectionObserver
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealEls.forEach((el) => revealObserver.observe(el));

// Projects filter
const filterPills = document.querySelectorAll(".filter-pill");
const projectCards = document.querySelectorAll(".project-card");

filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const type = pill.dataset.filter;
    filterPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");

    projectCards.forEach((card) => {
      const cardType = card.dataset.type;
      if (type === "all" || type === cardType) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Video play/pause based on viewport
document.addEventListener("DOMContentLoaded", () => {
  const vids = document.querySelectorAll(".project-video");

  const vidObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const v = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    },
    { threshold: [0.15, 0.35, 0.6] }
  );

  vids.forEach((v) => {
    v.muted = true;
    if (v.tagName.toLowerCase() === "video") {
      vidObserver.observe(v);
    }
  });
});

// Contact form (demo)
function handleFormSubmit(e) {
  e.preventDefault();
  const status = document.getElementById("formStatus");
  status.textContent =
    "Thanks! This is a demo form. Integrate with EmailJS, Formspree, ya backend to receive messages.";
  e.target.reset();
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
