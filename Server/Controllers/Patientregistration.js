// patientController.js
import Patient from '../Models/Patientregistration.js';

export const registerPatient = async (req, res) => {
  try {
    // Add logic to save patient data to the database using the Patient model
    const { name, gender, age, cnic, mobileNumber, address, email, refDoctor, internalRemarks, patientRemarks } = req.body;

    // Example: Saving to MongoDB
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
    });

    await patient.save();

    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

