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
        const registrationNumber = generateRegistrationNumber(count + 1); // Increment the count

        // Generate a default password with the laboratory name
        const defaultPassword = 'sslab123';

        // Attach generated credentials to the request body
        req.body.userName = registrationNumber;
        req.body.password = defaultPassword;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error generating credentials:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
