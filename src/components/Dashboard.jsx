import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, SetName] = useState("");
  const [token, SetToken] = useState("");
  const [expire, setExpired] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      SetToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      SetName(decoded.name);
      setExpired(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create({
    baseURL: 'http://127.0.0.1:5173',
    withCredentials: true,
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        SetToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        SetName(decoded.name);
        setExpired(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-5">
        <h1>Bienvenido Usuario: {name}</h1>
        <button onClick={getUsers} className="button is-info">
          Get Users
        </button>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index +1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Dashboard;
