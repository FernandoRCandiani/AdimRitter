import { Tabela } from "../../componentes/Tabela";

export function Empresa() {
  return (
    <>
      <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-4 p-3">
        <div className="col-2">Lista das Empresas cadastadas</div>

        <div className="col-2 d-flex justify-content-end">
          <button
            type="button"
            className="d-flex btn btn-primary align-items-center"
          >
            <img src="./plus-circle.svg" alt="" className="pe-2" />
            Cadastrar Empresas
          </button>
        </div>
      </div>

      <div className="m-4">
        <div className="bg-body-tertiary p-3">
          <div className="mh-100 tamanho">
            <div className="row justify-content-end">
              <div className="col-3 pb-3">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Nome da empresa"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Buscar
                  </button>
                </form>
              </div>
            </div>

            <div className="row ps-3 pe-3">
              <table className="table shadow">
                <tbody>
                  <tr>
                    <th scope="col">Infos</th>
                    <th scope="col">Nome Fantasia</th>
                    <th scope="col">CNPJ</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Contato</th>
                    <th scope="col">Responsável</th>
                  </tr>

                  <Tabela />
                  <Tabela />
                  <Tabela />
                  <Tabela />
                  <Tabela />
                  <Tabela />
                  <Tabela />
                  <Tabela />
                  <Tabela />
                  <Tabela />
                  <Tabela />
                </tbody>
              </table>
            </div>
          </div>

          <div className="row align-items-center justify-content-between">
            <div className="col-2">321 empresas cadastradas</div>
            <div className="col-2 d-flex justify-content-end">
              <nav aria-label="Page navigation example">
                <ul className="pagination m-0">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
