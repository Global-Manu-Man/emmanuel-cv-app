// ==================== PORTFOLIO SWIPER INITIALIZATION ====================

// Inicializar Swiper para el portfolio
const swiperPortfolio = new Swiper('.portfolio__container', {
    loop: true,
    speed: 600,
    spaceBetween: 30,
    
    slidesPerView: 1,  // Default: 1 slide
    
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    
    pagination: {
        el: '.swiper-pagination-portfolio',
        clickable: true,
        dynamicBullets: true,
    },
    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Configuración responsiva - CORREGIDA
    breakpoints: {
        320: {
            slidesPerView: 1,  // Móvil: 1 slide
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 1,  // Tablet pequeña: 1 slide
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 1,  // Tablet grande: 1 slide (ANTES ERA 2)
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 1,  // Desktop: 1 slide (ANTES ERA 3)
            spaceBetween: 30,
        },
    },
    
    // Efectos y transiciones
    effect: 'slide',
    grabCursor: true,
    centeredSlides: false,
    
    // Accesibilidad
    a11y: {
        enabled: true,
    },
});