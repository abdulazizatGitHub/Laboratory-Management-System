import StaffModel from "../Models/StaffModel.js";
import Patient from "../Models/Patientregistration.js";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

export const staffRegistration = async (req, res) => {
    try {
        const { name, fatherName, gender, age, role, shift, contactNumber, cnic, address, userName, password } = req.body;

        // Check if a staff member with the same contact number or CNIC already exists
        const existingStaff = await StaffModel.findOne({
            $or: [
                { contactNumber: contactNumber },
                { cnic: cnic }
            ]
        });

        if (existingStaff) {
            return res.status(201).json({ message: 'User Already Exists' });
        } else {
            // Create a new staff registration
            const newStaffRegistration = new StaffModel({
                name,
                fatherName,
                gender,
                age,
                role,
                shift,
                contactNumber,
                cnic,
                address,
                image: req.file.filename,               
                
                userName,
                password
            });

            // Save the new staff registration to the database
            const result = await newStaffRegistration.save();

            // Send response to client
            res.status(201).json({ message: 'Staff registered successfully' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getStaffDetais = async (req, res) => {

    try {
        const staffDetails = await StaffModel.find();
        res.status(200).json({staffDetails});
    } catch (error) {
        console.error("Error fetching staff details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getPatientDetails = async (req, res) => {
    try {

        const patientDetails = await Patient.find();
        res.status(200).json(patientDetails); 
    } catch (error) {
        console.error("Error fetching patient details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the staff exists with the provided username and password
        const staff = await StaffModel.findOne({ userName: username, password: password });
        
        if (staff) {
            // Generate JWT token
            const token = jwt.sign({ username: staff.userName, role: staff.role }, process.env.SECRETKEY, { expiresIn: '1h' });
            // Return all user data upon successful login
            res.status(200).json({ token, user: staff });
        } else {
            // Return an error if staff not found or invalid credentials
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

export const changePassword = async (req, res) => {
    try {
        const token = req.headers.authorization; // Retrieve the authorization header
  
        if (!token) {
            return res.status(401).json({ message: "Authorization header is missing" });
        }

        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid authorization header format" });
        }

        const decodedToken = jwt.verify(tokenParts[1], process.env.SECRETKEY);
        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const { userId, newPassword } = req.body;
        console.log("The Data is",req.body);
        if (!userId || !newPassword) {
            return res.status(400).json({ message: "Missing userId or newPassword in request body" });
        }

        // Update the password in the database for the user with userId
        const updatedStaff = await StaffModel.findByIdAndUpdate(userId, { password: newPassword });
        if (!updatedStaff) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send a success response
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "CastError") {
            res.status(400).json({ message: "Invalid userId format" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};


export const deleteStaffData = async (req, res) => {
    console.log(req.params.id);
    try {
        // Find the staff data by ID
        const staffData = await StaffModel.findById(req.params.id);

        // Check if staff data exists
        if (!staffData) {
            return res.status(404).send("Staff data not found.");
        }

        // Delete the associated image file from the uploads folder
        if (staffData.image) {
            const imagePath = path.join('./uploads/', staffData.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete the staff data from the database
        await StaffModel.findByIdAndDelete(req.params.id);

        res.status(200).send("Staff data deleted successfully.");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting staff data.");
    }
}