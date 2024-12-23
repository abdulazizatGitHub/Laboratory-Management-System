// Import necessary modules and dependencies

import GenToken from "../Models/GenerateToken.js";
import moment from "moment";
import SalesModel from "../Models/SalesModel.js";

// Controller function to handle saving token data
const saveToken = async (req, res) => {
  try {
    // Extract token data from the request body
    const {
      tokenNumber,
      patientData,
      tests,
      grandTotal,
      date,
      time,
      generatedBy,
      state,
      remark,
    } = req.body;

    // Create a new token document
    const newToken = new GenToken({
      tokenNumber,
      patientData,
      tests,
      grandTotal,
      date,
      time,
      generatedBy,
      state,
      remark,
    });

    const savedToken = await newToken.save();
    res
      .status(201)
      .json({ message: "Token saved successfully", token: savedToken });
  } catch (error) {
    // Handle errors
    console.error("Error saving token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getGeneratedToken = async (req, res) => {
  try {
    const generatedTokens = await GenToken.find();

    res.status(200).json(generatedTokens);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateToken = async (req, res) => {
  try {
    // Extract token ID from request parameters
    const tokenId = req.params.id;

    // Extract updated token data from request body
    const {
      tokenNumber,
      patientData,
      tests,
      grandTotal,
      dateTime,
      generatedBy,
      state,
      remark,
    } = req.body;

    // Check if the token with the provided ID exists
    const existingToken = await GenToken.findById(tokenId);

    if (!existingToken) {
      return res.status(404).json({ message: "Token not found" });
    }

    // Update the token document with the new data
    existingToken.tokenNumber = tokenNumber;
    existingToken.patientData = patientData;
    existingToken.tests = tests;
    existingToken.grandTotal = grandTotal;
    existingToken.dateTime = dateTime;
    existingToken.generatedBy = generatedBy;
    existingToken.state = state;
    existingToken.remark = remark;

    // Save the updated token document
    const updatedToken = await existingToken.save();

    res
      .status(200)
      .json({ message: "Token updated successfully", token: updatedToken });
  } catch (error) {
    // Handle errors
    console.error("Error updating token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export the controller function
export { saveToken, getGeneratedToken, updateToken };

export const getSales = async (req, res) => {
  try {
    const { user, date } = req.query;

    console.log("User is: ", user);
    console.log("Date: ", date);

    // Query the database for tokens generated by the user on the specified date
    const salesData = await GenToken.aggregate([
      {
        $match: {
          generatedBy: user,
          date: date
        }
      },
      {
        $group: {
          _id: null,
          totalTokens: { $sum: 1 },
          totalAmount: { $sum: "$grandTotal" }
        }
      }
    ]);

    if (salesData.length === 0) {
      return res
        .status(404)
        .json({ message: "No sales data found for the given date and user." });
    }

    // Extract totalTokens and totalAmount from the aggregated result
    const { totalTokens, totalAmount } = salesData[0];

    console.log("Total Tokens: ", totalTokens);
    console.log("Total Amount: ", totalAmount);

    res.status(200).json({
      totalTokens,
      totalAmount
    });
  } catch (error) {
    console.error("The error in getting sales is: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addSalesData = async (req, res) => {
  try {
    const { user, date, closingNumber, totalTokens, totalAmount, remarks } = req.body;

    // Check if a sales record with the same closingNumber already exists
    const existingSales = await SalesModel.findOne({ closingNumber });

    if (existingSales) {
      // If record exists, respond with an appropriate message
      console.log('Data with this closing number already exists:', existingSales);
      return res.status(400).json({ message: "Data already saved!" });
    }

    // Create a new sales record
    const newSales = new SalesModel({
      user,
      date,
      closingNumber,
      totalTokens,
      totalAmount,
      remarks
    });

    // Save the new sales record
    const response = await newSales.save();
    console.log('Response of sales data after save:', response);
    res.status(201).json({ message: true });
  } catch (error) {
    console.error("Error saving sales data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
