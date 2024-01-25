import FrameComponent from "../components/FrameComponent";
import "./Register.css";

const Register = () => {
  return (
    <div className="register">
      <img className="active-days" alt="" src="/active--days.svg" />
      <div className="register-inner">
        <div className="rectangle-parent">
          <div className="frame-child" />
          <div className="lms">LMS</div>
        </div>
      </div>
      <img
        className="pexels-chokniti-khongchum-2280-icon"
        alt=""
        src="/pexelschoknitikhongchum2280547-1@2x.png"
      />
      <FrameComponent />
    </div>
  );
};

export default Register;
