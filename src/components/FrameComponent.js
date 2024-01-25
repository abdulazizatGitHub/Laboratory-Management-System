import { useCallback } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./FrameComponent.css";

const FrameComponent = () => {
  const navigate = useNavigate();

  const onAlreadyHaveAnClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <form className="rectangle-parent4">
      <div className="frame-child24" />
      <div className="frame-parent15">
        <div className="welcome-back-wrapper">
          <div className="welcome-back">Welcome back!</div>
        </div>
        <div className="register-to-continue-to-labora-wrapper">
          <div className="register-to-continue">
            Register to continue to Laboratory Management System
          </div>
        </div>
        <div className="frame-parent16">
          <div className="frame-parent17">
            <div className="email-wrapper">
              <div className="email1">Email</div>
            </div>
            <div className="rectangle-parent5">
              <div className="frame-child25" />
              <input
                className="abcxyzchefsynkcom"
                placeholder="abcxyz@chefsynk.com"
                type="text"
              />
            </div>
          </div>
          <div className="frame-parent18">
            <div className="frame-wrapper4">
              <div className="password-parent">
                <div className="password">Password</div>
                <div className="forgot-password">Forgot password?</div>
              </div>
            </div>
            <TextField
              className="frame-child26"
              placeholder="********"
              variant="outlined"
              sx={{
                "& fieldset": { borderColor: "#cfcfcf" },
                "& .MuiInputBase-root": {
                  height: "43px",
                  borderRadius: "4.172248840332031px",
                  fontSize: "18px",
                },
                "& .MuiInputBase-input": { color: "#4c5366" },
              }}
            />
          </div>
          <div className="frame-parent19">
            <div className="choose-designation-wrapper">
              <div className="choose-designation">Choose Designation</div>
            </div>
            <TextField
              className="frame-child27"
              placeholder="Admin"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <img
                    width="13px"
                    height="13px"
                    src="/iconlylightarrow--down-2.svg"
                  />
                ),
              }}
              sx={{
                "& fieldset": { borderColor: "#cfcfcf" },
                "& .MuiInputBase-root": {
                  height: "43px",
                  paddingRight: "21px",
                  borderRadius: "4.172248840332031px",
                  fontSize: "12px",
                },
                "& .MuiInputBase-input": { color: "#4c5366" },
              }}
            />
          </div>
        </div>
      </div>
      <div className="registration-label-parent">
        <Button
          className="registration-label"
          disableElevation={true}
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "14.6",
            background: "#00adb5",
            borderRadius: "4.172248840332031px",
            "&:hover": { background: "#00adb5" },
            height: 43,
          }}
        >
          Register
        </Button>
        <div
          className="already-have-an-container"
          onClick={onAlreadyHaveAnClick}
        >
          <span className="already-have-an">Already have an account?</span>
          <span className="login3"> Login</span>
        </div>
      </div>
    </form>
  );
};

export default FrameComponent;
