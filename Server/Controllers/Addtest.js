import Test from "../Models/AddTest.js";


const addTest = async (req, res) => {
  const { code, name, type, price, section, sampleType, sampleQuantity, unit, normalRange } = req.body;

  try {
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

export { addTest };


// ==========Get Request===

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};