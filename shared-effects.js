// Shared JavaScript for enhanced space-themed background effects

// Initialize animated starfield background with parallax effects
function initEnhancedStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return; // Exit if canvas not found
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse position tracking for parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let scrollPosition = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    
    document.addEventListener('scroll', () => {
        scrollPosition = window.scrollY;
    });
    
    // Create multiple layers of elements with different speeds
    const tinyStars = []; // Smallest dots, move slowest
    const smallStars = []; // Small dots, move slower
    const mediumStars = []; // Medium dots, move medium speed
    const largeStars = []; // Large dots, move faster
    const nebulas = []; // Large soft glows, move fastest
    
    const layers = {
        tiny: { count: 300, minSize: 0.5, maxSize: 1.5, minSpeed: 0.02, maxSpeed: 0.05 },
        small: { count: 200, minSize: 1.0, maxSize: 2.5, minSpeed: 0.05, maxSpeed: 0.1 },
        medium: { count: 100, minSize: 2.0, maxSize: 4.0, minSpeed: 0.1, maxSpeed: 0.2 },
        large: { count: 50, minSize: 3.5, maxSize: 6.0, minSpeed: 0.2, maxSpeed: 0.4 },
        nebulas: { count: 8, minSize: 150, maxSize: 300, minSpeed: 0.3, maxSpeed: 0.6 }
    };
    
    // Create tiny stars (smallest, slowest)
    for (let i = 0; i < layers.tiny.count; i++) {
        tinyStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (layers.tiny.maxSize - layers.tiny.minSize) + layers.tiny.minSize,
            speed: Math.random() * (layers.tiny.maxSpeed - layers.tiny.minSpeed) + layers.tiny.minSpeed,
            brightness: Math.random() * 0.3 + 0.1,
            hue: Math.random() * 60 + 180, // Cyan to blue range
            saturation: Math.random() * 30 + 70,
            lightness: Math.random() * 20 + 80
        });
    }
    
    // Create small stars (small, slower)
    for (let i = 0; i < layers.small.count; i++) {
        smallStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (layers.small.maxSize - layers.small.minSize) + layers.small.minSize,
            speed: Math.random() * (layers.small.maxSpeed - layers.small.minSpeed) + layers.small.minSpeed,
            brightness: Math.random() * 0.4 + 0.2,
            hue: Math.random() * 60 + 180, // Cyan to blue range
            saturation: Math.random() * 30 + 70,
            lightness: Math.random() * 20 + 80
        });
    }
    
    // Create medium stars (medium, medium speed)
    for (let i = 0; i < layers.medium.count; i++) {
        mediumStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (layers.medium.maxSize - layers.medium.minSize) + layers.medium.minSize,
            speed: Math.random() * (layers.medium.maxSpeed - layers.medium.minSpeed) + layers.medium.minSpeed,
            brightness: Math.random() * 0.5 + 0.3,
            hue: Math.random() * 60 + 180, // Cyan to blue range
            saturation: Math.random() * 30 + 70,
            lightness: Math.random() * 20 + 80,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinklePhase: Math.random() * Math.PI * 2
        });
    }
    
    // Create large stars (large, faster)
    for (let i = 0; i < layers.large.count; i++) {
        largeStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (layers.large.maxSize - layers.large.minSize) + layers.large.minSize,
            speed: Math.random() * (layers.large.maxSpeed - layers.large.minSpeed) + layers.large.minSpeed,
            brightness: Math.random() * 0.6 + 0.4,
            hue: Math.random() * 60 + 180, // Cyan to blue range
            saturation: Math.random() * 30 + 70,
            lightness: Math.random() * 20 + 80,
            twinkleSpeed: Math.random() * 0.03 + 0.01,
            twinklePhase: Math.random() * Math.PI * 2
        });
    }
    
    // Create nebulas (largest, fastest)
    for (let i = 0; i < layers.nebulas.count; i++) {
        nebulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (layers.nebulas.maxSize - layers.nebulas.minSize) + layers.nebulas.minSize,
            speed: Math.random() * (layers.nebulas.maxSpeed - layers.nebulas.minSpeed) + layers.nebulas.minSpeed,
            hue: Math.random() * 60 + 180, // Cyan to blue range
            saturation: Math.random() * 40 + 60,
            lightness: Math.random() * 30 + 70,
            alpha: Math.random() * 0.1 + 0.05,
            pulseSpeed: Math.random() * 0.01 + 0.005,
            pulsePhase: Math.random() * Math.PI * 2
        });
    }
    
    // Ripple effects
    const ripples = [];
    
    function createRipple(x, y) {
        ripples.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: Math.random() * 30 + 20,
            alpha: 0.7,
            speed: Math.random() * 2 + 1
        });
    }
    
    // Add ripple effect on hover
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('news-card') || 
            e.target.classList.contains('nav-link') ||
            e.target.classList.contains('hero-content') ||
            e.target.classList.contains('research-card') ||
            e.target.classList.contains('tech-card') ||
            e.target.classList.contains('gallery-item') ||
            e.target.classList.contains('launch-card')) {
            createRipple(e.clientX, e.clientY);
        }
    });
    
    // Animation loop with performance optimizations
    let lastTime = 0;
    const frameRate = 1000 / 60; // ~60fps cap
    
    function animate(currentTime) {
        // Frame rate limiting for better performance
        if (currentTime - lastTime < frameRate) {
            requestAnimationFrame(animate);
            return;
        }
        lastTime = currentTime;
        
        // Clear canvas with a semi-transparent fill for trail effect
        ctx.fillStyle = 'rgba(11, 12, 16, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw tiny stars (smallest, slowest parallax)
        tinyStars.forEach(star => {
            // Apply parallax effect - smallest movement
            const parallaxX = mouseX * 2;
            const parallaxY = mouseY * 2;
            
            // Draw star
            ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${star.brightness})`;
            ctx.beginPath();
            ctx.arc(
                star.x + parallaxX * 0.1, 
                star.y + parallaxY * 0.1, 
                star.size, 
                0, 
                Math.PI * 2
            );
            ctx.fill();
            
            // Move star with scroll
            star.y += star.speed + (scrollPosition * 0.001);
            
            // Reset star if it goes off screen
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            } else if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });
        
        // Draw small stars (small, slower parallax)
        smallStars.forEach(star => {
            // Apply parallax effect - small movement
            const parallaxX = mouseX * 4;
            const parallaxY = mouseY * 4;
            
            // Draw star
            ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${star.brightness})`;
            ctx.beginPath();
            ctx.arc(
                star.x + parallaxX * 0.2, 
                star.y + parallaxY * 0.2, 
                star.size, 
                0, 
                Math.PI * 2
            );
            ctx.fill();
            
            // Move star with scroll
            star.y += star.speed + (scrollPosition * 0.001);
            
            // Reset star if it goes off screen
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            } else if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });
        
        // Draw medium stars (medium, medium parallax)
        mediumStars.forEach(star => {
            // Apply parallax effect - medium movement
            const parallaxX = mouseX * 7;
            const parallaxY = mouseY * 7;
            
            // Twinkling effect
            star.twinklePhase += star.twinkleSpeed;
            const twinkle = Math.abs(Math.sin(star.twinklePhase)) * 0.5 + 0.5;
            
            // Draw star with brightness and twinkling
            ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${star.brightness * twinkle})`;
            ctx.beginPath();
            ctx.arc(
                star.x + parallaxX * 0.4, 
                star.y + parallaxY * 0.4, 
                star.size, 
                0, 
                Math.PI * 2
            );
            ctx.fill();
            
            // Move star with scroll
            star.y += star.speed + (scrollPosition * 0.002);
            
            // Reset star if it goes off screen
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            } else if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });
        
        // Draw large stars (large, faster parallax)
        largeStars.forEach(star => {
            // Apply parallax effect - large movement
            const parallaxX = mouseX * 10;
            const parallaxY = mouseY * 10;
            
            // Twinkling effect
            star.twinklePhase += star.twinkleSpeed;
            const twinkle = Math.abs(Math.sin(star.twinklePhase)) * 0.7 + 0.3;
            
            // Draw star with brightness and twinkling
            ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${star.brightness * twinkle})`;
            ctx.beginPath();
            ctx.arc(
                star.x + parallaxX * 0.6, 
                star.y + parallaxY * 0.6, 
                star.size, 
                0, 
                Math.PI * 2
            );
            ctx.fill();
            
            // Move star with scroll
            star.y += star.speed + (scrollPosition * 0.003);
            
            // Reset star if it goes off screen
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            } else if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });
        
        // Draw nebulas (largest, fastest parallax)
        const time = Date.now() * 0.0005;
        nebulas.forEach(nebula => {
            // Apply parallax effect - largest movement
            const parallaxX = mouseX * 15;
            const parallaxY = mouseY * 15;
            
            // Pulsing effect
            nebula.pulsePhase += nebula.pulseSpeed;
            const pulse = Math.abs(Math.sin(nebula.pulsePhase)) * 0.3 + 0.7;
            
            // Create gradient for nebula
            const gradient = ctx.createRadialGradient(
                nebula.x + parallaxX * 0.8,
                nebula.y + parallaxY * 0.8,
                0,
                nebula.x + parallaxX * 0.8,
                nebula.y + parallaxY * 0.8,
                nebula.size * pulse
            );
            
            gradient.addColorStop(0, `hsla(${nebula.hue}, ${nebula.saturation}%, ${nebula.lightness}%, ${nebula.alpha * pulse})`);
            gradient.addColorStop(0.7, `hsla(${nebula.hue}, ${nebula.saturation}%, ${nebula.lightness}%, ${nebula.alpha * 0.5 * pulse})`);
            gradient.addColorStop(1, `hsla(${nebula.hue}, ${nebula.saturation}%, ${nebula.lightness}%, 0)`);
            
            // Draw nebula
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(
                nebula.x + parallaxX * 0.8,
                nebula.y + parallaxY * 0.8,
                nebula.size * pulse,
                0,
                Math.PI * 2
            );
            ctx.fill();
            
            // Move nebula with scroll
            nebula.y += nebula.speed + (scrollPosition * 0.004);
            
            // Reset nebula if it goes off screen
            if (nebula.y > canvas.height + nebula.size) {
                nebula.y = -nebula.size;
                nebula.x = Math.random() * canvas.width;
            } else if (nebula.y < -nebula.size) {
                nebula.y = canvas.height + nebula.size;
                nebula.x = Math.random() * canvas.width;
            }
        });
        
        // Draw and update ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
            const ripple = ripples[i];
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(102, 252, 241, ${ripple.alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Update ripple
            ripple.radius += ripple.speed;
            ripple.alpha -= 0.02;
            
            // Remove ripple if it's faded out
            if (ripple.alpha <= 0) {
                ripples.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize cursor trail effect with performance optimizations
function initCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    let speed = 0.05; // Reduced for smoother performance
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.classList.add('active');
    });
    
    // Smooth cursor following with performance optimization
    let lastTrailTime = 0;
    const trailFrameRate = 1000 / 60; // ~60fps cap
    
    function trailAnimation(currentTime) {
        // Frame rate limiting for better performance
        if (currentTime - lastTrailTime < trailFrameRate) {
            requestAnimationFrame(trailAnimation);
            return;
        }
        lastTrailTime = currentTime;
        
        posX += (mouseX - posX) * speed;
        posY += (mouseY - posY) * speed;
        
        trail.style.left = `${posX}px`;
        trail.style.top = `${posY}px`;
        
        requestAnimationFrame(trailAnimation);
    }
    
    trailAnimation();
}

// Initialize line tracing effect
function initLineTracing() {
    // This function would be called when connecting elements with animated lines
    // For now, we'll just define the function for future use
}

// Page transition effect
function initPageTransitions() {
    // Add overlay for page transitions
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    // Handle all internal links for smooth transitions
    document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't interfere with anchor links or external links
            const href = this.getAttribute('href');
            if (href.startsWith('#') || href.startsWith('http')) return;
            
            // Allow browser to handle navigation naturally for Vercel routing
            // Just add a visual transition effect
            e.preventDefault();
            
            // Show transition overlay
            overlay.classList.add('active');
            
            // Navigate after a short delay to allow the transition effect
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
    
    // Hide overlay when page loads
    window.addEventListener('load', () => {
        overlay.classList.remove('active');
    });
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedStarfield();
    initCursorTrail();
    initLineTracing();
    initPageTransitions();
});