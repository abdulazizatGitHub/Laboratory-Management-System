import React from "react";
import { useLocation } from "react-router-dom";

const DetailStaff = () => {
    const location = useLocation();
    const { data } = location.state;

    return (
        <div>
            <h2>{data.name} Details</h2>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>CNIC:</strong> {data.cnic}</p>
            <p><strong>Today's Sale:</strong> {data.todaySale}</p>
            <p><strong>Status:</strong> {data.status}</p>
            <p><strong>Shift:</strong> {data.shift}</p>
        </div>
    );
};

export default DetailStaff;
