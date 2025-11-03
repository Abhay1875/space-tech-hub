// Research & Innovation page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    
    // Animate research cards on load
    animateResearchCards();
});



// Function to animate research cards
function animateResearchCards() {
    const cards = document.querySelectorAll('.research-card');
    
    cards.forEach((card, index) => {
        // Add animation delay for each card
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200);
    });
}