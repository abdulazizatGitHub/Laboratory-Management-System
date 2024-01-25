import { Button } from "@mui/material";
import FrameComponent8 from "../components/FrameComponent8";
import FrameComponent7 from "../components/FrameComponent7";
import FrameComponent5 from "../components/FrameComponent5";
import "./SearchTest.css";

const SearchTest = () => {
  return (
    <div className="search-test1">
      <img className="active-days4" alt="" src="/active--days.svg" />
      <form className="frame-form">
        <FrameComponent8 />
        <div className="frame-parent9">
          <FrameComponent7 />
          <FrameComponent5 />
          <div className="frame-parent10">
            <div className="rectangle-parent2">
              <div className="frame-child16" />
              <div className="frame-parent11">
                <div className="frame-wrapper1">
                  <div className="frame-parent12">
                    <div className="name-wrapper">
                      <b className="name">Name</b>
                    </div>
                    <div className="type-wrapper">
                      <b className="type">Type</b>
                    </div>
                    <div className="code-wrapper">
                      <b className="code">Code</b>
                    </div>
                    <b className="delivery-time">Delivery Time</b>
                    <div className="price-wrapper">
                      <b className="price">Price</b>
                    </div>
                    <div className="discount-wrapper">
                      <b className="discount">Discount</b>
                    </div>
                    <b className="total">Total</b>
                  </div>
                </div>
                <div className="line-parent2">
                  <div className="frame-child17" />
                  <div className="frame-wrapper2">
                    <div className="frame-parent13">
                      <div className="abc-wrapper">
                        <div className="abc">ABC</div>
                      </div>
                      <div className="chemistry">Chemistry</div>
                      <div className="a-wrapper">
                        <div className="a">A</div>
                      </div>
                      <div className="mins-wrapper">
                        <div className="mins">30 mins</div>
                      </div>
                      <div className="wrapper">
                        <div className="div12">100.00</div>
                      </div>
                      <div className="frame">
                        <div className="div13">10%</div>
                      </div>
                      <div className="div14">40</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="frame-wrapper3">
                <div className="line-parent3">
                  <div className="frame-child18" />
                  <div className="sub-total-parent">
                    <b className="sub-total">Sub Total</b>
                    <b className="b">40</b>
                  </div>
                </div>
              </div>
            </div>
            <footer className="frame-footer">
              <Button
                className="frame-button"
                disableElevation={true}
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "13",
                  background: "#22cab8",
                  borderRadius: "4.172248840332031px",
                  "&:hover": { background: "#22cab8" },
                  height: 40,
                }}
              >
                Generate Totken
              </Button>
            </footer>
          </div>
        </div>
      </form>
      <div className="search-test-inner">
        <div className="frame-child19" />
      </div>
    </div>
  );
};

export default SearchTest;
