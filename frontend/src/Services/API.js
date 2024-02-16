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

// Update token count in the backend API
export const updateTokenCount = async () => {
    return axios.post(`${Url}/receptionist/generate_token`);
  };

// ===================Get Requests==================================

export const fetchtests = async () =>{
    return axios.get(`${Url}/admin/Addtest`);
}

// Fetch token count from the backend API
export const fetchTokenCount = async () => {
    try {
      const response = await axios.get(`${Url}/receptionist/generate_token`); // Adjust the endpoint according to your backend setup
      return response.data.tokenCount;
    } catch (error) {
      console.error('Error fetching token count:', error);
      throw error; // Propagate the error to the calling function/component
    }
  };