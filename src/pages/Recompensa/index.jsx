import { useState } from "react";
import Dropzone from "../../componentes/Dropzone";
import { Modal } from "../../componentes/Modal";
import { Paginacao } from "../../componentes/Paginacao";
import { TabelaRecompensa } from "../../componentes/TabelaRecompensa";

import "./style.css";
import { useQuery } from "react-query";
import { fetchPrizes } from "../../services/fetches";

const INITIAL_FILTER = { page: 0, name: "" };

export function Recompensa() {
  const [filterPlase, setFilterPlase] = useState(INITIAL_FILTER);
  const [search, setSearch] = useState("");

  const prizes = useQuery(["prizes", filterPlase], () =>
    fetchPrizes(filterPlase)
  ).data;

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3 h4">Lista das Recompensas cadastadas</div>

          <div className="col-3 d-flex justify-content-end">
            <button
              type="button"
              className="d-flex btn btn-primary align-items-center"
            >
              <img src="./plus-circle.svg" alt="" className="pe-2" />
              Cadastrar Recompensas
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
                      placeholder="Nome da Recompensas"
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
                      <th scope="col">Tipo</th>
                      <th scope="col">Raridade</th>
                      <th scope="col">Status</th>
                      <th scope="col">Infos</th>
                    </tr>

                    {prizes?.data?.map((prize) => (
                      <TabelaRecompensa key={prize.id} {...prize} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row align-items-center justify-content-between">
              <div className="col-3">200 recompensas cadastradas</div>
              <div className="col-3 d-flex justify-content-end">
                <Paginacao />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CADASTRO */}
      <Modal
        isOpen={false}
        onRequestClose={() => {}}
        title={"Criar Recompensa"}
      >
        <form>
          <div className="row mb-4 ">
            <div className="col">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  aria-describedby="nomeHelp"
                  placeholder="Nome da recompensa"
                />
              </div>

              <div className="mb-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Tipo</option>
                  <option value="1">Físico</option>
                  <option value="2">Vitual</option>
                </select>
              </div>

              <div className="mb-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Raridade</option>
                  <option value="1">Comum</option>
                  <option value="2">Incomum</option>
                  <option value="3">Épico</option>
                  <option value="4">Raro</option>
                  <option value="5">Lendário</option>
                  <option value="6">Limitado</option>
                </select>
                <div className="notacao">
                  Obs: Toda recompensa física é limitada por padrão
                </div>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                />
                <label
                  className="form-check-label"
                  for="flexSwitchCheckChecked"
                >
                  Ativar Recompensa
                </label>
              </div>
            </div>

            <div className="col">
              <Dropzone />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Criar
          </button>
        </form>
      </Modal>

      {/* MODAL DE INFORMAÇÃO */}
      <Modal isOpen={false} onRequestClose={() => {}} title={"Recompensa"}>
        <form>
          <div className="row mb-4 ">
            <div className="col text-start">
              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Nome: Reciclagem
              </div>

              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Tipo: Virtual
              </div>

              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Raridade: Comum
              </div>

              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Status: Ativo
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
        </form>
      </Modal>
    </>
  );
}
