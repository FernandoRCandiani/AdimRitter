import { Link } from "react-router-dom";
import { useGlobal } from "../../contexts/Global";
import { getUser, signout } from "../../services/auth";

import "./style.css";
import { FaUserEdit } from "react-icons/fa";

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
        <img src="/EcoVille.png" alt="Logo" width="70" height="70" />

        <div className="d-flex navbar-brand align-items-center">
          <img
            src={user?.image ?? "/icon.png"}
            alt={user.name}
            width="70"
            height="70"
            className="d-inline-block align-text-top rounded-circle me-3 profile-image"
          />
          <Link to="/perfil" className={["link-perfil"].join("")}>
            Olá, {user.name ?? "Ritter Humboldt"}
            <FaUserEdit className="icon-edit-perfil" />
          </Link>
        </div>

        <button className="btn btn-outline-danger" onClick={logout}>
          Sair
        </button>
      </div>
    </nav>
  );
}
