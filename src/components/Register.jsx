import React,{useState} from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";


const Register = () => {

  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPasssword] = useState('');
  const [confPassword, SetConfPassword] = useState('');
  const [msg , setMsg] = useState('');
  const navigate = useNavigate();


  const Register = async(e) =>{
    e.preventDefault();
    try{
        await axios.post('http://localhost:5000/users',{
          name: name,
          email: email,
          password: password,
          confPassword: confPassword
        });
        navigate("/");

    } catch(error) {
      if(error.response){
        setMsg(error.response.data.message);
      }
    }
  }

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <p className="has-text-centered">{msg}</p>
              <form onSubmit= { Register } className="box">
                <h1 className="title is-2">Registrarse</h1>
                <div className="field">
                  <label className="label">Nombre</label>
                  <div className="control">
                    <input type="text" className="input" placeholder="Name" 
                    value={name} onChange={(e)=> SetName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Correo Electronico</label>
                  <div className="control">
                    <input type="text" className="input" placeholder="Email" 
                    value={email} onChange={(e)=> SetEmail(e.target.value)}/>
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
                      onChange={(e)=> SetPasssword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirmar Contarseña</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={confPassword} 
                      onChange={(e)=> SetConfPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Registro
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

export default Register;
