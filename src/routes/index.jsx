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
    <main className="page">
      {location.pathname !== "/login" && (
        <>
          <MenuSuperior />
          <MenuLateral />
        </>
      )}
      <section className={["page-content", location.pathaname === '/login' ? 'login' : ''].join(" ")}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/empresa" element={<Empresa />} />
        </Routes>
      </section>
    </main>
  );
}
