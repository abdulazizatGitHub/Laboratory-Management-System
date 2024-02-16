import axios from 'axios';

const Url = 'http://localhost:5000';

export const registerPatient = async (formData) => {
    return await axios.post(`${Url}/PatientRegistration`, formData);

};

export const staffRegsiteration = async (formData) => {
    return await axios.post(`${Url}/admin/staff_registration`, formData);
}

export const addTest = async (test) =>{
    return await axios.post(`${Url}/admin/Addtest`,test);
}

// ===================Get Requests==================================

export const fetchtests = async () =>{
    return axios.get(`${Url}/admin/Addtest`);
}