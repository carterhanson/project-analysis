const loginForm = document.getElementById("login-form");

// Function to send POST request
async function sendPostRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Add this line to send cookies with the request
        body: JSON.stringify(data)
    });
    return response.json();
}

async function login(event){
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const response = await sendPostRequest('/user/login', { username, password });

    document.getElementById('message').textContent = response.message;
}

async function logout(){
    const logoutResponse = await fetch('/user/logout', { method: 'POST' });
    if (logoutResponse.ok) {
        // If the logout was successful, redirect the user to the login page
        window.location.href = 'login.html';
    } else {
        // Show an error message if the logout was not successful
        console.error('Logout failed');
    }
}