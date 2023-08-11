const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const User = require('../models/User');

const router = express.Router();

const MANAGER_ROLE = 1;


/*
    TODO: Below are some suggested functions to implement if you are struggling with where to start.
            These functions are all of the ones that I used to write this controller, along with
            the steps outlined below as well. Feel free to take your own approach if you would like.
*/

function isLoggedIn(req){    
    return req.session && req.session.user;
}

function isLoggedInAndManager(req){    
    return isLoggedIn(req) && req.session.user.role == MANAGER_ROLE;
    
}

async function updateUserFields(existingUser, newUserData){
    
}

router.get('/', async (req, res) => {

    /*
        This endpoint is used to get all Users, except the one currently logged in,
        to display in the dropdown area. Remember that only users with a role of manager
				are allowed to see this data.

        Steps:
        -------

        1) Check if the user is logged in at all.
                If not, return proper status code and message.


        2) If the user is a manager:            
                then retrieve all Users *except for* the
                user currently logged in so that this can be displayed in the dropdown.

            Else:
                return appropriate status code and message saying that the user does not have permission
                to view this page. Remember, that if we are here, the user *is* logged in, but they are just
                not a manager.

    */

});

router.get('/:id', async (req, res) => {

    /*
        This endpoint is used when a User selects someone from the Employee
        dropdown menu. The :id will be the Employee to gather data on.

        Steps
        -------
        1) Check that the user is both logged in and has a role of Manager.
                If this is a manager:
                    Retrieve the User with the id that was request via the path parameter.

                    If that User was found:
                        Give a response with that User inside of it => res.json(userFound)

                    Else:
                        Give a response with the appropriate status code and a message indicating
                        that the user could not be found.
                Else:
                    Give a response with the appropriate status code and a message indicating tha thte user is
                    not logged in.

    */

});

router.put('/:id', async (req, res) => {

    /*
        This is the route that is hit when the User with id of :id
        is updated with the data sent in the request body. Below, you
        will notice that there is a try-catch block. This is code that 
        should be left in.

        Steps
        -------
    
        1) Get the employee data out of the body of thre request.

        try{

            2) Get the User with the id given in the path parameter.

            3) If that User does not exist:
                    return an appropriate status code along with a message indicating
                    that the desired User could not be found.

            4) Update the User retrieved from the database with the data given from the client.
                Keep in mind that the data given from the client *may not* be updating *all*
                of the data on the User - for example, perhaps only the username was updated, or perhaps
                only the employment status was updated. Therefore you must check which fields were
                given by the client and only update those fields on the User retrieved from the database.
                    Hint: Look up how to iterate over the properties of an object to see if properties exist.

                Also, remember that if the password is being updated, that you must *encrypt* that password before
                saving it to the database. Bycrypt is also an asynchronous operation and thus must be awaited.

                For this step, I wrote a function and called it here like so:

                await updateUserFields(existingUser, userFromPostBody);

            5) Call the .save() method on the existingUser that was just updated. This is also an asynchronous
                method that must be awaited.

            6) Send a response back saying that the User was updated successfully.

        }catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to update employee' });
        }

    */
    

});

module.exports = router;