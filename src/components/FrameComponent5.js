import FrameComponent6 from "./FrameComponent6";
import "./FrameComponent5.css";

const FrameComponent5 = () => {
  return (
    <div className="rectangle-parent12">
      <div className="frame-child42" />
      <FrameComponent6 byName="By Name" propPadding="0px var(--padding-4xs)" />
      <FrameComponent6 byName="By Code" propPadding="0px var(--padding-2xs)" />
    </div>
  );
};

export default FrameComponent5;
