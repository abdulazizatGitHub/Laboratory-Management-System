// Import necessary modules and dependencies

import GenToken from "../Models/GenerateToken.js";


// Controller function to handle saving token data
const saveToken = async (req, res) => {
  try {
    // Extract token data from the request body
    const {  tokenNumber, patientData, tests, grandTotal, dateTime } = req.body;
    

    // Create a new token document
    const newToken = new GenToken({
      
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




const getGeneratedToken  = async (req, res) => {
  try {
      console.log("helo i am in getGenerateToken in Genertae Tokne controller")
      const generatedTokens = await GenToken.find();
      console.log("Patient Detail data in controlleris : ",generatedTokens);
      res.status(200).json(generatedTokens); 
  } catch (error) {
      console.error("Error fetching patient details:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
}


// Export the controller function
export { saveToken,getGeneratedToken };



