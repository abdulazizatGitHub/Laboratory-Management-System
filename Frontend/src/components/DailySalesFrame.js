import { useMemo } from "react";
import "./DailySalesFrame.css";

const DailySalesFrame = ({
  tOTALAMOUNT,
  cardTransferSvgrepoCom1,
  frameMONTHLYSALES,
  propPadding,
  propGap,
  propMinHeight,
}) => {
  const gFrameStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const lineMonlySalesStyle = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  const cardTransferSvgrepoCom1IconStyle = useMemo(() => {
    return {
      minHeight: propMinHeight,
    };
  }, [propMinHeight]);

  return (
    <div className="daily-sales-frame">
      <div className="daily-sales-frame-child" />
      <div className="g-frame" style={gFrameStyle}>
        <div className="k-frame">
          <div className="total-amount">{tOTALAMOUNT}</div>
          <div className="line-monly-sales" style={lineMonlySalesStyle}>
            <img
              className="card-transfer-svgrepo-com-1-icon"
              loading="eager"
              alt=""
              src={cardTransferSvgrepoCom1}
              style={cardTransferSvgrepoCom1IconStyle}
            />
            <b className="frame-m-o">{frameMONTHLYSALES}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySalesFrame;
