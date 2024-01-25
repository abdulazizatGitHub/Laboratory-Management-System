import DailySalesFrame from "./DailySalesFrame";
import "./FrameComponent1.css";

const FrameComponent1 = () => {
  return (
    <div className="rectangle-parent8">
      <div className="frame-child31" />
      <div className="frame-wrapper7">
        <div className="frame-parent27">
          <div className="number-of-tests-wrapper">
            <div className="number-of-tests">NUMBER OF TESTS</div>
          </div>
          <div className="daily-sales-header">
            <img
              className="iconlylightdocument"
              loading="eager"
              alt=""
              src="/iconlylightdocument.svg"
            />
            <b className="b1">2503</b>
          </div>
        </div>
      </div>
      <DailySalesFrame
        tOTALAMOUNT="TOTAL AMOUNT"
        cardTransferSvgrepoCom1="/cardtransfersvgrepocom-1.svg"
        frameMONTHLYSALES="19250"
        propPadding="0px 0px var(--padding-9xs)"
        propGap="12px"
        propMinHeight="28px"
      />
      <DailySalesFrame
        tOTALAMOUNT="TOTAL PATIENT"
        cardTransferSvgrepoCom1="/medicalkitsvgrepocom-1.svg"
        frameMONTHLYSALES="30"
        propPadding="0px 0px var(--padding-8xs)"
        propGap="19px"
        propMinHeight="unset"
      />
      <div className="daily-sales-frame1">
        <div className="daily-sales-frame-item" />
        <div className="daily-sales-frame-inner">
          <div className="tokens-generated-parent">
            <div className="tokens-generated">TOKENS GENERATED</div>
            <div className="download-square-svgrepo-com-1-parent">
              <img
                className="download-square-svgrepo-com-1-icon"
                loading="eager"
                alt=""
                src="/downloadsquaresvgrepocom-1.svg"
              />
              <b className="b2">117</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
