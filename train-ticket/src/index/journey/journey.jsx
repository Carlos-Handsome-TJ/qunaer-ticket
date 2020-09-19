import React from "react";
import { SwapOutlined } from "@ant-design/icons";
import "./journey.less";

export default function Journey(props) {
  const {
    from,
    to,
    exchangeFromTo,
    showCitySelectorLeft,
    showCitySelectorRight,
  } = props;
  return (
    <div className={"journey-wrapper"}>
      <div className={"journey-station"}>
        <input
          type="text"
          name="form"
          readOnly
          className={"station right"}
          value={from}
          onClick={() => showCitySelectorLeft(true)}
        />
        <SwapOutlined
          style={{ outline: "none" }}
          onClick={exchangeFromTo}
          className={"journey-switch"}
        />
        <input
          type="text"
          name="to"
          readOnly
          className={"station left"}
          value={to}
          onClick={() => showCitySelectorRight(true)}
        />
      </div>
    </div>
  );
}
