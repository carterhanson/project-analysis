const updateForm = document.getElementById('updateForm');
const messageElement = document.getElementById('message');

updateForm.submitButton.disabled = true;

async function getEmployees(){    

    // Send a GET request to the /user/info route
    const response = await fetch('/employees/');

    if (response.ok) {
        // If the response is ok (status in the range 200-299), then the user 
        // is logged in & has permission to view this page
        const employeeList = await response.json();
        const select = document.getElementById('employee-select');
        select.innerHTML = ""; // Clear out the select dropdown.

        // TODO: populate dropdown

    } else {
        // If the response is not ok, then there was an issue of some kind

        if(response.status === 401){
            messageElement.classList.add('bg-yellow-500'); // Adds the yellow background class (Tailwind CSS)
            messageElement.textContent = "User not permitted to view data."
        }else{
						// Redirect user to login.
            window.location.href = 'login.html';
        }

    }
}

function setFormData(employee){
    // TODO: Implement.
}

async function getEmployeeData(){
    // TODO: Implement. Here if the response from getting the specific
		// employee data was "ok", then we can allow the user to click the
		// form's "update" button with: updateForm.submitButton.disabled = false;
}

async function logout() {
    try {
        const response = await fetch('/users/logout', {
            method: 'POST',
            credentials: 'include', // This is necessary to include the session cookie with the request
        });

        if (response.ok) {
            console.log('User successfully logged out');
            window.location.href = '/login.html'; // Redirect to login page after successful logout
        } else {
            console.log('Logout failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function getFormData(){
    // TODO: Implement.
}

async function sendPutData(url, data){
    // Function to send PUT request
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Add this line to send cookies with the request
        body: JSON.stringify(data)
    });

    return response;
}

async function updateEmployee(event){ 
    // TODO: Implement.
}

(async function() {
    await getEmployees();
})();