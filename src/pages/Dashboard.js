import { useCallback } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
} from "@mui/material";
import FrameComponent3 from "../components/FrameComponent3";
import { useNavigate } from "react-router-dom";
import FrameComponent2 from "../components/FrameComponent2";
import FrameComponent1 from "../components/FrameComponent1";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const onLoginTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="dashboard">
      <img className="active-days2" alt="" src="/active--days.svg" />
      <FrameComponent3 />
      <section className="frame-parent">
        <header className="rectangle-group">
          <div className="frame-item" />
          <Button
            className="frame-inner"
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
          <div className="frame-group">
            <button className="frame-container">
              <div className="ellipse-parent">
                <div className="ellipse-div" />
                <img
                  className="profile-svgrepo-com-4-1"
                  alt=""
                  src="/profilesvgrepocom-4-1.svg"
                />
              </div>
              <div className="login1" onClick={onLoginTextClick}>
                Login
              </div>
            </button>
            <div className="rectangle-div" />
            <img
              className="cross-svgrepo-com-1-icon"
              loading="eager"
              alt=""
              src="/crosssvgrepocom-1.svg"
            />
          </div>
        </header>
        <FrameComponent2 />
        <div className="frame-div">
          <FrameComponent1 />
          <div className="d-a-i-l-y-s-a-l-e-s-frame">
            <div className="rectangle-container">
              <div className="frame-child1" />
              <div className="m-o-n-t-h-l-y-s-a-l-e-s-frame">
                <div className="daily-sales">DAILY SALES</div>
              </div>
              <div className="d-a-i-l-e-s-s-a-l-e-s-l-i-n-e">
                <div className="rectangle-m-o-n-t-h-l-a-b-e-l" />
              </div>
              <div className="frame-frame">
                <div className="parent">
                  <div className="div">40</div>
                  <div className="line-div" />
                </div>
              </div>
              <div className="m-o-n-t-h-l-y-s-a-l-e-s-graph">
                <div className="m-o-n-t-h-f-r-a-m-e-f-r-a-m-e">
                  <div className="div1">20</div>
                  <div className="line-m-o-n-t-h-l-y-s-a-l-e-s" />
                  <img
                    className="graph-icon"
                    loading="eager"
                    alt=""
                    src="/graph.svg"
                  />
                </div>
              </div>
              <div className="first-month-label">
                <div className="second-month-label">
                  <div className="date-of-the">0</div>
                  <div className="second-month-label-inner">
                    <div className="line-parent">
                      <div className="frame-child2" />
                      <div className="frame-parent1">
                        <div className="frame-parent2">
                          <div className="line-group">
                            <div className="frame-child3" />
                            <div className="frame-child4" />
                          </div>
                          <div className="group">
                            <div className="div2">0</div>
                            <div className="div3">2</div>
                          </div>
                        </div>
                        <div className="frame-parent3">
                          <div className="sales-graph-parent">
                            <div className="sales-graph" />
                            <div className="month-label" />
                          </div>
                          <div className="container">
                            <div className="div4">4</div>
                            <div className="k-label">6</div>
                          </div>
                        </div>
                        <div className="frame-parent4">
                          <div className="date-box-wrapper">
                            <div className="date-box">8</div>
                          </div>
                          <div className="time-box" />
                        </div>
                        <div className="frame-parent5">
                          <div className="line-container">
                            <div className="frame-child5" />
                            <div className="frame-child6" />
                          </div>
                          <div className="parent1">
                            <div className="div5">10</div>
                            <div className="div6">12</div>
                          </div>
                        </div>
                        <div className="frame-parent6">
                          <div className="line-parent1">
                            <div className="frame-child7" />
                            <div className="frame-child8" />
                          </div>
                          <div className="time-frame-parent">
                            <div className="time-frame">14</div>
                            <div className="month-line">16</div>
                          </div>
                        </div>
                        <div className="year-frame">
                          <div className="month-line1">
                            <div className="day-frame" />
                            <div className="hour-line" />
                          </div>
                          <div className="minute-line">
                            <div className="minute-divider">18</div>
                            <div className="dot-divider">20</div>
                          </div>
                        </div>
                        <div className="date-label">
                          <div className="separator-frame">
                            <div className="month-label1" />
                            <div className="day-grid-lines" />
                          </div>
                          <div className="weekday-label">
                            <div className="border-frame">22</div>
                            <div className="content-area">24</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="time-of-day">Time of day</div>
            </div>
            <div className="rectangle-parent1">
              <div className="frame-child9" />
              <div className="frame-child10" />
              <div className="frame-child11" />
              <div className="frame-child12" />
              <TextField
                className="frame-textfield"
                placeholder="MONTHLY SALES"
                variant="standard"
                sx={{
                  "& .MuiInputBase-root": { height: "28px", fontSize: "13px" },
                  "& .MuiInputBase-input": { color: "#4c5366" },
                }}
              />
              <div className="frame-wrapper">
                <div className="frame-parent7">
                  <div className="time-of-day-parent">
                    <div className="time-of-day1">
                      <div className="k">20K</div>
                      <div className="monthly-sales-content" />
                    </div>
                    <div className="first-vertical-line">
                      <div className="second-horizontal-line">
                        <div className="k1">10K</div>
                        <div className="second-horizontal-line-inner">
                          <div className="sales-chart-parent">
                            <div className="sales-chart">0</div>
                            <div className="month-label2">
                              <div className="daily-graph" />
                            </div>
                            <div className="month-graph">
                              <div className="k-keyline" />
                              <div className="month-graph-child" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rectangles-parent">
                        <div className="rectangles">
                          <div className="frame-a" />
                          <div className="frame-b" />
                        </div>
                        <div className="frame-c">
                          <div className="frame-d" />
                        </div>
                      </div>
                      <div className="frame-e">
                        <div className="label-date" />
                        <div className="frame-f" />
                      </div>
                      <div className="frame-g">
                        <div className="frame-h">
                          <div className="frame-i" />
                          <div className="frame-j" />
                          <div className="line-k" />
                        </div>
                        <div className="frame-l">
                          <div className="frame-l-child" />
                          <div className="frame-l-item" />
                        </div>
                      </div>
                      <div className="frame-parent8">
                        <div className="rectangle-wrapper">
                          <div className="frame-child13" />
                        </div>
                        <div className="frame-child14" />
                      </div>
                      <div className="first-vertical-line-inner">
                        <div className="frame-child15" />
                      </div>
                    </div>
                  </div>
                  <div className="empty-rectangle-parent">
                    <div className="empty-rectangle">
                      <div className="div7">0</div>
                    </div>
                    <div className="empty-rectangle1">
                      <div className="grid-lines">4</div>
                    </div>
                    <div className="grid-container">
                      <div className="vertical-divider">8</div>
                      <div className="horizontal-divider">
                        <div className="horizontal-divider-inner">
                          <div className="parent2">
                            <div className="div8">12</div>
                            <div className="div9">16</div>
                          </div>
                        </div>
                        <div className="date-of-the1">Date of the Month</div>
                      </div>
                      <div className="vertical-divider1">20</div>
                    </div>
                    <div className="empty-rectangle2">
                      <div className="div10">24</div>
                    </div>
                    <div className="div11">30</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
