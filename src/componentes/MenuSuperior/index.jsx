import { useLocation, Link } from "react-router-dom";
import { useGlobal } from "../../contexts/Global";
import { getUser, signout } from "../../services/auth";

import "./style.css";

export function MenuSuperior() {
  const { handleLoader } = useGlobal();

  const user = getUser();
  const location = useLocation();

  function logout() {
    handleLoader(true);

    signout();
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow head">
      <div className="container-fluid justify-content-between">
        <img src="/EcoVille.png" alt="Logo" width="70" height="70" />

        <div className="d-flex navbar-brand align-items-center">
          <img
            src={user?.image ?? "/icon.png"}
            alt={user.name}
            width="70"
            height="70"
            className="d-inline-block align-text-top rounded-circle me-3 profile-image"
          />
          <Link
            to="/perfil"
            className={[
              "btn-perfil",
              location.pathname === "/perfil" ? "active" : "",
            ].join("")}
          >
            Olá, {user.name ?? "Ritter Humboldt"}
          </Link>
        </div>

        <button className="btn btn-outline-danger" onClick={logout}>
          Sair
        </button>
      </div>
    </nav>
  );
}
