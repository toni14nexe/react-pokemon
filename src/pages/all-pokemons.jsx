import React, { useEffect } from "react";
import { isUserValidRedirection } from "../stores/dashboardValidation";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/dashboard/HeaderMenu";
import AllPokemons from "../components/all-pokemons/AllPokemons";
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
      <AllPokemons />
      <Footer />
    </>
  );
}
