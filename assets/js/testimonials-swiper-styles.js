// ==================== TESTIMONIAL SWIPER INITIALIZATION ====================

// Inicializar Swiper para los testimonios
const swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    speed: 600,
    spaceBetween: 20,
    
    slidesPerView: 1,  // Default: 1 slide
    
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    
    pagination: {
        el: '.swiper-pagination-testimonial',
        clickable: true,
        dynamicBullets: true,
    },
    
    navigation: {
        nextEl: '.swiper-button-testimonial-next',
        prevEl: '.swiper-button-testimonial-prev',
    },
    
    // Configuración responsiva
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 1,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 1,  // 1 slide en tablet grande
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 1,  // 1 slide en desktop
            spaceBetween: 20,
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