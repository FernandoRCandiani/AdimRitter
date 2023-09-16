import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Empresa } from "../pages/Empresa";
import { Usuario } from "../pages/Usuario";
import { Recompensa } from "../pages/Recompensa";

import { MenuSuperior } from "../componentes/MenuSuperior";
import { MenuLateral } from "../componentes/MenuLateral";

export function Rotas() {
  const location = useLocation();

  return (
    <main className="page">
      {location.pathname !== "/" && (
        <>
          <MenuSuperior />
          <MenuLateral />
        </>
      )}
      <section
        className={[
          "page-content",
          location.pathname === "/" ? "login" : "",
        ].join(" ")}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/recompensa" element={<Recompensa />} />
        </Routes>
      </section>
    </main>
  );
}
