/* ---- Register GSAP Plugins ---- */
gsap.registerPlugin(ScrollTrigger);

/* =============================================
   THEME TOGGLE — localStorage persistence
   ============================================= */
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const iconMoon = document.getElementById("icon-moon");
const iconSun = document.getElementById("icon-sun");

function setTheme(mode) {
  if (mode === "light") {
    body.classList.add("light-mode");
    iconMoon.classList.add("hidden");
    iconSun.classList.remove("hidden");
  } else {
    body.classList.remove("light-mode");
    iconMoon.classList.remove("hidden");
    iconSun.classList.add("hidden");
  }
}

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.contains("light-mode");
    const newTheme = isLight ? "dark" : "light";
    localStorage.setItem("portfolio-theme", newTheme);
    setTheme(newTheme);
  });
}

/* =============================================
   LOADER
   ============================================= */
(function initLoader() {
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loader-bar");
  const loaderPercent = document.getElementById("loader-percent");
  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12;
    if (progress >= 100) progress = 100;
    loaderBar.style.width = progress + "%";
    loaderPercent.textContent = Math.floor(progress) + "%";
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => {
            loader.classList.add("hidden");
            initAnimations();
          }
        });
      }, 300);
    }
  }, 90);
})();

/* =============================================
   SMOOTH SCROLL — Lenis
   ============================================= */
let lenis;
if (typeof Lenis !== "undefined") {
  lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  function rafLoop(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);
}

/* =============================================
   CUSTOM CURSOR
   ============================================= */
(function initCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;
  if (window.matchMedia("(max-width: 768px)").matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = document.querySelectorAll(
    "a, button, .skill-card, .project-card, .social-btn, .theme-toggle"
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => body.classList.remove("cursor-hover"));
  });
})();

/* =============================================
   TYPED TEXT EFFECT
   ============================================= */
(function initTyped() {
  const typedEl = document.getElementById("typed-text");
  if (!typedEl) return;

  const words = [
    "Web Developer Enthusiast",
    "Data Analyst Enthusiast",
    "BSc AIML Student"
  ];
  let wIdx = 0, cIdx = 0;
  const typingDelay = 100, erasingDelay = 50, newWordDelay = 1600;

  function type() {
    if (cIdx < words[wIdx].length) {
      typedEl.textContent += words[wIdx][cIdx++];
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newWordDelay);
    }
  }

  function erase() {
    if (cIdx > 0) {
      typedEl.textContent = words[wIdx].substring(0, --cIdx);
      setTimeout(erase, erasingDelay);
    } else {
      wIdx = (wIdx + 1) % words.length;
      setTimeout(type, typingDelay);
    }
  }

  setTimeout(type, newWordDelay);
})();

/* =============================================
   NAVBAR — show on load, scrolled state, active link
   ============================================= */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!navbar) return;

  setTimeout(() => navbar.classList.add("show"), 100);

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    let current = "";
    document.querySelectorAll("section[id]").forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }, { passive: true });

  /* Hamburger */
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-links");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
})();

/* =============================================
   SCROLL DOWN / UP BUTTONS
   ============================================= */
(function initScrollBtns() {
  const scrollDownBtn = document.getElementById("scroll-down");
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
      if (lenis) {
        lenis.scrollTo(window.innerHeight, { duration: 1.2 });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
    });
  }

  const scrollUpBtn = document.getElementById("scroll-up");
  if (scrollUpBtn) {
    scrollUpBtn.addEventListener("click", () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
})();

/* =============================================
   SKILLS CAROUSEL — auto-scroll
   ============================================= */
const carousel = document.getElementById("skillsCarousel");
let autoScrollTimer;
let scrollSpeed = 0.6;

function startAutoScroll() {
  autoScrollTimer = setInterval(() => {
    if (!carousel) return;
    carousel.scrollLeft += scrollSpeed;
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4) {
      carousel.scrollLeft = 0;
    }
  }, 16);
}

function stopAutoScroll() {
  clearInterval(autoScrollTimer);
}

if (carousel) {
  startAutoScroll();
  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);
  carousel.addEventListener("touchstart", stopAutoScroll, { passive: true });
  carousel.addEventListener("touchend", startAutoScroll, { passive: true });
}

window.slideLeft = () => {
  if (carousel) carousel.scrollBy({ left: -220, behavior: "smooth" });
};
window.slideRight = () => {
  if (carousel) carousel.scrollBy({ left: 220, behavior: "smooth" });
};

/* =============================================
   GSAP ANIMATIONS — run after loader hides
   ============================================= */
function initAnimations() {

  /* --- Hero Section Reveal --- */
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    const heroItems = heroContent.children;
    gsap.fromTo(heroItems,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        clearProps: "opacity,transform"
      }
    );
  }

  /* --- Hero button glow pulse --- */
  const heroBtns = document.querySelectorAll(".btn-neon");
  if (heroBtns.length) {
    gsap.to(heroBtns, {
      boxShadow: "0 0 28px rgba(0,245,255,0.5), 0 0 50px rgba(124,255,0,0.3)",
      duration: 1.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  /* --- Section headings fade in --- */
  gsap.utils.toArray(".section-heading").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  /* --- Cards (Education + Projects) stagger fade-up --- */
  gsap.utils.toArray(".anim-card").forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        delay: (i % 3) * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none"
        },
        clearProps: "opacity,transform"
      }
    );
  });

  /* --- About text + Contact Info + Forms fade-up --- */
  gsap.utils.toArray(".anim-fade").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        clearProps: "opacity,transform"
      }
    );
  });

  /* --- Skill cards floating animation --- */
  document.querySelectorAll(".skill-card").forEach((el, i) => {
    gsap.to(el, {
      y: -8,
      duration: 1.8 + (i % 5) * 0.25,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.1
    });
  });

  /* --- Social buttons stagger --- */
  const socialBtns = document.querySelectorAll(".social-btn");
  if (socialBtns.length) {
    gsap.fromTo(socialBtns,
      { opacity: 0, scale: 0.7, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 92%",
          toggleActions: "play none none none"
        }
      }
    );
  }

  /* --- Scroll-up button pulse --- */
  const scrollUpBtn = document.getElementById("scroll-up");
  if (scrollUpBtn) {
    gsap.to(scrollUpBtn, {
      y: -6,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  /* --- Scroll indicator loop on hero scroll-down btn --- */
  const scrollDownBtn = document.getElementById("scroll-down");
  if (scrollDownBtn) {
    gsap.to(scrollDownBtn, {
      y: 10,
      duration: 1.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }
}

/* =============================================
   SMOOTH NAV ANCHOR SCROLL via Lenis
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
