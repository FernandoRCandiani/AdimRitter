import { useLocation, Link } from "react-router-dom";

import { getUser } from '../../services/auth';

import "./style.css";

export function MenuLateral() {
  const location = useLocation();

  const user = getUser();

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

          {user.role === 'ADMIN' && (
            <>
              <Link to="/empresa" className={["btn-outline-focus", "p-2", location.pathname === '/empresa' ? 'active' : ''].join(" ")}>
                Empresas
              </Link>

              <Link to="/recompensa" className={["btn-outline-focus", "p-2", location.pathname === '/recompensa' ? 'active' : ''].join(" ")}>
                Recompensa
              </Link>

              <Link to="/missao" className={["btn-outline-focus", "p-2", location.pathname === '/missao' ? 'active' : ''].join(" ")}>
                Missao
              </Link>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
