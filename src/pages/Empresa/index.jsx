import { Tabela } from "../../componentes/Tabela";
import { Modal } from "../../componentes/Modal";
import { Paginacao } from "../../componentes/Paginacao";
import Dropzone from "../../componentes/Dropzone";


export function Empresa() {
  return (
    <>
      <div className="d-flex flex-column gap-2">

        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3">Lista das Empresas cadastadas</div>

          <div className="col-3 d-flex justify-content-end">
            <button
              type="button"
              className="d-flex btn btn-primary align-items-center"
            >
              <img src="./plus-circle.svg" alt="" className="pe-2" />
              Cadastrar Empresas
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
              <div className="col-3">321 empresas cadastradas</div>
              <div className="col-3 d-flex justify-content-end">
                <Paginacao />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen onRequestClose={() => { }} title={"Empresa"}>
        <form>

          <div className="row mb-4 ">
            <div className="col">
                <div className="mb-3">
                  <input type="text" className="form-control" id="nome" aria-describedby="nomeHelp" placeholder="Nome da empresa" />
                </div>

                <div className="mb-3">
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                </div>

                <div className="mb-3">
                  <input type="text" className="form-control" id="documento" aria-describedby="documentoHelp" placeholder="Documento (CNPJ)" />
                </div>

                <div className="">
                  <input type="text" className="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Telefone" />
              </div>
            </div>

            <div className="col">
                <Dropzone />
            </div>
          </div>


          <div className="col pb-4">
            <div className="row">
              <div className="col-4 mb-3">
                <input type="text" className="form-control" id="cep" aria-describedby="ceplHelp" placeholder="CEP" />
              </div>

              <div className="col-2 mb-3">
                <button type="submit" class="btn btn-primary w-100">Consultar</button>
              </div>

              <div className="col mb-3">
                <input type="text" className="form-control" id="address" aria-describedby="addressHelp" placeholder="Endereço" disabled />
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                <input type="text" className="form-control" id="district" aria-describedby="districtHelp" placeholder="Bairro" disabled />
              </div>

              <div className="col mb-3">
                <input type="text" className="form-control" id="complement" aria-describedby="complementHelp" placeholder="Complemento" />
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                <input type="text" className="form-control" id="city" aria-describedby="cityHelp" placeholder="Cidade" disabled />
              </div>

              <div className="col mb-3">
                <input type="text" className="form-control" id="uf" aria-describedby="ufHelp" placeholder="Estado" disabled />
              </div>
            </div>
          </div>





          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
      </Modal>
    </>
  );
}
