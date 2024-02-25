import axios from 'axios';

const Url = 'http://localhost:5000';

export const registerPatient = async (formData) => {
  return await axios.post(`${Url}/receptionist/PatientRegistration`, formData);

};

export const staffRegsiteration = async (formData) => {
  return await axios.post(`${Url}/admin/staff_registration`, formData);
}

export const getStaffDetails = async () => { 
  try{
    const res =await axios.get(`${Url}/admin/view-staff-record`);
    return res.data;
  }
  catch (error) {
    console.error('Error fetching staff details:', error);
    throw error;
  } 
}

export const getPatientDetails = async () => {
  try {
    const res = await axios.get(`${Url}/admin/view-patient-detail`);
    
    return  res.data; // Extract patient data from the response
    
  } catch (error) {
    console.error('Error fetching patient details:', error);
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


//Login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${Url}/Login`, {
      username,
      password
    });
      
    return response.data; // Assuming the backend returns role upon successful login
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Propagate error to handle it in components
  }
};


// Change Password API
export const changePassword = async (userData, token) => {
  try {
      const response = await axios.put("/admin/Change-password", userData, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};



export const deleteStaffData = async (id) =>{
  try{
    return await axios.delete(`${Url}/admin/staffDel/${id}`)
  }
  catch(error){
    throw error;
  }
}

export const deletePatData = async (id) =>{
  try{
    return await axios.delete(`${Url}/admin/patDel/${id}`)
  }
  catch(error){
    throw error;
  }
}
export const updateStaffData = async (staffData) => {
  try {
    return await axios.put(`${Url}/admin/staffDel/${staffData._id}`, staffData);
  } catch (error) {
    throw error;
  }
};


export const getTokenDetails = async () => {
  return await axios.get(`${Url}/phelobotny/phlebotomy`);
}

// Example function to update patient data
export const updatePatData = async (editedData) => {
  try {
      // Assume you're using axios or fetch for making API requests
      const response = await axios.put(`${Url}/admin/patDel/${editedData._id}`, editedData);
      return response.data; // Assuming the response contains the updated data or a success message
  } catch (error) {
      console.error("Error updating patient data:", error);
      throw error; // You might want to handle errors appropriately in your component
  }
};