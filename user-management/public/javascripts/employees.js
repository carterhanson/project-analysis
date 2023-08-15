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

        employeeList.forEach(employee => {
            const option = document.createElement('option');
            option.value = employee.id; 
            option.textContent = employee.username; 
            select.appendChild(option);
        });

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
    /* 
			TODO: Implement.
			This method takes in an employee object (one that was retrieved from the server),
			and then will populate the updateForm (a global variable at the top of this file which
			has a handle on the form element), and will set the form fields to the value of this employee
			so that the form has the employee values in it for the user to update.
		
		*/
    const formFields = updateForm.elements;
    formFields.employeeId.value = employee.id;
    formFields.employeeUsername.value = employee.username;

    updateForm.submitButton.disabled = false;
		
}

async function getEmployeeData(){
	/*    
		 TODO: Implement. 
			This function is called when the button to get a specific employee is pressed.
			The id of the selected employee is gathered from the dropdown and a fetch() request			
			is made to the /employees/:id route to get the specific employee's data that was requested

			Here if the response from getting the specific
			employee data was "ok", then we can:
				1) Call setFormData() (making sure to pass in the employee returned from the server).
				2) Allow the user to click the form's "update" button with: updateForm.submitButton.disabled = false;
	*/

    const select = document.getElementById('employee-select');
    const selectedEmployeeId = select.value;

    try {
        const response = await fetch(`/employees/${selectedEmployeeId}`);

        if (response.ok) {
            const employeeData = await response.json();
            setFormData(employeeData);
        } else {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }


}

async function logout() {
    // Create request object to make a POST request.	
    const requestObj = {
    method: 'POST',
    credentials: 'include', // This is necessary to include the session cookie with the request
};
    
    // Make request.
const response = await fetch('/users/logout', requestObj);

    // Check on response from server.
if (response.ok) {
    console.log('User successfully logged out');
    window.location.href = '/login.html'; // Redirect to login page after successful logout
} else {
    console.log('Logout failed');
}

}

function getFormData(){
    /* 
			TODO: Implement.
			This function gathers the information on the updateForm once the "update" button
			has been pressed. This function then returns an object with the form data
			in it.
			Ex:
			return {
				id: <id_from_form>,
				username: <username_from_form>,
				password: <password_from_form>,
				isEmployed: <isEmployed_from_form>,
			}

		*/

    const id = updateForm.employeeId.value;
    const username = updateForm.employeeUsername.value;
    const password = updateForm.employeePassword.value;
    const isEmployed = updateForm.isEmployed.checked;

    return { id, username, password, isEmployed };
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
    event.preventDefault();
    
    /* 
        TODO: Implement.
        This is the function that is called when the updateForm is submitted.
        1) Create an employee variable and set it equal to what is returned from
                the gathering the form data.
        
        2) Call the sendPutData() function, making sure to pass in the proper parameters,
                in order to send this data to the server.
                    const response = await sendPutData(<send in proper params>);

        If the response variable is ok (response.ok), then messageElement
        should be updated to say that the user was updated.
        Otherwise update the messageElement to say that the update failed and write
        out the message in the response (response.message).
    
    */

    const employee = getFormData();
    console.log(employee);
    const response = await sendPutData(`/employees/${employee.id}`, employee);

    if (response.ok) {
        messageElement.textContent = 'Employee was updated successfully.';
    } else {
        const errorMessage = await response.json();
        messageElement.textContent = `Failed to update employee: ${errorMessage.message}`;
    }
}

(async function() {
    await getEmployees();
})();