// Add scroll animations and interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add scroll animation to tech cards
    const techCards = document.querySelectorAll('.tech-card');
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', function() {
        // Animate timeline items on scroll
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
        
        // Animate tech cards on scroll
        techCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Set initial styles for animations
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial check for elements in viewport
    window.dispatchEvent(new Event('scroll'));
});

