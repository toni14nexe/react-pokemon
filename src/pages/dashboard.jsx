import React, { useEffect } from "react";
import { isUserValidRedirection } from "../stores/dashboardValidation";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/dashboard/HeaderMenu";
import Play from "../components/dashboard/Play";
import Footer from "../components/dashboard/Footer";

let isChecked = false;

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isChecked) {
      isChecked = true;
      isUserValidRedirection(navigate);
    }
  });

  return (
    <>
      <HeaderMenu />
      <Play />
      <Footer />
    </>
  );
}
