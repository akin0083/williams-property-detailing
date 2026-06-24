const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const fadeItems = document.querySelectorAll(".fade");

document.body.classList.add("fade-ready");

const updateHeader = () => {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 20);
    }
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open menu");
        });
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

fadeItems.forEach((item) => {
    observer.observe(item);
});
