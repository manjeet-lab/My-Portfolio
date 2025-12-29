document.addEventListener("DOMContentLoaded", () => {

  // // Smooth scroll
  // const lenis = new Lenis({ smooth: true });
  // function raf(time) {
  //   lenis.raf(time);
  //   requestAnimationFrame(raf);
  // }
  // requestAnimationFrame(raf);

  // Smooth scroll (Vercel safe)
if (typeof Lenis !== "undefined") {
  const lenis = new Lenis({ smooth: true });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
} else {
  console.warn("Lenis not loaded");
}


  // Skills carousel
  const carousel = document.getElementById("skillsCarousel");
  if (carousel) {
    window.slideLeft = () => {
      carousel.scrollBy({ left: -220, behavior: "smooth" });
    };
    window.slideRight = () => {
      carousel.scrollBy({ left: 220, behavior: "smooth" });
    };
  }

  // Typing effect
  const typedText = document.getElementById("typed-text");
  const words = [
    "Web Developer Enthusiast",
    "Data Analyst Enthusiast",
    "BSc AIML Student"
  ];

  if (typedText && words.length) {
    let wordIndex = 0, charIndex = 0;
    let typingDelay = 100, erasingDelay = 50, newWordDelay = 1500;

    function type() {
      if (charIndex < words[wordIndex].length) {
        typedText.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newWordDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedText.textContent =
          words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, typingDelay);
      }
    }

    setTimeout(type, newWordDelay);
  }

  // Loader
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const loaderBar = document.getElementById("loader-bar");
    const loaderPercent = document.getElementById("loader-percent");

    if (!loader || !loaderBar || !loaderPercent) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) progress = 100;

      loaderBar.style.width = progress + "%";
      loaderPercent.textContent = Math.floor(progress) + "%";

      if (progress >= 100) {
        clearInterval(interval);
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 700);
      }
    }, 100);
  });

  // Scroll Down
  const scrollDownBtn = document.getElementById("scroll-down");
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    });
  }

  // Scroll Up
  const scrollUpBtn = document.getElementById("scroll-up");
  if (scrollUpBtn) {
    scrollUpBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Navbar
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navbar) {
    window.addEventListener("load", () => {
      navbar.classList.add("show");
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      let current = "";
      document.querySelectorAll("section").forEach(section => {
        if (scrollY >= section.offsetTop - 120) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // Mobile menu
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-links");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

});

/* ================================
   Auto Scroll Skills Carousel
================================ */

const carousel = document.getElementById("skillsCarousel");

let autoScroll;
let scrollSpeed = 0.5; // slow & smooth

function startAutoScroll() {
  autoScroll = setInterval(() => {
    carousel.scrollLeft += scrollSpeed;

    // Reset scroll when end is reached
    if (
      carousel.scrollLeft + carousel.clientWidth >=
      carousel.scrollWidth - 5
    ) {
      carousel.scrollLeft = 0;
    }
  }, 16); // ~60fps
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

// Start auto scroll
startAutoScroll();

// Pause on hover
carousel.addEventListener("mouseenter", stopAutoScroll);
carousel.addEventListener("mouseleave", startAutoScroll);

// Pause on touch (mobile)
carousel.addEventListener("touchstart", stopAutoScroll);
carousel.addEventListener("touchend", startAutoScroll);

