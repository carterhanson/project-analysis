const registerForm = document.getElementById("register-form");

async function sendPostRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function register(event){
    event.preventDefault();

    const username = registerForm.username.value;
    const password = registerForm.password.value;
    const postBody = { username: username, password: password };

    const response = await sendPostRequest('/user/register', postBody);
    document.getElementById('message').textContent = response.message;

}