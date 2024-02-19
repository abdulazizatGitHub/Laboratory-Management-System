import axios from 'axios';

const Url = 'http://localhost:5000';

export const registerPatient = async (formData) => {
  return await axios.post(`${Url}/receptionist/PatientRegistration`, formData);

};

export const staffRegsiteration = async (formData) => {
  return await axios.post(`${Url}/admin/staff_registration`, formData);
}

export const getStaffDetails = async () => {
  return await axios.get(`${Url}/admin/view-staff-record`);
}

export const getPatientDetails = async () => {
  try {
    const res = await axios.get(`${Url}/admin/view-patient-detail`);
    return  res.data; // Extract patient data from the response
    
  } catch (error) {
    console.error('Error fetching patient numbers:', error);
    throw error;
  } 
}

export const addTest = async (test) =>{
  return await axios.post(`${Url}/admin/Addtest`,test);
}

//Saved the TOKEN DATA 
export const saveToken = async (tokenData) =>{
  return await axios.post(`${Url}/receptionist/generate_token`,tokenData);
}

// ===================Get Requests==================================

export const fetchtests = async () =>{
  return await axios.get(`${Url}/admin/Addtest`);
}

//Get No of Test Counts ///////////
export const getAllTests = async () =>{
  try {
    const response = await axios.get(`${Url}/receptionist`); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
}

export const getAllPatientNumbers = async () => {
  try {
    const response = await axios.get(`${Url}/receptionist/PatientRegistration`);
    return  response.data.patientCount; // Extract patient data from the response
    
  } catch (error) {
    console.error('Error fetching patient numbers:', error);
    throw error;
  }
};

export const  getGeneratedToken=async()=>{
  try {
    const response = await axios.get(`${Url}/receptionist/generate_token`);
    return  response.data; // Extract patient data from the response
    
  } catch (error) {
    console.log('Error fetching Generated Token Data',error )
    throw error;
  }
}

