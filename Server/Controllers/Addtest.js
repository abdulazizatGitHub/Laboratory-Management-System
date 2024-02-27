import Test from "../Models/AddTest.js";
import PhlebotomyReportModel from "../Models/PhlebotomyReportModel.js";

export const addTest = async (req, res) => {
  const { code, name, type, price, section, sampleType, sampleQuantity, unit, normalRange } = req.body;

  try {
    const existingTest = await Test.findOne({ code });

    if (existingTest) {
      return res.status(400).json({ success: false, message: 'Test already exists' });
    }

    const newTest = new Test({
      code,
      name,
      type,
      price,
      section,
      sampleType,
      sampleQuantity,
      unit,
      normalRange,
    });

    await newTest.save();
    res.status(201).json({ success: true, message: 'Test added successfully', data: newTest });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add test', error: error.message });
  }
};




// ==========Get Request===

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTestReportDetails = async (req,res) => {
  try {
    const reportsResult = await PhlebotomyReportModel.find({state: 'Finalized'});
    
    if(reportsResult) {
      res.status(201).json(reportsResult);
    } else {
      res.status(400).json({message: 'No Finalized Reports Found.'});
    }

  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error', error);
  }
}

export const getAllTestReportDetails = async (req, res) => {
  try {
    const allReportsData = await PhlebotomyReportModel.find();
    console.log(allReportsData);
    if(allReportsData) {
      res.status(201).json(allReportsData);
    } else {
      res.status(400).json('No Reports Found.');
    }

  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error', error);
  }
}