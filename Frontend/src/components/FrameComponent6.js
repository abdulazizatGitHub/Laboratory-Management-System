import { useMemo } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import "./FrameComponent6.css";

const FrameComponent6 = ({ byName, propPadding }) => {
  const frameDivStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div className="frame-parent39">
      <div className="by-name-wrapper" style={frameDivStyle}>
        <div className="by-name">{byName}</div>
      </div>
      <TextField
        className="frame-child41"
        placeholder="Search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <img width="12px" height="12px" src="/iconlylightsearch-1.svg" />
          ),
        }}
        sx={{
          "& fieldset": { borderColor: "#ced4da" },
          "& .MuiInputBase-root": {
            height: "43px",
            paddingLeft: "22px",
            borderRadius: "5px",
            fontSize: "11px",
          },
          "& .MuiInputBase-input": { paddingLeft: "11px", color: "#8f939e" },
        }}
      />
    </div>
  );
};

export default FrameComponent6;
