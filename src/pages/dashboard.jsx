import React, { useEffect } from "react";
import { isUserValid } from "../stores/dashboardValidation";
import { logout } from "../stores/logout";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/dashboard/HeaderMenu";

let isChecked = false;

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isChecked) {
      isChecked = true;
      isUserValid(navigate)
        .then(async (response) => {
          if (!response) {
            await logout(navigate);
            navigate("/login");
          }
        })
        .catch(async (error) => {
          console.error(error);
          await logout(navigate);
          navigate("/login");
        });
    }
  });

  return (
    <>
      <HeaderMenu />
    </>
  );
}
