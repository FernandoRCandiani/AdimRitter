import { useState } from "react";

import './style.css';

const INITIAL_STATE = {
  email: "",
  password: ""
};

export function Login() {
  const [data, setData] = useState(INITIAL_STATE);
  const [whichForm, setWhichForm] = useState("login");

  function onChange(event) {
    setData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function effectLogin(event) {
    event.preventDefault();

    try {
      return window.location.assign("/dashboard");
    } catch (error) {
    } finally {
    }
  }

  async function forgotPassword(event) {
    event.preventDefault();

    try {
      changeForm("login");
    } catch (error) {
    } finally {
    }
  }

  function changeForm(form) {
    setWhichForm(form);

    setData(INITIAL_STATE);
  }

  const IS_LOGIN = whichForm === 'login';

  return (
    <div className="container">
      <div className="row justify-content-center vh-100">
        <div className="col-5 align-self-center rounded shadow bg-body-secondary p-5 ">
          {IS_LOGIN ? (
            <form onSubmit={effectLogin}>
              <div className="text-center pb-5">
                <img
                  src="/EcoVille.png"
                  className="rounded h-50 w-50"
                  alt="Ritter Humboldt"
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  value={data.email}
                  onChange={onChange}
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={onChange}
                />
                <label htmlFor="floatingPassword">Senha</label>
              </div>
              <div className="row d-flex justify-content-between align-items-center pt-3">
                <div className="col">
                  <span
                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    onClick={() => changeForm("forgot")}
                  >
                    Esqueceu seu acesso?
                  </span>
                </div>

                <div className="col d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={forgotPassword}>
              <div className="text-center pb-5">
                <img
                  src="/EcoVille.png"
                  className="rounded h-50 w-50"
                  alt="Ritter Humboldt"
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  value={data.email}
                  onChange={onChange}
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="row d-flex justify-content-between align-items-center pt-3">
                <div className="col">
                  <span
                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    onClick={() => changeForm("login")}
                  >
                    Voltar para o login
                  </span>
                </div>

                <div className="col d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Redefinir senha
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
