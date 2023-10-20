import Link from "@mui/material/Link";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/login");
  });

  return (
    <div>
      <h3>Page Not Found...</h3>
      <Link href="dashboard">Go To Dashboard</Link>
    </div>
  );
}
