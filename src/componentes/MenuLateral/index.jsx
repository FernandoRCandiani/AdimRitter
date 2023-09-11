import { useLocation, Link } from "react-router-dom";

import { Empresa } from "../../pages/Empresa";
import "./style.css";

export function MenuLateral() {
  const location = useLocation();

  return (
    <>
      <div className="d-flex justify-content-start">
        <div className="col-2 bg-body-tertiary shadow vh-100 padding-menu-top m-0">
          <div className="row gap-2 m-0">
            
            <Link to="/dashboard" className="btn-outline-focus p-2">
              Dashboard
            </Link>

            <Link to="/usuario" className="btn-outline-focus p-2">
              Usuários
            </Link>

            <Link to="/empresa" className="btn-outline-focus p-2">
              Empresas
            </Link>
          </div>
        </div>

        {/* <div className="col-10 padding-menu-top">
          {location.pathname === "/Empresa" && <Empresa />}
        </div> */}
      </div>
    </>
  );
}
