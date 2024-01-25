import { useCallback } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
  TextField,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconlyLightPaperInstance from "../components/IconlyLightPaperInstance";
import "./PatientDetails.css";

const PatientDetails = () => {
  const navigate = useNavigate();

  const onPatientRegistrationSearchClick = useCallback(() => {
    navigate("/search-test");
  }, [navigate]);

  return (
    <div className="patient-details">
      <img className="active-days5" alt="" src="/active--days.svg" />
      <div className="patient-details-inner">
        <div className="rectangle-parent3">
          <div className="frame-child20" />
          <div className="lms-container">
            <div className="lms3">LMS</div>
          </div>
          <div className="dashboard-text">
            <div className="pen-new-round-svgrepocom">
              <div className="registrations-text">
                <img
                  className="dashboard-svgrepo-com-1-icon1"
                  loading="eager"
                  alt=""
                  src="/dashboardsvgrepocom-1.svg"
                />
                <div className="dashboard2">Dashboard</div>
              </div>
            </div>
            <TextField
              className="user-rounded-svgrepocom"
              variant="standard"
              select
              value={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ marginLeft: "17px", marginRight: "12px" }}
                  >
                    <img
                      width="17px"
                      height="17px"
                      src="/pennewroundsvgrepocom-1.svg"
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ marginRight: "16px" }}
                  >
                    <img
                      width="16px"
                      height="16px"
                      src="/arrowleft5svgrepocom-1.png"
                    />
                  </InputAdornment>
                ),
              }}
              SelectProps={{ IconComponent: () => null }}
              sx={{
                borderTopWidth: "1px",
                borderRightWidth: "1px",
                borderBottomWidth: "1px",
                borderLeftWidth: "1px",
                backgroundColor: "#201f35",
                borderRadius: "7px",
                width: "100%",
                height: "40px",
                "& .MuiInput-underline:before": { borderBottom: "none" },
                "& .MuiInput-underline:after": { borderBottom: "none" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
                "& .MuiInputBase-root": { height: "100%" },
                "& .MuiInputBase-input": {
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: "Medium",
                  fontFamily: "Visby Round CF",
                  textAlign: "left",
                  p: "0 !important",
                },
              }}
            >
              <MenuItem value={1}>Registrations</MenuItem>
            </TextField>
          </div>
          <div className="search-text">
            <div className="patient-registration-search-te-parent">
              <div
                className="patient-registration-search-container1"
                onClick={onPatientRegistrationSearchClick}
              >
                <p className="patient-registration1">Patient Registration</p>
                <p className="search-test2">Search Test</p>
                <p className="generate-token3">Generate Token</p>
              </div>
              <div className="login-text" />
            </div>
          </div>
          <div className="cross-svgrepocom-parent">
            <div className="cross-svgrepocom">
              <div className="enter-patient-details-text">
                <img
                  className="iconlylightpaper1"
                  loading="eager"
                  alt=""
                  src="/iconlylightpaper1.svg"
                />
              </div>
              <div className="test-reports-header">
                <div className="test-reports1">Test Reports</div>
              </div>
              <img
                className="arrow-left-5-svgrepo-com-2-icon1"
                loading="eager"
                alt=""
                src="/arrowleft5svgrepocom-21@2x.png"
              />
            </div>
            <div className="login-header">
              <img
                className="user-rounded-svgrepo-com-1-icon1"
                loading="eager"
                alt=""
                src="/userroundedsvgrepocom-11.svg"
              />
              <div className="account1">Account</div>
            </div>
          </div>
        </div>
      </div>
      <section className="enter-patient-details-title">
        <div className="patient-registration2">
          <IconlyLightPaperInstance />
          <div className="doctor-reff-frame">
            <div className="patient-remarks-frame">
              <div className="patient-remarks-frame-child" />
              <div className="internal-remarks-frame">
                <div className="next-button">
                  <div className="patient-name-parent">
                    <div className="patient-name">Patient Name</div>
                    <TextField
                      className="frame-child21"
                      placeholder="Enter patient name"
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#ced4da" },
                        "& .MuiInputBase-root": {
                          height: "43px",
                          borderRadius: "5px",
                          fontSize: "11px",
                        },
                        "& .MuiInputBase-input": { color: "#8f939e" },
                      }}
                    />
                    <div className="frame-a1">
                      <div className="gender">Gender</div>
                      <div className="select-the-gender">Select the gender</div>
                    </div>
                    <div className="frame-parent14">
                      <TextField
                        className="frame-child22"
                        placeholder="Male"
                        variant="outlined"
                        sx={{
                          "& fieldset": { borderColor: "#ced4da" },
                          "& .MuiInputBase-root": {
                            height: "43px",
                            paddingRight: "17px",
                            borderRadius: "5px",
                            fontSize: "10px",
                          },
                          "& .MuiInputBase-input": { color: "#5a6475" },
                        }}
                      />
                      <Button
                        className="frame-child23"
                        disableElevation={true}
                        variant="outlined"
                        sx={{
                          textTransform: "none",
                          color: "#5a6475",
                          fontSize: "10",
                          borderColor: "#ced4da",
                          borderRadius: "5px",
                          "&:hover": { borderColor: "#ced4da" },
                        }}
                      >
                        Female
                      </Button>
                    </div>
                  </div>
                  <div className="text-input-name">
                    <h2 className="patient-contact-details">
                      Patient Contact Details
                    </h2>
                    <div className="frame-e1">
                      <div className="mobile-number">Mobile Number</div>
                      <TextField
                        className="mobile-number-input"
                        placeholder="Enter mobile number"
                        variant="outlined"
                        sx={{
                          "& fieldset": { borderColor: "#ced4da" },
                          "& .MuiInputBase-root": {
                            height: "43px",
                            borderRadius: "5px",
                            fontSize: "11px",
                          },
                          "& .MuiInputBase-input": { color: "#8f939e" },
                        }}
                      />
                      <div className="text-input-email">
                        <div className="address">Address</div>
                      </div>
                      <TextField
                        className="mobile-number-input1"
                        placeholder="Enter address"
                        variant="outlined"
                        sx={{
                          "& fieldset": { borderColor: "#ced4da" },
                          "& .MuiInputBase-root": {
                            height: "43px",
                            borderRadius: "5px",
                            fontSize: "11px",
                          },
                          "& .MuiInputBase-input": { color: "#8f939e" },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="frame-g1">
                  <div className="frame-h1">
                    <div className="age">Age</div>
                    <TextField
                      className="search-bar-internal-notes"
                      placeholder="Enter Patient Age"
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#ced4da" },
                        "& .MuiInputBase-root": {
                          height: "43px",
                          borderRadius: "5px",
                          fontSize: "11px",
                        },
                        "& .MuiInputBase-input": { color: "#8f939e" },
                      }}
                    />
                    <div className="cnic">CNIC</div>
                    <TextField
                      className="search-bar-internal-notes1"
                      placeholder="15402-************"
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#ced4da" },
                        "& .MuiInputBase-root": {
                          height: "43px",
                          borderRadius: "5px",
                          fontSize: "11px",
                        },
                        "& .MuiInputBase-input": { color: "#8f939e" },
                      }}
                    />
                  </div>
                  <div className="frame-i1">
                    <div className="email">Email</div>
                    <div className="patient-gallery">
                      <input
                        className="enter-emial-address"
                        placeholder="Enter emial address"
                        type="text"
                      />
                      <div className="patient-gallery-child" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-image-button">
                <h2 className="visit-details">Visit Details</h2>
                <div className="patient-image-area">
                  <div className="reff-doctor-section">
                    <div className="patient-remarks-section">
                      <div className="reff-doctor">Reff. Doctor</div>
                    </div>
                    <TextField
                      className="patient-remarks-section1"
                      placeholder="XYZ"
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#ced4da" },
                        "& .MuiInputBase-root": {
                          height: "43px",
                          borderRadius: "5px",
                          fontSize: "11px",
                        },
                        "& .MuiInputBase-input": { color: "#8f939e" },
                      }}
                    />
                    <div className="patient-remarks-section2">
                      <div className="patient-remarks">Patient Remarks</div>
                    </div>
                    <TextField
                      className="patient-remarks-section3"
                      placeholder="Write Patient Remarks"
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#ced4da" },
                        "& .MuiInputBase-root": {
                          height: "43px",
                          borderRadius: "5px",
                          fontSize: "11px",
                        },
                        "& .MuiInputBase-input": { color: "#8f939e" },
                      }}
                    />
                  </div>
                  <div className="contact-info-section">
                    <div className="next-button1">
                      <div className="internal-remarks">Internal Remarks</div>
                    </div>
                    <div className="add-image-button1">
                      <input
                        className="write-internal-remarks"
                        placeholder="Write Internal Remarks"
                        type="text"
                      />
                      <div className="add-image-button-child" />
                    </div>
                  </div>
                </div>
                <Button
                  className="visit-details-frame"
                  disableElevation={true}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#fff",
                    fontSize: "13",
                    background: "#22cab8",
                    borderRadius: "4.172248840332031px",
                    "&:hover": { background: "#22cab8" },
                    height: 43,
                  }}
                >
                  NEXT
                </Button>
              </div>
            </div>
            <div className="gender-frame">
              <div className="gender-frame-child" />
              <div className="age-and-cnic-frame">
                <div className="patient-gallery1">Patient Gallery</div>
              </div>
              <div className="patient-registration-search" />
              <div className="search-icon">
                <div className="profile-picture-area">
                  <div className="patient-image">Patient Image</div>
                  <div className="add-patient-image">
                    Add Patient Image here
                  </div>
                </div>
              </div>
              <div className="login-button">
                <div className="login-button-child" />
                <div className="camera-icon">
                  <div className="patient-image1" />
                  <img
                    className="iconlylightcamera"
                    loading="eager"
                    alt=""
                    src="/iconlylightcamera.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientDetails;
