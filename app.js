document.addEventListener('DOMContentLoaded', function () {
    // Check for saved language preference in local storage
    let userLanguage = localStorage.getItem('userLanguage') || 'en';
    setLanguage(userLanguage);

    // Function to toggle language
    window.toggleLanguage = function () {
        userLanguage = (userLanguage === 'en') ? 'ar' : 'en'; // Toggle between English ('en') and Arabic ('ar')
        setLanguage(userLanguage);
        // Save user's language preference in local storage
        localStorage.setItem('userLanguage', userLanguage);
    };
});

// Function to set language dynamically
function setLanguage(lang) {
    // Load language-specific content dynamically
    fetchLanguage(lang)
        .then(data => {
            updateContent(data);
        })
        .catch(error => console.error('Error fetching language data:', error));
}

// Function to fetch language data
function fetchLanguage(lang) {
    return fetch(`lang/${lang}.json`)
        .then(response => response.json());
}

// Function to update content based on language data
function updateContent(data) {
    const elements = document.querySelectorAll(`[data-lang]`);
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (data[key] !== undefined) {
            element.innerText = data[key];
        }
    });
    document.body.setAttribute('dir', data.dir); // Set document direction (ltr or rtl)
}
