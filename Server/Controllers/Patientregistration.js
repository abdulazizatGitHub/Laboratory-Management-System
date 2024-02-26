// patientController.js
import Patient from '../Models/Patientregistration.js';

export const registerPatient = async (req, res) => {
  try {
    const { name, gender, age, cnic, mobileNumber, address, email, refDoctor, internalRemarks, patientRemarks, pin } = req.body;
    
    // Check if the patient already exists
    const existingPatient = await Patient.findOne({ name, cnic }); // Adjust the query as per your database schema

    if (existingPatient) {
      // If patient exists, return existing data
      return res.status(200).json({ message: 'Patient already exists', patient: existingPatient });
    }

    // If patient doesn't exist, save new patient data
    const patient = new Patient({
      name,
      gender,
      age,
      cnic,
      mobileNumber,
      address,
      email,
      refDoctor,
      internalRemarks,
      patientRemarks,
      pin,
    });

    await patient.save();

    res.status(201).json({ message: 'Patient registered successfully', patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getPatientCount = async (req, res) => {
  try {
    const patientCount = await Patient.countDocuments();
    res.status(200).json({ patientCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

