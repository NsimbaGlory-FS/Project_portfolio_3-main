import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      axios
        .post("http://localhost:3000/signin", { code })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error getting tokens:", error);
        });
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default Callback;
