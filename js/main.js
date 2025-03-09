// Burger Menu Toggle
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

// Toggle navigation links when burger menu is clicked
burgerMenu.addEventListener('click', (event) => {
    navLinks.classList.toggle('active');
    burgerMenu.classList.toggle('open');
    event.stopPropagation();
});

// Close navigation links when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideMenu = burgerMenu.contains(event.target) || navLinks.contains(event.target);

    if (!isClickInsideMenu && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burgerMenu.classList.remove('open');
    }
});




