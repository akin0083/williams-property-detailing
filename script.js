const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const fadeItems = document.querySelectorAll(".fade");
const bookingForm = document.querySelector("#bookingForm");

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

document.querySelectorAll("[data-result-slider]").forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll(".result-slide"));
    const previousButton = slider.querySelector("[data-slider-previous]");
    const nextButton = slider.querySelector("[data-slider-next]");
    const counter = slider.querySelector("[data-slider-count]");
    let currentSlide = 0;

    const showSlide = (index) => {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === currentSlide;
            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        counter.textContent = `${currentSlide + 1} / ${slides.length}`;
    };

    previousButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    showSlide(0);
});

if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const service = formData.get("service");
        const date = formData.get("date");
        const address = formData.get("address");
        const message = formData.get("message");

        const subject = encodeURIComponent(`Booking request: ${service}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nPreferred date: ${date}\nAddress: ${address}\n\nProject details:\n${message}`
        );

        window.location.href = `mailto:youremail@email.com?subject=${subject}&body=${body}`;
    });
}
