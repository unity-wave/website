const express = require('express');
const router = express.Router();
const fetchEmployee = require('../middleware/fetchEmployee');
const bcrypt = require('bcryptjs');

const createUploadMiddleware = require('../middleware/cloudinary');

const upload = createUploadMiddleware('employee_verification');

const EmployeeVerification = require('../models/EmployeeVerification');
const path = require('path');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Single route for handling different types of data and file uploads
router.post('/employee-verification', fetchEmployee, upload.fields([
    { name: 'EmployeePhoto', maxCount: 1 },
    { name: 'AdhaarCard', maxCount: 1 },
    { name: 'policeVerification', maxCount: 1 },

]), async (req, res) => {
    try {
        const employee = req.employee;

        // console.log('Request Body:', req.body);
        // console.log('Files:', req.files); // Check files received

        // Initialize an empty update object
        const updateData = {};

        // Destructuring data from req.body
        const { hometownAddress, currentAddress } = req.body;

        // Collect file paths from Cloudinary
        if (req.files.EmployeePhoto && req.files.EmployeePhoto.length > 0) {
            updateData.EmployeePhoto = req.files.EmployeePhoto[0].path;
        }
        if (req.files.AdhaarCard && req.files.AdhaarCard.length > 0) {
            updateData.AdhaarCard = req.files.AdhaarCard[0].path;
        }
        if (req.files.policeVerification && req.files.policeVerification.length > 0) {
            updateData.policeVerification = req.files.policeVerification[0].path;
        }

        // Add other fields to updateData only if they are present
        if (hometownAddress) updateData.hometownAddress = hometownAddress;
        if (currentAddress) updateData.currentAddress = currentAddress;

        // If there are no updates to be made, return an appropriate response
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No valid fields to update' });
        }

        // Find and update the employee verification data
        const updatedEmployee = await EmployeeVerification.findOneAndUpdate(
            { _id: employee._id },
            { $set: updateData },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ 
            message: 'Employee verification data updated successfully',  
            updatedEmployee: updatedEmployee.toObject()
        });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ENDPOINT TO CHANGE PASSWORD.
router.post('/change-password', fetchEmployee, async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;

        // Check if both passwords are provided
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'Please provide both new password and confirm password' });
        }

        // Check if the passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Fetch the current employee
        const employee = req.employee;

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the employee's password in the database
        employee.password = hashedPassword;
        await employee.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/get-employee', fetchEmployee, async (req, res) => {
    try {
        const employee = req.employee;
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/user', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Use the user ID from the decoded token
        const userId = decoded.user.id;

        const user = await EmployeeVerification.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // console.log('User data sent:', user);
        res.json(user);
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
});

module.exports = router;
