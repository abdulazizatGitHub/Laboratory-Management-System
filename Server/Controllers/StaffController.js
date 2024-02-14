import StaffModel from "../Models/StaffModel.js";

export const staffRegistration = async (req, res) => {
    try {
        const { name, fatherName, gender, age, role, shift, contactNumber, cnic, address } = req.body;
        console.log('Name: ', name);
        console.log('Address: ', address);

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
            }
        });

        // Save the new staff registration to the database
        const result = await newStaffRegistration.save();

        // Send response to client
        res.status(201).json({ message: 'Staff registered successfully' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
