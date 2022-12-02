import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPasssword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        },
      );
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                <p className="has-text-centered">{msg}</p>
                <h1 className="title is-2">Iniciar sesión</h1>
                <div className="field">
                  <label className="label">correo o usuario</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => SetEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Contraseña</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => SetPasssword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
