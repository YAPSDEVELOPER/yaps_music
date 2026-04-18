const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Optional: Animate hamburger to X
    hamburger.classList.toggle('toggle');
});



// 1. Select Global Player Elements
const mainAudio = document.getElementById('main-audio');
const footerPlayBtn = document.querySelector('.play-pause-btn');
const footerTrackName = document.querySelector('.track-name');
const footerArtistName = document.querySelector('.artist-name');
const footerAlbumArt = document.querySelector('.player-album-art');
const progressFill = document.querySelector('.progress-fill');

// 2. Event Listener for ANY Play Button on the page
document.addEventListener('click', (e) => {
    // Check if the clicked element is a play button or inside one
    const btn = e.target.closest('.play-btn-trigger');
    
    if (btn) {
        // Get the audio source link
        const songSrc = btn.getAttribute('data-src');
        
        // Find the parent container (can be Trending Item, Album Card, or Music Card)
        const parent = btn.closest('.trending-item') || btn.closest('.album-card') || btn.closest('.music-card') || btn.closest('.hero-content');
        
        // Extract data from the clicked card
        const title = parent.querySelector('.card-title')?.innerText || "Unknown Title";
        const artist = parent.querySelector('.card-artist')?.innerText || "Unknown Artist";
        const img = parent.querySelector('.card-img')?.src || "https://via.placeholder.com";

        // Update the Bottom Player Bar UI
        footerTrackName.innerText = title;
        footerArtistName.innerText = artist;
        footerAlbumArt.src = img;
        
        // Set the song source and Play
        mainAudio.src = songSrc;
        mainAudio.play();

        // Change the Footer Play button to Pause icon
        footerPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
});

// 3. Bottom Player Bar Play/Pause Toggle
footerPlayBtn.addEventListener('click', () => {
    if (mainAudio.paused) {
        mainAudio.play();
        footerPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        mainAudio.pause();
        footerPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// 4. Update the Progress Bar while playing
mainAudio.addEventListener('timeupdate', () => {
    if (mainAudio.duration) {
        const percent = (mainAudio.currentTime / mainAudio.duration) * 100;
        progressFill.style.width = `${percent}%`;
    }
});

// 5. Handle song ending
mainAudio.addEventListener('ended', () => {
    footerPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    progressFill.style.width = '0%';
});


const modal = document.getElementById('bio-modal');
const closeModal = document.querySelector('.close-modal');

// Open Modal when Artist Profile is clicked
document.querySelectorAll('.artist-profile').forEach(profile => {
    profile.addEventListener('click', () => {
        const name = profile.querySelector('.artist-name').innerText;
        const img = profile.querySelector('.artist-img').src;
        const status = profile.querySelector('.artist-status').innerText;

        // Update Modal Content
        document.getElementById('modal-name').innerText = name;
        document.getElementById('modal-img').src = img;
        document.getElementById('modal-status').innerText = status;
        
        // Example: Change bio based on name (Optional logic)
        document.getElementById('modal-description').innerText = `${name} is one of Uganda's most influential artists in 2026.`;

        modal.style.display = 'block';
    });
});

// Close Modal
closeModal.onclick = () => modal.style.display = 'none';

// Close if user clicks outside the box
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
};




const authModal = document.getElementById('auth-modal');
const loginNavBtn = document.querySelector('.login-btn'); // Button in your Header
const closeAuth = document.querySelector('.close-auth');
const loginTab = document.getElementById('login-tab');
const regTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const regForm = document.getElementById('register-form');

// Open Auth Modal
loginNavBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.style.display = 'block';
});

// Close Auth Modal
closeAuth.onclick = () => authModal.style.display = 'none';

// Switch to Register
regTab.onclick = () => {
    regTab.classList.add('active');
    loginTab.classList.remove('active');
    regForm.classList.add('active');
    loginForm.classList.remove('active');
};

// Switch to Login
loginTab.onclick = () => {
    loginTab.classList.add('active');
    regTab.classList.remove('active');
    loginForm.classList.add('active');
    regForm.classList.remove('active');
};

// Close modal if user clicks outside
window.addEventListener('click', (e) => {
    if (e.target == authModal) authModal.style.display = 'none';
});


// 1. Smooth Scrolling for Site Map Links
// This allows fans to click "Afrobeat Hits" in the footer and slide smoothly to that section
document.querySelectorAll('.footer-column ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 2. Simple Footer Interaction (Optional)
// This can show an alert or a message when legal links (Privacy/Terms) are clicked 
// if you haven't created those separate pages yet.
const legalLinks = document.querySelectorAll('.legal ul li a');
legalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const pageName = e.target.innerText;
        // Check if the link is just a placeholder "#"
        if (link.getAttribute('href') === "#") {
            console.log(`User requested ${pageName} - Page coming soon!`);
            // alert(`The ${pageName} page is currently under review by Yaps Music Legal Team.`);
        }
    });
});

