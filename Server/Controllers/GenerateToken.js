// Import necessary modules and dependencies

import GenToken from "../Models/GenerateToken.js";


// Controller function to handle saving token data
const saveToken = async (req, res) => {
  try {
    // Extract token data from the request body
    const {  tokenNumber, patientData, tests, grandTotal, dateTime, generatedBy ,state, remark} = req.body; 

    // Create a new token document
    const newToken = new GenToken({
      
      tokenNumber,
      patientData,
      tests,
      grandTotal,
      dateTime,
      generatedBy,
      state,
      remark
    });

    const savedToken = await newToken.save();
    res.status(201).json({ message: 'Token saved successfully', token: savedToken });
  } catch (error) {
    // Handle errors
    console.error('Error saving token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const getGeneratedToken  = async (req, res) => {
  try {

      const generatedTokens = await GenToken.find();
    
      res.status(200).json(generatedTokens);
  } catch (error) {
      console.error("Error fetching patient details:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
}

const updateToken = async (req, res) => {
  try {
    // Extract token ID from request parameters
    const tokenId = req.params.id;

    
    // Extract updated token data from request body
    const { tokenNumber, patientData, tests, grandTotal, dateTime, generatedBy, state, remark } = req.body; 

    // Check if the token with the provided ID exists
    const existingToken = await GenToken.findById(tokenId);

    if (!existingToken) {
      return res.status(404).json({ message: 'Token not found' });
    }

    // Update the token document with the new data
    existingToken.tokenNumber = tokenNumber;
    existingToken.patientData = patientData;
    existingToken.tests = tests;
    existingToken.grandTotal = grandTotal;
    existingToken.dateTime = dateTime;
    existingToken.generatedBy = generatedBy;
    existingToken.state= state;
    existingToken.remark = remark;
    
    // Save the updated token document
    const updatedToken = await existingToken.save();

    res.status(200).json({ message: 'Token updated successfully', token: updatedToken });
  } catch (error) {
    // Handle errors
    console.error('Error updating token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Export the controller function
export { saveToken,getGeneratedToken,updateToken };






