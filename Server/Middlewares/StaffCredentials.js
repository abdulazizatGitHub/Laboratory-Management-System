import StaffModel from "../Models/StaffModel.js";

export const generateStaffCredentials = async (req, res, next) => {
    try {
        const { role, name } = req.body;

        // Extract the first name and last name initials
        const [firstName, lastName] = name.split(' ');
        const firstNameInitial = firstName ? firstName[0].toUpperCase() : '';
        const lastNameInitial = lastName ? lastName[0].toUpperCase() : '';

        // Fetch the count of registered staff members with the given role
        const count = await StaffModel.countDocuments({ role });

        // Function to generate a formatted registration number with three digits
        const generateRegistrationNumber = (count) => {
            const formattedCount = count.toString().padStart(3, '0');
            return `${role.substring(0, 2).toUpperCase()} - ${firstNameInitial}${lastNameInitial} - ${formattedCount}`;
        };

        // Generate a unique registration number based on the role, name initials, and count
        let registrationNumber = generateRegistrationNumber(count + 1); // Increment the count

        // Fetch the highest username from the database
        const highestUsernameStaff = await StaffModel.findOne({}, { userName: 1 }, { sort: { userName: -1 } });

        // Set the counter to start from '001' if no username exists, otherwise start from the next number after the highest username
        const counter = highestUsernameStaff ? parseInt(highestUsernameStaff.userName.split('-')[2], 10) + 1 : 1;

        // Generate a username with the specified format
        const formattedUsernameCounter = ('000' + counter).slice(-3);
        const generatedUsername = `${role.substring(0, 2).toUpperCase()} - ${firstNameInitial}${lastNameInitial} - ${formattedUsernameCounter}`;

        // Remove spaces from the generated registration number
        registrationNumber = generatedUsername.replace(/\s/g, '');

        // Attach generated credentials to the request body
        req.body.userName = registrationNumber;
        req.body.password = 'sslab123'; // Assuming a default password
            console.log("i am doing the work")
        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error generating credentials:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
