import { Tabela } from "../../componentes/Tabela";
import { Paginacao } from "../../componentes/Paginacao";
import { Modal } from "../../componentes/Modal";
import Dropzone from "../../componentes/Dropzone";
import "./style.css";

export function Usuario() {
  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3 h4">Lista das usuário cadastadas</div>

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
                      <th scope="col">Status</th>
                      <th scope="col">Infos</th>
                    </tr>

                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
                    <Tabela
                      nome={"Coca cola"}
                      doc={"001.039.241/0001-33"}
                      email={"cocacola@cocacola.com.br"}
                    />
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

      {/* MODAL DE CADASTRO */}
      <Modal isOpen={false} onRequestClose={() => {}} title={"Usuário"}>
        <form>
          <div className="row mb-4 ">
            <div className="col">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  aria-describedby="nomeHelp"
                  placeholder="Nome do funcionario"
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="documento"
                  aria-describedby="documentoHelp"
                  placeholder="Documento (CPF)"
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  aria-describedby="phoneHelp"
                  placeholder="Telefone"
                />
              </div>

              <div className="">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Sexo</option>
                  <option value="1">Masculino</option>
                  <option value="2">Feminino</option>
                  <option value="3">Outro</option>
                </select>
              </div>
            </div>

            <div className="col">
              <Dropzone />
            </div>
          </div>

          <div className="row">
            <div className="col-4 mb-3">
              <input
                type="text"
                className="form-control"
                id="cep"
                aria-describedby="ceplHelp"
                placeholder="CEP"
              />
            </div>

            <div className="col-2 mb-3">
              <button type="submit" className="btn btn-primary w-100">
                Consultar
              </button>
            </div>

            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="address"
                aria-describedby="addressHelp"
                placeholder="Endereço"
                disabled
              />
            </div>
          </div>

          <div className="row">
            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="district"
                aria-describedby="districtHelp"
                placeholder="Bairro"
                disabled
              />
            </div>

            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="complement"
                aria-describedby="complementHelp"
                placeholder="Complemento"
              />
            </div>
          </div>

          <div className="row">
            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="city"
                aria-describedby="cityHelp"
                placeholder="Cidade"
                disabled
              />
            </div>

            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="uf"
                aria-describedby="ufHelp"
                placeholder="Estado"
                disabled
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </form>
      </Modal>

      {/* MODAL DE INFORMAÇÃO */}
      <Modal isOpen={false} onRequestClose={() => {}} title={"Usuário"}>
        <form>
          <div className="row mb-4 ">
            <div className="col text-start">
              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Nome: Fernando Candiani
              </div>

              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Email: chchhc@gmail.com
              </div>

              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                CPF: 123.456.789-12
              </div>

              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Telefone: 4002-8922
              </div>

              <div className="border-bottom border-light-subtle fw-medium p-2">
                Sexo: Masculino
              </div>
            </div>

            <div className="col text-center d-flex justify-content-center align-items-center">
              <img
                src="/EcoVille.png"
                className="h-auto w-50"
                alt="Foto de usuario"
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
              CEP: 069010-060
            </div>

            <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
              Endereço: Av.Lins, Nº 1
            </div>
          </div>

          <div className="row mb-4">
            <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
              Bairro: Jd São Paulo
            </div>

            <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
              Complemento:
            </div>
          </div>

          <div className="row mb-4">
            <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
              Cidade: Embu Guaçu
            </div>

            <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
              Estado: São Paulo
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
