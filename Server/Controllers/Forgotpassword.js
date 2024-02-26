// import StaffModel from '../models/staffModel.js';
// import bcrypt from 'bcrypt';
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'your_email@gmail.com',
//         pass: 'your_password'
//     }
// });

// export const sendResetCode = async (req, res) => {
//     const { username } = req.body;

//     try {
//         const user = await StaffModel.findOne({ userName: username });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Generate reset code (for demonstration purpose)
//         const resetCode = Math.random().toString(36).slice(-8);

//         await transporter.sendMail({
//             from: 'your_email@gmail.com',
//             to: user.email,
//             subject: 'Password Reset Code',
//             text: `Your password reset code is: ${resetCode}`
//         });

//         res.status(200).json({ message: 'Reset code sent successfully' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Failed to send reset code' });
//     }
// };

// export const resetPassword = async (req, res) => {
//     const { username, newPassword } = req.body;

//     try {
//         const user = await StaffModel.findOne({ userName: username });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         user.password = hashedPassword;
//         await user.save();

//         await transporter.sendMail({
//             from: 'your_email@gmail.com',
//             to: user.email,
//             subject: 'Password Reset Confirmation',
//             text: 'Your password has been successfully reset.'
//         });

//         res.status(200).json({ message: 'Password updated successfully' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Failed to reset password' });
//     }
// };
