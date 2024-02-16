// Import necessary modules and dependencies

import GenToken from "../Models/GenerateToken.js";


// Controller function to handle saving token data
const saveToken = async (req, res) => {
  try {
    // Extract token data from the request body
    const { pin, tokenNumber, patientData, tests, grandTotal, dateTime } = req.body;
    console.log(pin);

    // Create a new token document
    const newToken = new GenToken({
      pin,
      tokenNumber,
      patientData,
      tests,
      grandTotal,
      dateTime
    });

    // Save the token to the database
    const savedToken = await newToken.save();

    // Respond with success message and saved token data
    res.status(201).json({ message: 'Token saved successfully', token: savedToken });
  } catch (error) {
    // Handle errors
    console.error('Error saving token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the controller function
export { saveToken };
