// News Management System with LocalStorage
document.addEventListener('DOMContentLoaded', function() {
    const newsGrid = document.getElementById('news-grid');
    const refreshBtn = document.getElementById('refresh-btn');
    const searchInput = document.getElementById('news-search');
    const searchBtn = document.getElementById('news-search-btn');
    const imageGallery = document.getElementById('image-gallery');
    const viewOldNewsBtn = document.getElementById('view-old-news-btn');
    
    let allNews = []; // Store all news for searching
    let currentView = 'all'; // Changed default view to 'all' (old news)
    let newsStorageKey = 'spaceNewsItems';
    
    // Fetch NASA Image of the Day
    fetchNASAImage();
    
    // Initialize news system
    initializeNewsSystem();
    
    // Fetch NASA Image of the Day
    function fetchNASAImage() {
        // Using a placeholder since NASA API requires API key
        // In a real implementation, you would use: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
        imageGallery.innerHTML = `
            <div class="gallery-item">
                <img src="https://placehold.co/600x400/0b0c10/66fcf1?text=NASA+Image+of+the Day" alt="NASA Image of the Day" class="gallery-image">
                <div class="gallery-info">
                    <h3>NASA Image of the Day</h3>
                    <p>Stunning astronomical image from NASA's archives</p>
                </div>
            </div>
            <div class="gallery-item">
                <img src="https://placehold.co/600x400/0b0c10/66fcf1?text=Hubble+Image" alt="Hubble Image" class="gallery-image">
                <div class="gallery-info">
                    <h3>Hubble Telescope Image</h3>
                    <p>Deep space image captured by Hubble Space Telescope</p>
                </div>
            </div>
            <div class="gallery-item">
                <img src="https://placehold.co/600x400/0b0c10/66fcf1?text=JWST+Image" alt="James Webb Image" class="gallery-image">
                <div class="gallery-info">
                    <h3>James Webb Space Telescope</h3>
                    <p>Infrared image from JWST showing distant galaxies</p>
                </div>
            </div>
        `;
        
        // Animate gallery items
        setTimeout(() => {
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 200);
            });
        }, 500);
    }
    
    // Initialize the news system
    function initializeNewsSystem() {
        // Load news from localStorage
        loadNewsFromStorage();
        
        // Add some sample news if storage is empty
        if (getAllNews().length === 0) {
            addSampleNews();
        }
        
        // Display all news by default (changed from 'today' to 'all')
        displayNews('all');
        
        // Set up automatic refresh at midnight
        setupMidnightRefresh();
    }
    
    // Load news from localStorage
    function loadNewsFromStorage() {
        try {
            const storedNews = localStorage.getItem(newsStorageKey);
            if (storedNews) {
                allNews = JSON.parse(storedNews);
            } else {
                allNews = [];
            }
        } catch (error) {
            console.error('Error loading news from localStorage:', error);
            allNews = [];
        }
    }
    
    // Save news to localStorage
    function saveNewsToStorage() {
        try {
            localStorage.setItem(newsStorageKey, JSON.stringify(allNews));
        } catch (error) {
            console.error('Error saving news to localStorage:', error);
        }
    }
    
    // Get all news from storage
    function getAllNews() {
        try {
            const storedNews = localStorage.getItem(newsStorageKey);
            return storedNews ? JSON.parse(storedNews) : [];
        } catch (error) {
            console.error('Error retrieving news from localStorage:', error);
            return [];
        }
    }
    
    // Add a new news item
    function addNews(newsItem) {
        // Validate required properties
        if (!newsItem.id || !newsItem.date || !newsItem.title || !newsItem.content) {
            console.error('Invalid news item. Required properties: id, date, title, content');
            return false;
        }
        
        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(newsItem.date)) {
            console.error('Invalid date format. Use YYYY-MM-DD format');
            return false;
        }
        
        try {
            // Add to allNews array
            allNews.push(newsItem);
            
            // Save to localStorage
            saveNewsToStorage();
            
            // Refresh display if we're in the right view
            if (currentView === 'today' || currentView === 'all') {
                displayNews(currentView);
            }
            
            return true;
        } catch (error) {
            console.error('Error adding news item:', error);
            return false;
        }
    }
    
    // Get today's date in YYYY-MM-DD format
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Filter news by today's date
    function getTodaysNews() {
        const today = getTodayDate();
        return allNews.filter(newsItem => newsItem.date === today);
    }
    
    // Display news based on filter type
    function displayNews(filterType) {
        currentView = filterType;
        
        let newsToDisplay = [];
        
        if (filterType === 'today') {
            newsToDisplay = getTodaysNews();
            viewOldNewsBtn.textContent = 'View Old News';
            viewOldNewsBtn.classList.remove('showing-all');
        } else if (filterType === 'all') {
            newsToDisplay = [...allNews]; // Create a copy to avoid modifying original
            viewOldNewsBtn.textContent = 'View Today\'s News';
            viewOldNewsBtn.classList.add('showing-all');
        }
        
        // Clear grid with fade out animation
        const existingCards = document.querySelectorAll('.news-card');
        if (existingCards.length > 0) {
            // Fade out existing cards
            existingCards.forEach(card => {
                card.classList.add('fade-out');
            });
            
            // After fade out, clear and display new content
            setTimeout(() => {
                renderNewsCards(newsToDisplay);
            }, 300); // Match CSS transition duration
        } else {
            // No existing cards, render immediately
            renderNewsCards(newsToDisplay);
        }
    }
    
    // Render news cards in the grid
    function renderNewsCards(newsList) {
        // Clear grid
        newsGrid.innerHTML = '';
        
        if (newsList.length === 0) {
            if (currentView === 'today') {
                newsGrid.innerHTML = '<div class="no-news">No news for today yet—check back later.</div>';
            } else {
                newsGrid.innerHTML = '<div class="no-news">No news items available.</div>';
            }
            return;
        }
        
        // Display articles
        newsList.forEach((article, index) => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            
            // Format the publish date
            const publishDate = new Date(article.published_at || article.date);
            const formattedDate = publishDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // Use placeholder image if no image is available
            const imageUrl = article.image_url || 'https://placehold.co/600x400/0b0c10/66fcf1?text=Space+News';
            
            newsCard.innerHTML = `
                <img src="${imageUrl}" alt="${article.title}" class="news-image" onerror="this.src='https://placehold.co/600x400/0b0c10/66fcf1?text=Space+News'">
                <div class="news-content">
                    <h3>${article.title}</h3>
                    <p>${article.content || article.summary}</p>
                    <div class="news-meta">
                        <span>${formattedDate}</span>
                        <span>${article.news_site || 'SpaceTech Hub'}</span>
                    </div>
                    ${article.url ? `<a href="${article.url}" target="_blank" class="read-more">Read Full Article →</a>` : ''}
                </div>
            `;
            
            newsGrid.appendChild(newsCard);
            
            // Add animation delay for each card with fade-in effect
            setTimeout(() => {
                newsCard.classList.add('fade-in');
            }, index * 100);
        });
    }
    
    // Add sample news for demonstration
    function addSampleNews() {
        const today = getTodayDate();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
        
        const sampleNews = [
            {
                id: '1',
                date: today,
                title: 'New Rocket Launch Success',
                content: 'SpaceX successfully launched another Falcon 9 rocket with 60 Starlink satellites.',
                published_at: new Date().toISOString()
            },
            {
                id: '2',
                date: today,
                title: 'Mars Rover Makes Discovery',
                content: 'NASA\'s Perseverance rover discovers evidence of ancient microbial life on Mars.',
                published_at: new Date().toISOString()
            },
            {
                id: '3',
                date: yesterdayStr,
                title: 'James Webb Telescope Update',
                content: 'The James Webb Space Telescope captures stunning images of distant galaxies.',
                published_at: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: '4',
                date: yesterdayStr,
                title: 'International Space Station News',
                content: 'ISS crew completes successful spacewalk to upgrade solar panels.',
                published_at: new Date(Date.now() - 86400000).toISOString()
            }
        ];
        
        sampleNews.forEach(newsItem => {
            addNews(newsItem);
        });
    }
    
    // Function to fetch news (existing functionality)
    function fetchNews() {
        // Show loading state
        newsGrid.innerHTML = '<div class="loading">Loading space news...</div>';
        
        // Fetch news from SpaceFlightNews API
        fetch('https://api.spaceflightnewsapi.net/v4/articles/')
            .then(response => response.json())
            .then(data => {
                allNews = data.results;
                displayNews(currentView);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                newsGrid.innerHTML = '<div class="error">Failed to load news. Please try again later.</div>';
            });
    }
    
    // Function to search news
    function searchNews(term) {
        if (!term) {
            displayNews(currentView);
            return;
        }
        
        const filteredNews = allNews.filter(article => 
            article.title.toLowerCase().includes(term.toLowerCase()) ||
            (article.content || article.summary).toLowerCase().includes(term.toLowerCase()) ||
            (article.news_site || '').toLowerCase().includes(term.toLowerCase())
        );
        
        // Clear grid with fade out animation
        const existingCards = document.querySelectorAll('.news-card');
        if (existingCards.length > 0) {
            // Fade out existing cards
            existingCards.forEach(card => {
                card.classList.add('fade-out');
            });
            
            // After fade out, clear and display new content
            setTimeout(() => {
                renderNewsCards(filteredNews);
            }, 300); // Match CSS transition duration
        } else {
            // No existing cards, render immediately
            renderNewsCards(filteredNews);
        }
    }
    
    // Set up automatic refresh at midnight
    function setupMidnightRefresh() {
        // Calculate time until next midnight
        const now = new Date();
        const nextMidnight = new Date();
        nextMidnight.setHours(24, 0, 0, 0); // Next midnight
        const timeUntilMidnight = nextMidnight - now;
        
        // Set timeout to refresh at midnight
        setTimeout(() => {
            // Refresh display to show only today's news
            if (currentView === 'today') {
                displayNews('today');
            }
            
            // Set up recurring daily refresh
            setInterval(() => {
                if (currentView === 'today') {
                    displayNews('today');
                }
            }, 86400000); // 24 hours
        }, timeUntilMidnight);
    }
    
    // Toggle between today's news and all news
    function toggleNewsView() {
        if (currentView === 'today') {
            displayNews('all');
        } else {
            displayNews('today');
        }
    }
    
    // Event listeners
    refreshBtn.addEventListener('click', fetchNews);
    
    searchBtn.addEventListener('click', function() {
        searchNews(searchInput.value);
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchNews(searchInput.value);
        }
    });
    
    viewOldNewsBtn.addEventListener('click', toggleNewsView);
    
    // Initial fetch
    fetchNews();
});

// Export functions for external use (if needed)
// Note: In a module system, you would export these properly
// For now, they're accessible within the DOMContentLoaded scope