// 3. Footer Copyright Year Auto-Update
// This ensures your footer always shows the current year (e.g., 2026)
const copyrightText = document.querySelector('.footer-bottom p');
if (copyrightText) {
    const currentYear = new Date().getFullYear();
    copyrightText.innerHTML = `&copy; ${currentYear} Yaps Music Uganda. Developed for the Culture.`;
}





const loginBtn = document.querySelector('.login-btn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-btn');

// Open Modal
loginBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stop page from jumping
    loginModal.style.display = 'block';
});

// Close Modal when clicking (x)
closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Close Modal when clicking outside the box
window.addEventListener('click', (e) => {
    if (e.target == loginModal) {
        loginModal.style.display = 'none';
    }
});




const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const registerForm = document.getElementById('register-form');

// Switch to Register
registerTab.onclick = () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
};

// Switch to Login
loginTab.onclick = () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
};



// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Parallax Effect: Image moves slightly with mouse movement
    const heroImage = document.querySelector('.image-container img');
    const heroSection = document.querySelector('.hero');

    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate offset (adjust divisor for more/less movement)
        const moveX = (clientX - centerX) / 40;
        const moveY = (clientY - centerY) / 40;

        heroImage.style.transform = `translate(${50 + moveX}px, ${moveY}px) scale(1.05)`;
    });

    // Reset image position when mouse leaves
    heroSection.addEventListener('mouseleave', () => {
        heroImage.style.transition = 'transform 0.5s ease-out';
        heroImage.style.transform = 'translate(50px, 0px) scale(1)';
    });

    // 2. Interactive "Hits" Cards
    const hitCards = document.querySelectorAll('.hit-card');
    
    hitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
            card.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.transform = 'translateY(-15px) scale(1.05)';
            card.style.boxShadow = '0 10px 25px rgba(233, 30, 99, 0.4)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
        
        // Simple click feedback
        card.addEventListener('click', () => {
            const genre = card.innerText;
            console.log(`Loading ${genre} playlist...`);
            // You can trigger an audio player play event here
        });
    });

    // 3. Smooth Fade-in for Content
    const textContent = document.querySelector('.text-content');
    textContent.style.opacity = '0';
    textContent.style.transform = 'translateX(-30px)';
    
    setTimeout(() => {
        textContent.style.transition = 'all 1s ease-out';
        textContent.style.opacity = '1';
        textContent.style.transform = 'translateX(0)';
    }, 300);
});








document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const loginBtn = document.querySelector('.login-btn');
    const searchBtn = document.querySelector('.search-btn');
    const loginModal = document.getElementById('loginModal');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeLogin = document.getElementById('closeLogin');
    const closeSearch = document.getElementById('closeSearch');

    // Open Login
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'flex';
    });

    // Open Search
    searchBtn.addEventListener('click', () => {
        searchOverlay.style.display = 'flex';
        document.querySelector('.search-input').focus(); // Auto focus the input
    });

    // Close on X click
    closeLogin.onclick = () => loginModal.style.display = 'none';
    closeSearch.onclick = () => searchOverlay.style.display = 'none';

    // Close on Background click
    window.onclick = (e) => {
        if (e.target == loginModal) loginModal.style.display = 'none';
        if (e.target == searchOverlay) searchOverlay.style.display = 'none';
    };

    // Form Toggle Logic
    const lTab = document.getElementById('login-tab');
    const rTab = document.getElementById('register-tab');
    const lForm = document.getElementById('login-form');
    const rForm = document.getElementById('register-form');

    rTab.onclick = () => {
        lForm.style.display = 'none'; rForm.style.display = 'block';
        rTab.classList.add('active'); lTab.classList.remove('active');
    };
    lTab.onclick = () => {
        rForm.style.display = 'none'; lForm.style.display = 'block';
        lTab.classList.add('active'); rTab.classList.remove('active');
    };
});





