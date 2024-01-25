import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import "./FrameComponent8.css";

const FrameComponent8 = () => {
  return (
    <div className="rectangle-parent10">
      <div className="frame-child34" />
      <div className="lms-frame">
        <div className="lms5">LMS</div>
      </div>
      <div className="frame-parent33">
        <div className="frame-wrapper9">
          <div className="dashboard-svgrepo-com-1-parent">
            <img
              className="dashboard-svgrepo-com-1-icon2"
              loading="eager"
              alt=""
              src="/dashboardsvgrepocom-1.svg"
            />
            <div className="dashboard3">Dashboard</div>
          </div>
        </div>
        <TextField
          className="registrations-container"
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
              <InputAdornment position="end" style={{ marginRight: "16px" }}>
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
      <div className="frame-wrapper10">
        <div className="ellipse-group">
          <div className="frame-child35" />
          <div className="patient-registration-search-container2">
            <p className="patient-registration4">Patient Registration</p>
            <p className="search-test3">Search Test</p>
            <p className="generate-token4">Generate Token</p>
          </div>
        </div>
      </div>
      <div className="frame-parent34">
        <div className="frame-parent35">
          <div className="iconlylightpaper-container">
            <img
              className="iconlylightpaper3"
              loading="eager"
              alt=""
              src="/iconlylightpaper1.svg"
            />
          </div>
          <div className="test-reports-wrapper1">
            <div className="test-reports3">Test Reports</div>
          </div>
          <img
            className="arrow-left-5-svgrepo-com-2-icon3"
            loading="eager"
            alt=""
            src="/arrowleft5svgrepocom-21@2x.png"
          />
        </div>
        <div className="user-rounded-svgrepo-com-1-group">
          <img
            className="user-rounded-svgrepo-com-1-icon3"
            loading="eager"
            alt=""
            src="/userroundedsvgrepocom-11.svg"
          />
          <div className="account3">Account</div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent8;
