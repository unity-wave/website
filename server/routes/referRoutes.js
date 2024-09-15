const express = require('express');
const multer = require('multer');
const Refer = require('../models/referModel');
const router = express.Router();
const path = require('path');
const upload = multer({ dest: 'uploads/' });

// Route for submitting the referral form
router.post('/referandearn', upload.none(), async (req, res) => {
    const { referrerName, candidateName, email, phone, purpose, designation } = req.body;

    try {
        // Create a new referral entry
        const newReferral = new Refer({
            referrerName,
            candidateName,
            email,
            phone,
            purpose,
            designation
        });

        // Save the referral to the database
        await newReferral.save();

        // Send success response
        res.status(201).json({
            success: true,
            message: "Referral successfully submitted",
            data: newReferral
        });
    } catch (error) {
        console.error("Error submitting referral:", error);
        // Send error response
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
});



module.exports = router;