const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('main-play-btn');
const progressBar = document.getElementById('progress-bar');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');

// Function to Play Selected Song
document.querySelectorAll('.play-btn-trigger').forEach(btn => {
    btn.addEventListener('click', function() {
        const songSrc = this.getAttribute('data-src');
        const card = this.closest('.album-card') || this.closest('.trending-item');
        const title = card.querySelector('.card-title').innerText;
        const artist = card.querySelector('.card-artist').innerText;

        audio.src = songSrc;
        playerTitle.innerText = title;
        playerArtist.innerText = artist;
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
});

// Play/Pause Toggle
playBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
};

// Update Progress Bar
audio.ontimeupdate = () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress || 0;
};

// Seek Song
progressBar.oninput = () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
};





// Data for the search simulation
const mockDatabase = ["Drake", "The Weeknd", "Taylor Swift", "Blinding Lights", "God's Plan", "Yaps Exclusive"];

const searchInput = document.getElementById('mainSearch');
const resultsBox = document.getElementById('searchResults');
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const sideDrawer = document.getElementById('sideDrawer');

// --- 1. Search Functionality ---
searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    resultsBox.innerHTML = '';
    
    if (value.length > 0) {
        const filtered = mockDatabase.filter(item => item.toLowerCase().includes(value));
        if (filtered.length > 0) {
            resultsBox.classList.add('active');
            filtered.forEach(item => {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.textContent = item;
                div.onclick = () => { searchInput.value = item; resultsBox.classList.remove('active'); };
                resultsBox.appendChild(div);
            });
        }
    } else {
        resultsBox.classList.remove('active');
    }
});

// --- 2. Menu Toggle Functionality ---
menuToggle.addEventListener('click', () => sideDrawer.classList.add('open'));
closeMenu.addEventListener('click', () => sideDrawer.classList.remove('open'));

// Close search if clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target)) resultsBox.classList.remove('active');
});

// --- 3. Smooth Mouse-Wheel Scroll for Row 1 ---
const scrollBar = document.getElementById('trendingScroll');
scrollBar.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollBar.scrollLeft += e.deltaY;
});





const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-pause');
const progressBar = document.querySelector('.progress-bar');

// Toggle Play/Pause
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
    } else {
        audio.pause();
        playBtn.textContent = '▶';
    }
});

// Update Progress Bar as music plays
audio.addEventListener('timeupdate', () => {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percentage;
});

// Seek music when user slides the bar
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Volume Control
const volumeBar = document.querySelector('.volume-bar');
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});




const descriptions = [
    "Experience superior sound quality with 15 hours of battery life.",
    "Engineered with powerful 40mm drivers for staggering deep bass.",
    "Foldable design for portability and long-lasting comfort.",
    "Connect seamlessly via Bluetooth 5.0 for an interruption-free vibe."
];

let currentIndex = 0;
const descriptionElement = document.getElementById("changing-description");

function changeText() {
    // Increment index and loop back to 0 if at the end
    currentIndex = (currentIndex + 1) % descriptions.length;
    
    // Update the text content
    descriptionElement.textContent = descriptions[currentIndex];
}

// Change text every 4 seconds
setInterval(changeText, 4000);






const bars = document.querySelectorAll('.music-bars span');

setInterval(() => {
    bars.forEach(bar => {
        bar.style.height = Math.floor(Math.random() * 100) + "%";
    });
}, 200);
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('mainSearch');
    
    // Check if the search input actually exists to avoid errors
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const songCards = document.querySelectorAll('.song-card');

            songCards.forEach(card => {
                // We search inside the title and artist specifically
                const titleElement = card.querySelector('.song-title');
                const artistElement = card.querySelector('.song-artist');

                if (titleElement && artistElement) {
                    const title = titleElement.textContent.toLowerCase();
                    const artist = artistElement.textContent.toLowerCase();

                    // Logic: If query is in title OR artist, show card. Else hide.
                    if (title.includes(query) || artist.includes(query)) {
                        card.style.display = ""; // Shows it (works for grid/flex)
                    } else {
                        card.style.display = "none"; // Hides it
                    }
                }
            });
        });
    }
});


