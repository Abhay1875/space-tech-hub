// Fetch and display upcoming rocket launches
document.addEventListener('DOMContentLoaded', function() {
    
    
    const launchesBody = document.getElementById('launches-body');
    const sortBySelect = document.getElementById('sort-by');
    const agencyFilter = document.getElementById('agency-filter');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    let allLaunches = []; // Store all launches for filtering
    
    
    
    // Function to fetch launches
    function fetchLaunches() {
        // Show loading state
        launchesBody.innerHTML = '<tr><td colspan="5" class="loading">Loading upcoming launches...</td></tr>';
        
        // Fetch launches from The Space Devs API
        fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/')
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    allLaunches = data.results;
                    setupFilters(allLaunches);
                    displayLaunches(allLaunches);
                    setupNextLaunchCountdown(allLaunches);
                } else {
                    launchesBody.innerHTML = '<tr><td colspan="5" class="no-data">No upcoming launches found.</td></tr>';
                }
            })
            .catch(error => {
                console.error('Error fetching launches:', error);
                launchesBody.innerHTML = '<tr><td colspan="5" class="error">Failed to load launches. Please try again later.</td></tr>';
            });
    }
    
    // Function to set up agency filter options
    function setupFilters(launches) {
        const agencies = new Set();
        
        launches.forEach(launch => {
            if (launch.launch_service_provider) {
                agencies.add(launch.launch_service_provider.name);
            }
        });
        
        // Clear existing options except "All Agencies"
        while (agencyFilter.options.length > 1) {
            agencyFilter.remove(1);
        }
        
        // Add agencies to filter
        agencies.forEach(agency => {
            const option = document.createElement('option');
            option.value = agency;
            option.text = agency;
            agencyFilter.appendChild(option);
        });
    }
    
    // Function to display launches in the table
    function displayLaunches(launches) {
        // Clear table body
        launchesBody.innerHTML = '';
        
        // Sort launches based on selected option
        const sortedLaunches = sortLaunches(launches, sortBySelect.value);
        
        // Display launches
        sortedLaunches.forEach(launch => {
            const row = document.createElement('tr');
            
            // Format the launch date
            const launchDate = new Date(launch.net);
            const formattedDate = launchDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Get agency information
            const agency = launch.launch_service_provider ? launch.launch_service_provider.name : 'N/A';
            
            // Get location information
            const location = launch.pad ? launch.pad.location.name : 'N/A';
            
            row.innerHTML = `
                <td>${agency}</td>
                <td>${launch.rocket ? launch.rocket.configuration.name : 'N/A'}</td>
                <td>${launch.name}</td>
                <td>${formattedDate}</td>
                <td>${location}</td>
            `;
            
            launchesBody.appendChild(row);
        });
    }
    
    // Function to sort launches
    function sortLaunches(launches, sortBy) {
        return [...launches].sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(a.net) - new Date(b.net);
            } else if (sortBy === 'agency') {
                const agencyA = a.launch_service_provider ? a.launch_service_provider.name : '';
                const agencyB = b.launch_service_provider ? b.launch_service_provider.name : '';
                return agencyA.localeCompare(agencyB);
            }
            return 0;
        });
    }
    
    // Function to filter launches by agency
    function filterLaunchesByAgency(launches, agency) {
        if (agency === 'all') return launches;
        return launches.filter(launch => 
            launch.launch_service_provider && launch.launch_service_provider.name === agency
        );
    }
    
    // Function to search launches
    function searchLaunches(launches, searchTerm) {
        if (!searchTerm) return launches;
        const term = searchTerm.toLowerCase();
        return launches.filter(launch => 
            (launch.name && launch.name.toLowerCase().includes(term)) ||
            (launch.launch_service_provider && launch.launch_service_provider.name.toLowerCase().includes(term)) ||
            (launch.rocket && launch.rocket.configuration.name.toLowerCase().includes(term))
        );
    }
    
    // Function to set up next launch countdown
    function setupNextLaunchCountdown(launches) {
        if (launches.length === 0) return;
        
        // Sort launches by date to find the next one
        const sortedLaunches = [...launches].sort((a, b) => new Date(a.net) - new Date(b.net));
        const nextLaunch = sortedLaunches[0];
        
        // Update next launch info
        const nextLaunchInfo = document.getElementById('next-launch-info');
        nextLaunchInfo.innerHTML = `
            <h3>${nextLaunch.name}</h3>
            <p>Launching on ${new Date(nextLaunch.net).toLocaleString()}</p>
            <p>Rocket: ${nextLaunch.rocket ? nextLaunch.rocket.configuration.name : 'N/A'}</p>
        `;
        
        // Start countdown
        startCountdown(new Date(nextLaunch.net));
    }
    
    // Function to start countdown timer
    function startCountdown(launchDate) {
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        function updateCountdown() {
            const now = new Date();
            const diff = launchDate - now;
            
            if (diff <= 0) {
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Event listeners
    sortBySelect.addEventListener('change', function() {
        const filtered = filterLaunchesByAgency(allLaunches, agencyFilter.value);
        const searched = searchLaunches(filtered, searchInput.value);
        displayLaunches(searched);
    });
    
    agencyFilter.addEventListener('change', function() {
        const filtered = filterLaunchesByAgency(allLaunches, agencyFilter.value);
        const searched = searchLaunches(filtered, searchInput.value);
        displayLaunches(searched);
    });
    
    searchBtn.addEventListener('click', function() {
        const filtered = filterLaunchesByAgency(allLaunches, agencyFilter.value);
        const searched = searchLaunches(filtered, searchInput.value);
        displayLaunches(searched);
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const filtered = filterLaunchesByAgency(allLaunches, agencyFilter.value);
            const searched = searchLaunches(filtered, searchInput.value);
            displayLaunches(searched);
        }
    });
    
    // Initial fetch
    fetchLaunches();
});