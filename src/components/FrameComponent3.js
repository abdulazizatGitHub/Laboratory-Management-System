import {
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import "./FrameComponent3.css";

const FrameComponent3 = () => {
  return (
    <div className="rectangle-parent6">
      <div className="frame-child28" />
      <div className="lms4">LMS</div>
      <div className="frame-parent21">
        <div className="frame-parent22">
          <Button
            className="frame-child29"
            startIcon={
              <img
                width="24px"
                height="24px"
                src="/dashboardsvgrepocom-1.svg"
              />
            }
            disableElevation={true}
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#fff",
              fontSize: "12",
              background: "#201f35",
              borderRadius: "7px",
              "&:hover": { background: "#201f35" },
            }}
          >
            Dashboard
          </Button>
          <TextField
            className="registrations-wrapper"
            variant="standard"
            select
            value={1}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ marginRight: "12px" }}
                >
                  <img
                    width="17px"
                    height="17px"
                    src="/pennewroundsvgrepocom-1.svg"
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" style={{ marginRight: "1px" }}>
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
              borderTopWidth: "0px",
              borderRightWidth: "0px",
              borderBottomWidth: "0px",
              borderLeftWidth: "0px",
              borderRadius: "0px 0px 0px 0px",
              width: "77.4390243902439%",
              height: "17px",
              "& .MuiInput-underline:before": { borderBottom: "none" },
              "& .MuiInput-underline:after": { borderBottom: "none" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
              "& .MuiInputBase-root": { height: "100%" },
              "& .MuiInputBase-input": {
                color: "rgba(255, 255, 255, 0.5)",
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
        <div className="frame-parent23">
          <div className="iconlylightpaper-wrapper">
            <img
              className="iconlylightpaper2"
              loading="eager"
              alt=""
              src="/iconlylightpaper.svg"
            />
          </div>
          <div className="test-reports-wrapper">
            <div className="test-reports2">Test Reports</div>
          </div>
          <img
            className="arrow-left-5-svgrepo-com-2-icon2"
            loading="eager"
            alt=""
            src="/arrowleft5svgrepocom-2@2x.png"
          />
        </div>
        <div className="frame-wrapper5">
          <div className="user-rounded-svgrepo-com-1-parent">
            <img
              className="user-rounded-svgrepo-com-1-icon2"
              loading="eager"
              alt=""
              src="/userroundedsvgrepocom-1.svg"
            />
            <div className="account2">Account</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent3;
