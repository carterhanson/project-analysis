const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Role = require('../models/Role');

const router = express.Router();

const TOT_NUM_USERS = 10;

const emailAddresses = [
    'manager_a@example.com',
    'manager_b@domain.com',
    'susanroberts@website.net',
    'johndoe@myweb.com',
    'janedoe@example.net',
    'bobsmith@domain.net',
    'emmajohnson@webplace.com',
    'oliviasmith@site.com',
    'jamesbrown@web.com',
    'marywilliams@website.net',
  ];
  
  
  async function createRoles() {
    await Role.bulkCreate([
      { title: 'Manager' },
      { title: 'Employee' },
    ]);
  }
  

  async function createUsersWithRoles() {
    const roles = await Role.findAll();
    
    
    const usersData = [];
    for (let i = 0; i < TOT_NUM_USERS; i++) {
      usersData.push({
        username: emailAddresses[i], 
        password: await bcrypt.hash("password", 10), 
        isEmployeed: true, 
        roleId: i < 2 ? roles[0].id : roles[1].id,
      });
    }
  
    await User.bulkCreate(usersData);
  }
  
  router.get('/', async (req, res) => {
    try {
      // Will only seed the database if there are less users than we expect.
      if ((await User.findAll()).length < TOT_NUM_USERS) {
        // Create roles if they don't exist
        await createRoles();
  
        // Create users and associate them with roles
        await createUsersWithRoles();
  
        res.status(200).send('Database seeded successfully');
      } else {
        res.status(200).send('Database already seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding database:', error);
      res.status(500).send('Error seeding database');
    }
  });
  
  module.exports = router;