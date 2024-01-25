import { Button } from "@mui/material";
import "./IconlyLightPaperInstance.css";

const IconlyLightPaperInstance = () => {
  return (
    <div className="iconly-light-paper-instance1">
      <header className="test-reports-section">
        <div className="test-reports-section-child" />
        <div className="dashboard-frame1">
          <div className="dashboard-frame-child" />
          <Button
            className="pennewroundsvgrepocom-frame"
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
          <div className="login-button-frame2">
            <button className="profile-button-frame">
              <div className="gender-frame-parent">
                <div className="gender-frame1" />
                <img
                  className="profile-svgrepo-com-4-13"
                  alt=""
                  src="/profilesvgrepocom-4-1.svg"
                />
              </div>
              <div className="login5">Login</div>
            </button>
            <div className="address-frame" />
            <img
              className="cross-svgrepo-com-1-icon3"
              loading="eager"
              alt=""
              src="/crosssvgrepocom-1.svg"
            />
          </div>
        </div>
      </header>
      <div className="email-frame">
        <div className="email-frame-child" />
        <div className="enter-patient-details">ENTER PATIENT DETAILS</div>
      </div>
    </div>
  );
};

export default IconlyLightPaperInstance;
