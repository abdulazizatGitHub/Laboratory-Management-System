
const fetchPatientNumber = () => {
    getAllPatientNumbers()// This function gets the number of patient from the database.
      .then(patientCount => {// NOw if the promise is resolved then the number is passed to the generate pin function  that is writtenbelow
        generatePin(patientCount);
      })
      .catch(error => console.error('Error fetching token count:', error));
  };



  const generatePin = (patientCount) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2); // Get last two digits of the year
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let pinNumber = `${year}${month}-${(patientCount + 1).toString().padStart(5, '0')}`;
    
    // Check if data is available
    if (data.length > 0) {
      // Extract existing PINs from data
      const existingPins = data.map(patient => patient.pin);
  
      // Generate a unique pin
      while (existingPins.includes(pinNumber)) {
        patientCount++; 
        pinNumber = `${year}${month}-${(patientCount + 1).toString().padStart(5, '0')}`;
      } 
      
    }
  
    setFormData(prevData => ({
      ...prevData,
      pin: pinNumber,
    }));
  };