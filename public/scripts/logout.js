document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            fetch('/ajax-logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Display the logout message
                    const flashContainer = document.getElementById('flash-container');
                    if (flashContainer) {
                        flashContainer.innerHTML = `<p class="error">${data.message}</p>`;
                    }
                    // Redirect to homepage after a short delay
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                } else {
                    const flashContainer = document.getElementById('flash-container');
                    if (flashContainer) {
                        flashContainer.innerHTML = `<p class="error">Logout failed: ${data.message}</p>`;
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});