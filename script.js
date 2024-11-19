
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.accordion-button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const cardBody = this.closest('.card').querySelector('.card-body');
            const isExpanded = cardBody.style.display === 'block';

            // Toggle display
            cardBody.style.display = isExpanded ? 'none' : 'block';
        });
    });
});

// Handle keyboard navigation for the nav menu
document.addEventListener('keydown', function (event) {
    const navMenu = document.getElementById('navMenu');
    const navItems = Array.from(navMenu.querySelectorAll('.nav-link'));

    // Find the currently focused nav item
    const focusedItemIndex = navItems.indexOf(document.activeElement);

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        // Move to the next item
        const nextIndex = (focusedItemIndex + 1) % navItems.length;
        navItems[nextIndex].focus();
        event.preventDefault();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        // Move to the previous item
        const prevIndex = (focusedItemIndex - 1 + navItems.length) % navItems.length;
        navItems[prevIndex].focus();
        event.preventDefault();
    }
});
// Authentication System
document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const authStatus = document.getElementById('authStatus');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const usernameInput = document.getElementById('username');

    // Check if the user is logged in
    const username = localStorage.getItem('username');
    if (username) {
        showLoggedInState(username);
    }

    // Login button click event
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            localStorage.setItem('username', username);
            showLoggedInState(username);
        } else {
            alert("Please enter a username.");
        }
    });

    // Logout button click event
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('username');
        showLoggedOutState();
    });

    function showLoggedInState(username) {
        authStatus.innerText = `Welcome, ${username}!`;
        loginSection.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    }

    function showLoggedOutState() {
        authStatus.innerText = '';
        loginSection.style.display = 'block';
        logoutBtn.style.display = 'none';
        usernameInput.value = '';
    }
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeBtn = document.getElementById('toggleTheme');

    // Check and apply the saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        toggleThemeBtn.innerText = 'Light Mode';
    } else {
        toggleThemeBtn.innerText = 'Dark Mode';
    }

    // Event listener for theme toggle button
    toggleThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        
        // Save the current theme in localStorage
        localStorage.setItem('theme', theme);

        // Update button text based on theme
        toggleThemeBtn.innerText = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    });
});

// Load saved filter from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedFilter = localStorage.getItem("newsFilter") || "all";
    filterNewsArticles(savedFilter);
});

// Add event listeners to filter buttons
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", (event) => {
        const category = event.target.getAttribute("data-category");
        
        // Save the selected filter to localStorage
        localStorage.setItem("newsFilter", category);

        // Filter the news articles based on the selected category
        filterNewsArticles(category);
    });
});

// Function to filter news articles by category
// Function to filter news articles and update button style
function filterNewsArticles(category) {
    const articles = document.querySelectorAll(".news-article");
    
    articles.forEach(article => {
        if (category === "all" || article.getAttribute("data-category") === category) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });

    // Remove 'selected' class from all buttons, add to the clicked one
    document.querySelectorAll(".filter-btn").forEach(button => button.classList.remove("selected"));
    document.querySelector(`.filter-btn[data-category="${category}"]`).classList.add("selected");
}

// Authentication System
document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const authStatus = document.getElementById('authStatus');
    const logoutBtn = document.getElementById('logoutBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');


    // Check if the user is already logged in
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
        showLoggedInState(savedUser.username);
    }

    // Login functionality
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        // Check for existing users in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.username === username && user.password === password);

        if (foundUser) {
            // Successfully logged in
            localStorage.setItem('user', JSON.stringify(foundUser));
            showLoggedInState(foundUser.username);
            window.location.href = 'profile.html';

        } else {
            alert("Invalid username or password.");
        }
    });
    // Sign up functionality
    signupBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        // Check for existing user
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            alert("Username already exists.");
            return;
        }

        // Save new user
        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Sign up successful! You can now log in.");
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        showLoggedOutState();
    });

    // Show the logged-in state
    function showLoggedInState(username) {
        authStatus.innerText = `Welcome, ${username}!`;
        loginSection.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    }

    // Show the logged-out state
    function showLoggedOutState() {
        authStatus.innerText = '';
        loginSection.style.display = 'block';
        logoutBtn.style.display = 'none';
        usernameInput.value = '';
        passwordInput.value = '';
    }
});
const apiKey = '156094e5-0cb1-4635-86da-c71b11223ec4';  // Replace with your actual API key

document.getElementById('searchBtn').addEventListener('click', function() {
    const newsQuery = document.getElementById('newsQuery').value.trim();

    if (newsQuery) {
        // Update API URL
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(newsQuery)}&apiKey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const resultsContainer = document.getElementById('newsResults');
                resultsContainer.innerHTML = '';  // Clear previous results

                if (data.articles && data.articles.length > 0) {
                    data.articles.forEach(article => {
                        const articleElement = document.createElement('div');
                        articleElement.classList.add('news-article');
                        articleElement.innerHTML = `
                            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                            <p><strong>Author:</strong> ${article.author || 'Unknown'}</p>
                            <p><strong>Published:</strong> ${new Date(article.publishedAt).toLocaleString()}</p>
                            <p><strong>Description:</strong> ${article.description || 'No description available'}</p>
                        `;
                        resultsContainer.appendChild(articleElement);
                    });
                } else {
                    resultsContainer.innerHTML = 'No news articles found for this query.';
                }
            })
            .catch(error => {
                console.error('Error fetching news data:', error);
                document.getElementById('newsResults').innerHTML = 'Failed to load news articles.';
            });
    } else {
        alert('Please enter a keyword to search for news!');
    }
});
