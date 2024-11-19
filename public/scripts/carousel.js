document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const progressBar = document.querySelector('.carousel-progress-bar');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let interval;

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        resetProgressBar();
    }

    function showNextSlide() {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }

    function resetProgressBar() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.transition = 'width 8s linear';
            progressBar.style.width = '100%';
        }, 50);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Automatically change the content every 8 seconds
    interval = setInterval(showNextSlide, 8000);

    updateCarousel();
});