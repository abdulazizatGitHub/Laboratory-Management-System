import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.v2.config({
    cloud_name: 'dcm6v7iwp',
    api_key:'163823565768156',
    api_secret:'EZmxRKbLXP8ECJ1nkA3yn7Xjo4k',
    secure: true,
});

export default cloudinary;