recordBtn.addEventListener('click', async () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        recordBtn.classList.remove('recording');
        statusText.innerText = "Processing audio...";
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            // Here you would send 'audioBlob' to a recognition API (like ACRCloud or AudD)
            console.log("Recording complete. Size:", audioBlob.size);
            statusText.innerText = "Search complete (Add API endpoint to process)";
        };

        mediaRecorder.start();
        recordBtn.classList.add('recording');
        statusText.innerText = "Recording... click again to stop";
    } catch (err) {
        console.error("Microphone access denied:", err);
        statusText.innerText = "Mic access denied.";
    }
});

const recordBtn = document.getElementById('recordBtn');
const btnText = recordBtn.querySelector('.btn-text');
let mediaRecorder;
let audioChunks = [];

recordBtn.addEventListener('click', async () => {
    // If already recording, stop it
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        recordBtn.classList.remove('is-recording');
        btnText.innerText = "Analyzing Song...";
        return;
    }

    // Start new recording
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            console.log("Audio captured, ready to search:", audioBlob);
            
            // Logic to send audioBlob to your search API goes here
            setTimeout(() => {
                btnText.innerText = "Record to Search";
            }, 3000);
        };

        mediaRecorder.start();
        recordBtn.classList.add('is-recording');
        btnText.innerText = "Listening...";
        
    } catch (err) {
        alert("Microphone access is required to search by song.");
        console.error(err);
    }
});

async function loadArtists() {
    try {
        const response = await fetch('fetch_data.php');
        const artists = await response.json();
        
        // Find your horizontal scroll container
        const container = document.querySelector('.artist-scroll-container');
        container.innerHTML = ''; // Clear the "placeholder" Eddy Kenzos

        artists.forEach(artist => {
            const artistHTML = `
                <div class="artist-profile">
                    <div class="profile-img-wrapper">
                        <img src="Assets/IMAGE/${artist.image}" alt="${artist.name}" class="artist-img">
                    </div>
                    <h4 class="artist-name">${artist.name}</h4>
                    <span class="artist-status">${artist.status}</span>
                </div>
            `;
            container.innerHTML += artistHTML;
        });
    } catch (error) {
        console.error("Error loading artists:", error);
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', loadArtists);





// Wait for the document to load
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('main-player');
    const playBtn = document.querySelector('.btn-play');
    
    // Select the icon inside the button to change it
    const playIcon = playBtn.querySelector('i');

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            // Change "PLAY" text and icon to "PAUSE"
            playIcon.classList.replace('fa-play', 'fa-pause');
            playBtn.innerHTML = '<i class="fas fa-pause"></i> PAUSE';
            playBtn.style.background = "#ff4757"; // Optional: Change color when playing
        } else {
            audio.pause();
            // Change back to "PLAY"
            playIcon.classList.replace('fa-pause', 'fa-play');
            playBtn.innerHTML = '<i class="fas fa-play"></i> PLAY';
            playBtn.style.background = ""; // Reset color
        }
    });
});






document.addEventListener('DOMContentLoaded', () => {
    // 1. Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Searching public database for: ${query}`);
            // Redirect to search results or filter songs
            // window.location.href = `songs.html?search=${query}`;
        }
    });

    // 2. Play Button Toggle
    const playBtn = document.querySelector('.btn-play');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i> PAUSE';
            playBtn.style.background = '#ff3366'; // Change color when playing
        } else {
            playBtn.innerHTML = '<i class="fas fa-play"></i> PLAY';
            playBtn.style.background = ''; // Revert to original
        }
    });

    // 3. Simulated Live Stats Update
    const statText = document.querySelector('.public-stats strong');
    setInterval(() => {
        // Randomly fluctuate listener count to make it feel "live"
        let currentCount = parseInt(statText.innerText.replace('k', ''));
        let fluctuation = (Math.random() * 0.1).toFixed(1);
        statText.innerText = `${(1.2 + parseFloat(fluctuation))}k`;
    }, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple visual feedback
            const btn = contactForm.querySelector('.btn');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Thank you for reaching out to YAPS Music! We will get back to you soon.');
                btn.innerText = originalText;
                btn.style.opacity = '1';
                contactForm.reset();
            }, 1500);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
