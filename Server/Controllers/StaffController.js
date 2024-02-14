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
                contentType: req.file.mimeType
            }
        });

        const result = await StaffModel.save(newStaffRegistration);

        if(result) {
            console.log("Staff Added Successfully");
        }
        
    } catch (error) {
        
    }
}