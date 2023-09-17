import { Routes, Route, useLocation } from "react-router-dom";

import { MenuSuperior } from "../componentes/MenuSuperior";
import { MenuLateral } from "../componentes/MenuLateral";

import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { DashboardCompany } from "../pages/DashboardCompany";
import { Empresa } from "../pages/Empresa";
import { Usuario } from "../pages/Usuario";
import { Recompensa } from "../pages/Recompensa";
import { Missao } from "../pages/Missao";
import { Certificado } from "../pages/Certificado";

import { Permission } from "../util/Permission";
import { getUser } from "../services/auth";

const PageDashboard = Permission()(Dashboard);
const PageDashboardCompany = Permission()(DashboardCompany);
const PageUsuario = Permission()(Usuario);
const PageEmpresa = Permission()(Empresa);
const PageRecompensa = Permission()(Recompensa);
const PageMissao = Permission()(Missao);
const PageCertificado = Permission()(Certificado);

export function Rotas() {
  const location = useLocation();

  const user = getUser();

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
          <Route path="/missao" element={<PageMissao />} />
          <Route path="/dashboard" element={
            user.role === 'COMPANIES'
              ? <PageDashboardCompany />
              : <PageDashboard />
          } />
          <Route path="/empresa" element={<PageEmpresa />} />
          <Route path="/usuario" element={<PageUsuario />} />
          <Route path="/recompensa" element={<PageRecompensa />} />
          <Route path="/certificado" element={<PageCertificado />} />
        </Routes>
      </section>
    </main>
  );
}
