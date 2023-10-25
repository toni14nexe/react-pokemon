import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

/* PROPS
- trigger: Number / required
- type: success || warning || info || error / default: info
- message: String / required / default: ''
*/

export default function Toast(props) {
  const [showMe, setShowMe] = React.useState(false);

  useEffect(() => {
    if (props.trigger) startToast();
  }, [props.trigger]);

  function startToast() {
    setShowMe(true);
    setTimeout(() => {
      setShowMe(false);
    }, 5000);
  }

  function closeToast() {
    setShowMe(false);
  }

  if (showMe)
    return (
      <div className="toast">
        <Alert severity={props.type || "info"}>{props.message || ""}</Alert>
        <div className="close-toast" onClick={closeToast}>
          <CloseIcon />
        </div>
      </div>
    );
}
