import axios from 'axios';

const Url = 'http://localhost:5000';

export const registerPatient = async (formData) => {
    return await axios.post(`${Url}/PatientRegistration`, formData);

};

export const staffRegsiteration = async (formData) => {
    return await axios.post(`${Url}/admin/staffRegistration`, formData);
}
