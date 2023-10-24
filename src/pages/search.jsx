import React, { useEffect } from "react";
import { isUserValidRedirection } from "../stores/dashboardValidation";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/dashboard/HeaderMenu";
import Search from "../components/search/Search";
import Footer from "../components/dashboard/Footer";

let isChecked = false;

export default function search() {
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
      <Search />
      <Footer />
    </>
  );
}
