export function MenuSuperior() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow z-0 position-absolute vw-100">
      <div className="container-fluid justify-content-between">
        <img
          src="./EcoVille.png"
          alt="Logo"
          width="70"
          height="70"
        />

        <a className="d-flex navbar-brand align-items-center" href="#">
          <img
            src="./icon.png"
            alt="Foto de perfil"
            width="70"
            height="70"
            className="d-inline-block align-text-top rounded-circle me-3"
          />
          Olá, Ritter Humboldt
        </a>

        <button className="btn btn-outline-danger" type="submit">
          Sair
        </button>
      </div>
    </nav>
  );
}
