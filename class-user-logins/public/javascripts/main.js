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

async function getData(){
    const messageElement = document.getElementById('message');

    // Send a GET request to the /user/info route
    const response = await fetch('/user/info');

    if (response.ok) {
        // If the response is ok (status in the range 200-299), then the user is logged in
        const data = await response.json();
        messageElement.textContent = `Welcome, ${data.username}!`;
    } else {
        // If the response is not ok, then the user is not logged in
        messageElement.textContent = 'Welcome!';
    }
}

(async function() {
    await getData();
})();