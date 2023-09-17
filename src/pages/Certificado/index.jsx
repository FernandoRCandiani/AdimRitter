import { Tabela } from "../../componentes/Tabela";
import { Modal } from "../../componentes/Modal";
import { Paginacao } from "../../componentes/Paginacao";

import "./style.css";

export function Certificado() {
  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3 h4">Lista das Certificados cadastadas</div>

          <div className="col-3 d-flex justify-content-end">
            <button
              type="button"
              className="d-flex btn btn-primary align-items-center"
            >
              <img src="./plus-circle.svg" alt="" className="pe-2" />
              Cadastrar Certificados
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
                      placeholder="Nome da Certificados"
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
                      <th scope="col">Certificado</th>
                      <th scope="col">Missão</th>
                      <th scope="col">Infos</th>
                    </tr>

                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                    <Tabela
                      nome={"ESG"}
                      doc={"Recuperando a foresta"}
                      certificado
                    />
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row align-items-center justify-content-between">
              <div className="col-3">50 certificados cadastradas</div>
              <div className="col-3 d-flex justify-content-end">
                <Paginacao />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CADASTRO */}
      <Modal isOpen={false} onRequestClose={() => {}} title={"Certificado"}>
        <form>
          <div className="row">
            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="nome"
                aria-describedby="nomeHelp"
                placeholder="Nome do Certificado"
              />
            </div>

            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Missão</option>
                <option value="1">Aeropaortuária</option>
                <option value="2">Incêndio</option>
                <option value="3">Coleta residual</option>
              </select>
            </div>
          </div>

          <div className="col-2 mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Criar
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL DE INFORMAÇÃO */}
      <Modal isOpen={false} onRequestClose={() => {}} title={"Certificado"}>
        <form>
          <div className="row mb-4 ">
            <div className="col text-start">
              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Certificado: Fogo Pleno
              </div>
            </div>

            <div className="col text-start">
              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Missão: Incêndio
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
