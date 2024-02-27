import mongoose from "mongoose";
import PendingPhlebotomy from "../Models/Pendingpehlebotmy.js";

// Controller function to save pending phlebotomy data
export const savePendingPhlebotomyData = async (req, res) => {
    try {
        // Extract all data from the request body
        const { dateTime, generatedBy, grandTotal, patientData, remarks, tests, tokenNumber } = req.body;

        // Create a new instance of PendingPhlebotomy model
        const newPendingPhlebotomy = new PendingPhlebotomy({
            dateTime,
            generatedBy,
            grandTotal,
            patientData,
            remarks,
            tests,
            tokenNumber
        });

        // Save the pending phlebotomy data to the database
        await newPendingPhlebotomy.save();

        // Send success response
        res.status(201).json({ success: true, message: 'Pending phlebotomy data saved successfully' });
    } catch (error) {
        // Send error response if any error occurs
        console.error('Error occurred while saving pending phlebotomy data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Controller function to fetch pending phlebotomy data
export const getPendingPhlebotomyData = async (req, res) => {
    try {
        // Fetch pending phlebotomy data from the database
        const pendingPhlebotomyData = await PendingPhlebotomy.find();

        // Send the fetched data as the response
        res.status(200).json(pendingPhlebotomyData);
    } catch (error) {
        // Send an error response if any error occurs
        console.error('Error occurred while fetching pending phlebotomy data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};