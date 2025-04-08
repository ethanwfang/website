document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-link');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Function to filter gallery items
  function filterGallery(category) {
    galleryItems.forEach(item => {
      if (item.dataset.category === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Add click event listeners to category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter gallery items
      filterGallery(this.dataset.category);
    });
  });

  // Initialize with first category active
  if (categoryButtons.length > 0) {
    categoryButtons[0].classList.add('active');
    filterGallery(categoryButtons[0].dataset.category);
  }
}); 