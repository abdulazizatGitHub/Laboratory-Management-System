import {
    Select,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    InputAdornment,
    TextField,
    Button,
  } from "@mui/material";
  import SearchFieldSet from "./SearchFieldSet";
  import FrameComponent4 from "./FrameComponent4";
  import "./GenerateToken.css";
  
  const GenerateToken = () => {
    return (
      <div className="generate-token">
        <img className="active-days3" alt="" src="/active--days1.svg" />
        <section className="frame-container1">
          <div className="main-frame">
            <div className="main-frame-child" />
            <div className="lms-wrapper">
              <div className="lms2">LMS</div>
            </div>
            <div className="svg-component">
              <div className="dashboard-frame">
                <div className="pen-icon">
                  <img
                    className="dashboard-svgrepo-com-1-icon"
                    loading="eager"
                    alt=""
                    src="/dashboardsvgrepocom-1.svg"
                  />
                  <div className="dashboard1">Dashboard</div>
                </div>
              </div>
              <TextField
                className="patient-search"
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
            <div className="frame-with-text">
              <div className="test-report-frame">
                <div className="patient-registration-search-container">
                  <p className="patient-registration">Patient Registration</p>
                  <p className="search-test">Search Test</p>
                  <p className="generate-token1">Generate Token</p>
                </div>
                <div className="ellipse-shape" />
              </div>
            </div>
            <div className="login-frame">
              <div className="user-image">
                <div className="search-input">
                  <img
                    className="iconlylightpaper"
                    loading="eager"
                    alt=""
                    src="/iconlylightpaper1.svg"
                  />
                </div>
                <div className="generate-token-frame">
                  <div className="test-reports">Test Reports</div>
                </div>
                <img
                  className="arrow-left-5-svgrepo-com-2-icon"
                  loading="eager"
                  alt=""
                  src="/arrowleft5svgrepocom-21@2x.png"
                />
              </div>
              <div className="registrations-label">
                <img
                  className="user-rounded-svgrepo-com-1-icon"
                  loading="eager"
                  alt=""
                  src="/userroundedsvgrepocom-11.svg"
                />
                <div className="account">Account</div>
              </div>
            </div>
          </div>
          <div className="iconly-light-paper-instance">
            <header className="test-reports-container">
              <div className="test-reports-container-child" />
              <Button
                className="rectangle-rectangle-rectangle"
                startIcon={
                  <img width="12px" height="12px" src="/iconlylightsearch.svg" />
                }
                disableElevation={true}
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "10",
                  borderRadius: "0px 0px 0px 0px",
                  width: 240,
                  height: 32,
                }}
              >
                Search
              </Button>
              <div className="test-reports-frame">
                <button className="profile-picture-frame">
                  <div className="login-button-frame">
                    <div className="rectangle-shape" />
                    <img
                      className="profile-svgrepo-com-4-11"
                      alt=""
                      src="/profilesvgrepocom-4-1.svg"
                    />
                  </div>
                  <div className="login2">Login</div>
                </button>
                <div className="login-box" />
                <img
                  className="cross-svgrepo-com-1-icon1"
                  loading="eager"
                  alt=""
                  src="/crosssvgrepocom-1.svg"
                />
              </div>
            </header>
            <div className="token-input-wrapper">
              <div className="token-input">
                <div className="token-input-child" />
                <div className="generate-token2">GENERATE TOKEN</div>
              </div>
            </div>
            <SearchFieldSet />
            <FrameComponent4 />
          </div>
        </section>
        <div className="name-contact-field">
          <div className="age-gender-date-section" />
        </div>
      </div>
    );
  };
  
  export default GenerateToken;
  