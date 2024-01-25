import { Button } from "@mui/material";
import "./FrameComponent7.css";

const FrameComponent7 = () => {
  return (
    <div className="frame-parent36">
      <header className="frame-header">
        <div className="frame-child36" />
        <Button
          className="frame-child37"
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
        <div className="frame-parent37">
          <button className="frame-parent38">
            <div className="ellipse-container">
              <div className="frame-child38" />
              <img
                className="profile-svgrepo-com-4-12"
                alt=""
                src="/profilesvgrepocom-4-1.svg"
              />
            </div>
            <div className="login4">Login</div>
          </button>
          <div className="frame-child39" />
          <img
            className="cross-svgrepo-com-1-icon2"
            loading="eager"
            alt=""
            src="/crosssvgrepocom-1.svg"
          />
        </div>
      </header>
      <div className="rectangle-parent11">
        <div className="frame-child40" />
        <div className="search-test4">SEARCH TEST</div>
      </div>
    </div>
  );
};

export default FrameComponent7;
