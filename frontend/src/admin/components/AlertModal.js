import React from 'react';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import '../css/AlertModal.css';
const AlertModal = ({ message, type }) => {
    let icon = null;
    let alertClass = "";

    switch (type) {
        case "success":
            icon = <FcCheckmark size={20} color="green" />;
            alertClass = "success-alert";
            break;
        case "error":
            icon = <FcCancel size={20} color="red" />;
            alertClass = "error-alert";
            break;
        default:
            break;
    }

    return (
        <div className={`custom-alert ${alertClass}`}>
            <p>
                {icon} {message}
            </p>
        </div>
    );
};

export default AlertModal;
