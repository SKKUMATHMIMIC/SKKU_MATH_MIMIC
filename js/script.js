const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", mobileMenu);
}

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

navLinks.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  if (!hamburger || !navMenu) {
    return;
  }

  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Highlight active navbar link on scroll (main page sections)
const scrollSpyItems = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      return null;
    }

    const section = document.querySelector(href);
    if (!section) {
      return null;
    }

    return { link, section };
  })
  .filter(Boolean);

if (scrollSpyItems.length > 0) {
  const setActiveLink = (activeLink) => {
    scrollSpyItems.forEach(({ link }) => {
      link.classList.toggle("is-active", link === activeLink);
    });
  };

  const updateActiveLinkByScroll = () => {
    const navbar = document.querySelector(".navbar");
    const navHeight = navbar ? navbar.offsetHeight : 0;
    const probeLine = navHeight + window.innerHeight * 0.35;
    let activeItem = scrollSpyItems[0];

    scrollSpyItems.forEach((item) => {
      const sectionTop = item.section.getBoundingClientRect().top;
      if (sectionTop <= probeLine) {
        activeItem = item;
      }
    });

    setActiveLink(activeItem.link);
  };

  let ticking = false;
  const requestActiveLinkUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      updateActiveLinkByScroll();
      ticking = false;
    });
  };

  window.addEventListener("scroll", requestActiveLinkUpdate, { passive: true });
  window.addEventListener("resize", requestActiveLinkUpdate);
  requestActiveLinkUpdate();
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

if (toggleSwitch) {
  toggleSwitch.addEventListener("change", switchTheme, false);
}

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark" && toggleSwitch) {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
if (myDate) {
  myDate.innerHTML = yes;
}
