import { useLocation, Link } from "react-router-dom";

import { Empresa } from "../../pages/Empresa";

import "./style.css";

export function MenuLateral() {
  const location = useLocation();
  
  return (
    <aside className="d-flex justify-content-start side-menu">
      <div className="shadow m-0">
        <div className="row gap-2 m-0">

          <Link to="/dashboard" className={["btn-outline-focus", "p-2", location.pathname === '/dashboard' ? 'active' : ''].join(" ")}>
            Dashboard
          </Link>

          <Link to="/usuario" className={["btn-outline-focus", "p-2", location.pathname === '/usuario' ? 'active' : ''].join(" ")}>
            Usuários
          </Link>

          <Link to="/empresa" className={["btn-outline-focus", "p-2", location.pathname === '/empresa' ? 'active' : ''].join(" ")}>
            Empresas
          </Link>
        </div>
      </div>
    </aside>
  );
}
