import { useGlobal } from "../../contexts/Global";
import { getUser, signout } from "../../services/auth";

import './style.css';

export function MenuSuperior() {
  const { handleLoader } = useGlobal();

  const user = getUser();

  function logout() {
    handleLoader(true);

    signout();
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow head">
      <div className="container-fluid justify-content-between">
        <img
          src="/EcoVille.png"
          alt="Logo"
          width="70"
          height="70"
        />

        <div className="d-flex navbar-brand align-items-center">
          <img
            src={user?.image ?? "/icon.png"}
            alt={user.name}
            width="70"
            height="70"
            className="d-inline-block align-text-top rounded-circle me-3 profile-image"
          />
          Olá, {user.name ?? "Ritter Humboldt"}
        </div>

        <button className="btn btn-outline-danger" onClick={logout}>
          Sair
        </button>
      </div>
    </nav>
  );
}
