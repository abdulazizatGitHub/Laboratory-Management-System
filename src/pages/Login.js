import LoginButtonFrame from "../components/LoginButtonFrame";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <img className="active-days1" alt="" src="/active--days.svg" />
      <div className="login-inner">
        <div className="main-f-r-a-m-e-wrapper">
          <div className="main-f-r-a-m-e">
            <div className="main-f-r-a-m-e-child" />
            <div className="pexelschoknitikhongchum-parent">
              <div className="pexelschoknitikhongchum">
                <img
                  className="pexels-chokniti-khongchum-2280-icon1"
                  alt=""
                  src="/pexelschoknitikhongchum2280547-1@2x.png"
                />
                <img
                  className="pexels-chokniti-khongchum-2280-icon2"
                  loading="eager"
                  alt=""
                  src="/pexelschoknitikhongchum2280547-1@2x.png"
                />
                <div className="pexelschoknitikhongchum-child" />
              </div>
              <div className="lms1">LMS</div>
            </div>
          </div>
        </div>
      </div>
      <LoginButtonFrame />
    </div>
  );
};

export default Login;
