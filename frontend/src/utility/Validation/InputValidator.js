import { useState } from 'react';

export const useValidators = () => {
  const [errors, setErrors] = useState({});

  const validateString = (name, value) => {
    if (!value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    } else if (!/^[a-zA-Z\s]*$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Invalid string value.' }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    }
  };

  const validateInteger = (name, value) => {
    if (!value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    } else if (!/^\d+$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Invalid integer value.' }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    }
  };

  const validateCNIC = (name, value) => {
    if (value.length < 13) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    } else if (!/^\d{13}$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'CNIC should be 13 digits.' }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    }
  };

  const validatePhoneNumber = (name, value) => {
    if (value.length < 11) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    } else if (!/^\d{11}$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Phone number should be 11 digits.' }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    }
  };

  const validateEmail = (name, value) => {
    if (!value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Invalid email address.' }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    }
  };

  const validateAddress = (name, value) => {
    if (!value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    } else if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Invalid address value.' }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    }
  };

  const validateRemarks = (name, value) => {
    if (!value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    } else if (!/^[a-zA-Z\s]*$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Invalid remarks value.' }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    }
  };

  const validatePIN = (name, value) => {
    if (value.length < 7) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    } else if (!/^\d{2}\d{2}-\d{4}$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'PIN should be in the format YYMM-XXXX.' }));
      return false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      return true;
    }
  };

  const clearErrors = (field) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      if (field === 'PIN') {
        newErrors.pin = '';
      } else if (field === 'CONTACT') {
        newErrors.mobileNumber = '';
      } else if (field === 'CNIC') {
        newErrors.cnic = '';
      } else {
        // Clear errors for all fields if needed
        newErrors.pin = '';
        newErrors.mobileNumber = '';
        newErrors.cnic = '';
      }
      return newErrors;
    });
  };

  return {
    errors,
    validateString,
    validateInteger,
    validateCNIC,
    validatePhoneNumber,
    validateEmail,
    validateAddress,
    validateRemarks,
    validatePIN,
    clearErrors
  };
};
