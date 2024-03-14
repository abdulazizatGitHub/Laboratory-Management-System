import StaffModel from "../Models/StaffModel.js";
import Patient from "../Models/Patientregistration.js";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

import dotenv from 'dotenv';
import cloudinary from "../Cloudinaryconfig.js";
dotenv.config();
// Set up OAuth 2.0 client credentials
const client_id ='366053873235-5378r5ff27nnstr1j8k62eq87njjtl9g.apps.googleusercontent.com';
const client_secret ='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';
const redirected_url ='https://developers.google.com/oauthplayground';
const Refresh_token ='1//040Rvw1Z3chyWCgYIARAAGAQSNwF-L9Ir8JYDI0zb8wMTzjeCruIHWXQxUJilS4PNuHFWZbQbpQBJ0BHkSRmJhAnYr2gETxaMA9k';
// Create OAuth 2.0 client
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirected_url);
oAuth2Client.setCredentials({ refresh_token: Refresh_token });


export const staffRegistration = async (req, res) => {
    try {
        const { name, fatherName, gender, age, role, shift, contactNumber, cnic, address, email , userName, password } = req.body;
        
        const imageupload = await cloudinary.uploader.upload(req.file.path,{
            folder:"staffImages",
        })
        // Check if a staff member with the same contact number or CNIC already exists
        const existingStaff = await StaffModel.findOne({
            $or: [
                { contactNumber: contactNumber },
                { cnic: cnic },
                { email: email }
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
                email,
                image:{
                  public_id: imageupload.public_id,
                  url:imageupload.secure_url,
                },           
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
    try {
        // Find the staff data by ID
        const staffData = await StaffModel.findById(req.params.id);

        // Check if staff data exists
        if (!staffData) {
            return res.status(404).send("Staff data not found.");
        }

        // Delete the associated image from Cloudinary
        if (staffData.image && staffData.image.public_id) {
            await cloudinary.uploader.destroy(staffData.image.public_id);
        }

        // Delete the staff data from the database
        await StaffModel.findByIdAndDelete(req.params.id);

        res.status(200).send("Staff data deleted successfully.");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting staff data.");
    }
};


export const deletePatData = async (req, res) => {
    
    try {

        // Delete the staff data from the database
        await Patient.findByIdAndDelete(req.params.id);

        res.status(200).send("Patient data deleted successfully.");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting Patient data.");
    }
}


// Controller function to update staff data
export const updateStaff = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedStaffData = req.body;
  
      // Find the staff member by ID and update their data
      const updatedStaff = await StaffModel.findByIdAndUpdate(id, updatedStaffData, { new: true });
  
      if (!updatedStaff) {
        return res.status(404).json({ message: 'Staff member not found' });
      }
  
      // Return the updated staff data
      res.status(200).json(updatedStaff);
    } catch (error) {
      console.error('Error updating staff:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  // Update patient details
export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; // Assuming the updated data is sent in the request body

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedPatient);
    } catch (error) {
        console.error("Error updating patient data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getStaffDetailsByRole = async (req, res) => {

    try {
        const receptionistDetails = await StaffModel.find({role: 'Receptionist'});
        console.log('the receptionist data is: ', receptionistDetails);
        res.status(200).json(receptionistDetails);

    } catch (error) {

        

    }

}


//Forgot Password //////////////////////////////


// Create a Nodemailer transporter using OAuth 2.0
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'khanmahad19285@gmail.com', // Your Gmail address
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: Refresh_token,
        accessToken: oAuth2Client.getAccessToken()
    }
});





// Function to send reset code
export const sendResetCode = async (req, res) => {
    const { username } = req.body;

    try {
        // Generate reset code (for demonstration purpose)
        const resetCode = Math.random().toString(36).slice(-8);

        // Store the reset code in the database for the user
        const user = await StaffModel.findOneAndUpdate(
            { userName: username },
            { resetCode: resetCode },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the reset code to the user via email or other means
        await transporter.sendMail({
            from: 'khanmahad19285@gmail.com',
            to: user.email,
            subject: 'Password Reset Code',
            text: `Your password reset code is: ${resetCode}`
        });

        res.status(200).json({ message: 'Reset code sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to send reset code' });
    }
};

// Function to reset password
export const resetPassword = async (req, res) => {
    const { username, resetCode, newPassword } = req.body;

    try {
        // Retrieve the reset code associated with the user from the database
        const user = await StaffModel.findOne({ userName: username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the reset code matches the one stored in the database
        if (user.resetCode !== resetCode) {
            return res.status(400).json({ message: 'Invalid reset code' });
        }

        // Update the user's password and clear the reset code
        user.password = newPassword;
        user.resetCode = null;
        await user.save();

        // Send confirmation email to the user
        await transporter.sendMail({
            from: 'khanmahad19285@gmail.com',
            to: user.email,
            subject: 'Password Reset Confirmation',
            text: 'Your password has been successfully reset.'
        });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to reset password' });
    }
};
