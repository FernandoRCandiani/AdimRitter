import { useState } from "react";

import { ROLE } from "../../constants";
import { useGlobal } from '../../contexts/Global';
import { api } from '../../services/api';
import { setToken, setUser } from '../../services/auth';
import { fetchProfile } from '../../services/fetches';
import { sleep } from '../../util'

import './style.css';

const INITIAL_STATE = {
  email: "",
  password: ""
};

export function Login() {
  const { handleLoader, handleMessage } = useGlobal();

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

    handleLoader(true);

    try {
      const response = await api.post('/auth/login', data);

      await sleep();

      if (response.data.user.role === ROLE.EMPLOYEES) {
        handleLoader(false);
        return handleMessage("Você não tem acesso", 'error');
      }

      setToken(response.data.token);

      await sleep(50);

      const user = await fetchProfile();
      setUser(user);

      return window.location.assign("/dashboard");
    } catch (error) {
      const data = error?.response?.data;
      return handleMessage(data.message, 'error');
    } finally {
      handleLoader(false);
    }
  }

  async function forgotPassword(event) {
    event.preventDefault();

    handleLoader(true);

    try {
      await api.post('/auth/forgot', { email: data.email });

      handleLoader(false);

      handleMessage('Redefinição de senha enviada com sucesso', 'success');

      changeForm('login');
    } catch (error) {
      const data = error?.response?.data;
      return handleMessage(data.message, 'error');
    } finally {
      handleLoader(false);
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
