
import { Tabela } from "../../componentes/Tabela";
import { Paginacao } from "../../componentes/Paginacao";

export function Usuario() {
  return (
    <>
      <div className="d-flex flex-column gap-2">

        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3">Lista das usuário cadastadas</div>

          <div className="col-3 d-flex justify-content-end">
            <button
              type="button"
              className="d-flex btn btn-primary align-items-center"
            >
              <img src="./plus-circle.svg" alt="" className="pe-2" />
              Cadastrar Usuário
            </button>
          </div>
        </div>


        <div className="m-0">
          <div className="bg-body-tertiary p-3">
            <div className="mh-100 tamanho">
              <div className="row justify-content-end">
                <div className="col-4 pb-3">
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Nome da Usuário"
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
                      <th scope="col">Nome</th>
                      <th scope="col">Documento</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Contato</th>
                      <th scope="col">Status</th>
                      <th scope="col">Infos</th>
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
              <div className="col-3">1234 usuário cadastrados</div>
              <div className="col-3 d-flex justify-content-end">
                <Paginacao />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal isOpen onRequestClose={() => {}} title={"sdsad"}>
        lorem*100
      </Modal> */}
    </>
  );
}

