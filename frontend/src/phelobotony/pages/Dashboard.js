import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
import '../css/Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize loading state to true
    const navigation = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchUser(),
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false when all data fetching is complete
            }
        };

        fetchData();
    }, []);

    const fetchUser = async () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Redirect to login if user data is not available
            navigation('/');
        }
    };

    return (
        <div className="ph-dbrd-Main-Container">
            {loading ? ( // Render loader if loading is true
                <div className="loader-container">
                    <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
                </div>
            ) : (
                <React.Fragment>
                    {user && (
                        <div className="ph-dbrd-Profile">
                            <div className="ph-dbrd-Image-details">
                                <img src={user.image.url} className="ph-dbrd-profile-image" />
                            </div>

                            <div className='ph-dbrd-profile-info'>
                                <div className="ph-dbrd-profile-divs">
                                    <p className="ph-dbrd-bold-light">NAME</p>
                                    <p>{user.name}</p>
                                </div>

                                <div className="profile-divs">
                                    <p className="bold-light">FATHER NAME</p>
                                    <p>{user.fatherName}</p>
                                </div>

                                <div className="profile-divs">
                                    <p className="bold-light">GENDER</p>
                                    <p>{user.gender}</p>
                                </div>

                                <div className="profile-divs">
                                    <p className="bold-light">ADDRESS</p>
                                    <p>{user.address}</p>
                                </div>

                                <div className="profile-divs">
                                    <p className="bold-light">CONTACT</p>
                                    <p>{user.contactNumber}</p>
                                </div>

                                <div className="profile-divs">
                                    <p className="bold-light">CNIC</p>
                                    <p>{user.cnic}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}

export default Dashboard;
