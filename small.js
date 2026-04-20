const menuToggle = document.getElementById('menuToggle');
const sideDrawer = document.getElementById('sideDrawer');
const closeMenu = document.getElementById('closeMenu');

// Fungua Menu
menuToggle.addEventListener('click', () => {
    sideDrawer.classList.add('active');
});

// Funga Menu
closeMenu.addEventListener('click', () => {
    sideDrawer.classList.remove('active');
});





const mainSearch = document.getElementById('mainSearch');
const artistProfiles = document.querySelectorAll('.artist-profile');

mainSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    artistProfiles.forEach(profile => {
        const name = profile.querySelector('.artist-name').textContent.toLowerCase();

        // Check if the typed name matches the artist name
        if (name.includes(searchTerm)) {
            profile.style.display = "block"; // Show match
        } else {
            profile.style.display = "none";  // Hide others
        }
    });
});




