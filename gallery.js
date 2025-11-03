// Gallery page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    
    // Animate gallery items on load
    animateGalleryItems();
    
    // Initialize filter functionality
    initFilterButtons();
});



// Function to animate gallery items
function animateGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach((item, index) => {
        // Add animation delay for each item
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 100);
    });
}

// Function to initialize filter buttons
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const filter = button.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}