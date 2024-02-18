import StaffModel from "../Models/StaffModel.js";
import Patient from "../Models/Patientregistration.js";

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
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
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
        console.log("helo i am in Patient Detail in server controller")
        const patientDetails = await Patient.find();
        console.log("Patient Detail data in controlleris : ",patientDetails);
        res.status(200).json(patientDetails); 
    } catch (error) {
        console.error("Error fetching patient details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
