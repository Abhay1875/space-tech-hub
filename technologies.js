// Add scroll animations and interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add scroll animation to tech cards
    const techCards = document.querySelectorAll('.tech-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add scroll event listener for animations
    function handleScroll() {
        // Animate timeline items on scroll
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('animate');
            }
        });
        
        // Animate tech cards on scroll
        techCards.forEach(card => {
            if (isInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animations
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    // Add throttled scroll listener for better performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Trigger initial check for elements in viewport
    setTimeout(() => {
        handleScroll();
    }, 100);
    
    // Add hover effects to tech cards
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '2';
        });
    });
});