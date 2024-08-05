import StaffModel from "../Models/StaffModel.js";

export const generateStaffCredentials = async (req, res, next) => {
    try {
        const { name, cnic } = req.body;

        // Sanitize the name by removing spaces and converting to lowercase
        const sanitizedName = name.replace(/\s+/g, '').toLowerCase();
        const sanitizedCnic = cnic.replace(/-/g, '');

        // Extract the last 3 digits of the sanitized CNIC
        const cnicLastThreeDigits = sanitizedCnic.slice(-3);

        // Generate the base username using sanitized name and CNIC suffix
        let baseUsername = `${sanitizedName}${cnicLastThreeDigits}`;

        // Check for existing usernames in the database
        const existingUser = await StaffModel.findOne({ userName: new RegExp(`^${baseUsername}(\\d*)$`) }).sort({ userName: -1 });

        let finalUsername;

        if (existingUser) {
            // Extract the last numeric suffix from the highest existing username
            const existingSuffix = existingUser.userName.match(/(\d+)$/);
            const newSuffix = existingSuffix ? parseInt(existingSuffix[0], 10) + 1 : 1;
            finalUsername = `${baseUsername}${newSuffix}`;
        } else {
            // No existing usernames, so use the base username
            finalUsername = baseUsername;
        }

        // Attach generated credentials to the request body
        req.body.userName = finalUsername;
        req.body.password = 'sslab123'; // Assuming a default password

        console.log("Generated Username: ", finalUsername);

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error generating credentials:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
