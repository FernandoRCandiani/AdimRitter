import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Empresa } from "../pages/Empresa";
import { Usuario } from "../pages/Usuario";

import { MenuSuperior } from "../componentes/MenuSuperior";
import { MenuLateral } from "../componentes/MenuLateral";

export function Rotas() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && (
        <>
          <MenuSuperior />
          <MenuLateral />
        </>
      )}
      {/* <div className="col-10 padding-menu-top">
        {location.pathname === "/empresa" && <Empresa />}
      </div> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/empresa" element={<Empresa />} />
      </Routes>
    </>
  );
}
