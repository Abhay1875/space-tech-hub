// Fetch latest space news for the home page preview
document.addEventListener('DOMContentLoaded', function() {
    // The enhanced starfield background is now initialized in shared-effects.js
    // Remove the duplicate initialization here to avoid conflicts
    
    // Fetch news
    fetchNews();
    
    // Set up scroll-to-top button
    setupScrollToTop();
    
    // Add page load animations
    setTimeout(animateOnLoad, 500);
    
    // Add space fact button
    createSpaceFactButton();
    
    // Initialize news ticker
    initNewsTicker();
});

// Initialize news ticker
function initNewsTicker() {
    // In a real implementation, this would fetch live news
    // For now, we'll use the static content in the HTML
    const tickerList = document.getElementById('ticker-list');
    
    // Duplicate items for continuous scrolling effect
    const items = tickerList.innerHTML;
    tickerList.innerHTML = items + items;
}

// Fetch latest space news for the home page preview
function fetchNews() {
    const newsPreviewContainer = document.getElementById('news-preview');
    
    // Show loading state
    newsPreviewContainer.innerHTML = '<div class="loading-animation"></div>';
    
    // Fetch news from SpaceFlightNews API
    fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=3')
        .then(response => response.json())
        .then(data => {
            // Clear loading message
            newsPreviewContainer.innerHTML = '';
            
            // Display the first 3 articles
            data.results.slice(0, 3).forEach((article, index) => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                
                // Format the publish date
                const publishDate = new Date(article.published_at);
                const formattedDate = publishDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                newsCard.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.summary.substring(0, 150)}...</p>
                    <p class="publish-date">${formattedDate}</p>
                `;
                
                newsPreviewContainer.appendChild(newsCard);
                
                // Add animation delay for each card
                setTimeout(() => {
                    newsCard.classList.add('animate');
                }, index * 200);
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsPreviewContainer.innerHTML = '<p>Failed to load updates. Please try again later.</p>';
        });
}

// Set up scroll-to-top button
function setupScrollToTop() {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Page load animations
function animateOnLoad() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Add animation class with delay
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Create space fact button and functionality
function createSpaceFactButton() {
    // Space fact button removed as per user request
}