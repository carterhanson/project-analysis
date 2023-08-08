/*
	TODO: Implement the checkLogin() function which will call to the
	/users/info endpoint to see if the user is logged in. If the user
	is already logged in, then remove the login form and present a message
	to the user saying that they are already logged in.

	Implement other login functions as well. Use what we have done in class
	as a guide.
*/
const loginForm = document.getElementById("login-form");

const checkLogin = async () => {
    try {
        const response = await fetch('/user/info');
        const data = await response.json();
        
        if (response.status === 200) {
            // User is logged in
            const loginForm = document.getElementById('login-form');
            const message = document.createElement('p');
            message.textContent = `You are already logged in as ${data.username}.`;
            loginForm.parentNode.replaceChild(message, loginForm);
        }
    } catch (error) {
        // If there's an error or user is not logged in, do nothing
    }
};

(async function() {
    await checkLogin();
})();

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