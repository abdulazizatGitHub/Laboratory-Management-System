import { useCallback } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginButtonFrame.css";

const LoginButtonFrame = () => {
  const navigate = useNavigate();

  const onDontHaveAnClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <form className="login-button-frame1">
      <div className="login-button-frame-child" />
      <div className="login-button-frame-inner">
        <div className="frame-parent20">
          <div className="welcome-back-container">
            <div className="welcome-back1">Welcome back!</div>
          </div>
          <div className="login-to-continue">
            Login to continue to Laboratory Management System
          </div>
        </div>
      </div>
      <div className="error-message-container">
        <div className="login-button-parent">
          <div className="login-button1">
            <div className="email2">Email</div>
          </div>
          <input className="input-forms-group" type="text" />
        </div>
        <div className="password-input">
          <div className="welcome-frame">
            <div className="email-input">
              <div className="password1">Password</div>
              <div className="forgot-password1">Forgot password?</div>
            </div>
          </div>
          <TextField
            className="empty-rectangle3"
            variant="outlined"
            sx={{
              "& fieldset": { borderColor: "#cfcfcf" },
              "& .MuiInputBase-root": {
                height: "42.8px",
                borderRadius: "4.172248840332031px",
              },
            }}
          />
        </div>
      </div>
      <Button onClick={onDontHaveAnClick}
        className="registration-prompt"
        disableElevation={true}
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "14.6",
          background: "#00adb5",
          borderRadius: "0px 0px 0px 0px",
          "&:hover": { background: "#00adb5" },
          height: 43,
        }}
      >
        Login
      </Button>
      <div className="dont-have-an-account-registe-wrapper">
        <div className="dont-have-an-container" onClick={onDontHaveAnClick}>
          <span className="dont-have-an">Don’t have an account?</span>
          <span className="register1"> Register</span>
        </div>
      </div>
    </form>
  );
};

export default LoginButtonFrame;
