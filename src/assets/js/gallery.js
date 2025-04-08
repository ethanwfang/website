document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentIndex = 0;

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateLightbox();
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightbox();
            }
        }
    });

    function updateLightbox() {
        const fullResImage = galleryItems[currentIndex].getAttribute('data-full-res');
        lightboxImg.src = fullResImage;
        lightboxImg.alt = galleryItems[currentIndex].querySelector('img').alt;
    }
}); 