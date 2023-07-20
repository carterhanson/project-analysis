const updateForm = document.getElementById("update-form");

async function sendPutRequest(url, data){
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    return response.json();
}

async function update(event){
    event.preventDefault();

    const email = updateForm.email.value;
    const password = updateForm.password.value;
    const putBody = { email: email, password: password};

    const response = await sendPutRequest('/user/update', putBody);
    document.getElementById('message').textContent = response.message;
}