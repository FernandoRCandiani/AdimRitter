import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { Modal } from "../../componentes/Modal";
import { Paginacao } from "../../componentes/Paginacao";
import { TabelaMissao } from "../../componentes/TabelaMissao";

import { fetchMissions } from "../../services/fetches";

import "./style.css";

import "bootstrap/js/dist/collapse";

const INITIAL_FILTER = {
  page: 0,
  name: "",
};

export function Missao() {
  const [filterMission, setFilterMission] = useState(INITIAL_FILTER);
  const [search, setSearch] = useState("");

  const missions = useQuery(["missions", filterMission], () =>
    fetchMissions(filterMission)
  ).data;

  function cleanFilter() {
    setFilterMission(INITIAL_FILTER);
    setSearch("");
  }

  function onSearch(event) {
    if (event.key === "Enter") {
      setFilterMission((parameter) => ({
        ...parameter,
        name: search,
      }));
    }
  }

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3 h4">Lista das Missões cadastadas</div>

          <div className="col-3 d-flex justify-content-end">
            <Link
              to="/criacaoMissao"
              className={[
                "d-flex",
                "btn",
                "btn-primary",
                "align-items-center",
                "/criacaoMissao",
              ].join(" ")}
            >
              <img src="./plus-circle.svg" alt="" className="pe-2" />
              Cadastrar Missões
            </Link>
          </div>
        </div>

        <div className="m-0">
          <div className="bg-body-tertiary p-3">
            <div className="mh-100 tamanho">
              <div className="row justify-content-end">
                <div className="col-4 pb-3">
                  <div className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Nome da Missão"
                      aria-label="Search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      onKeyDown={onSearch}
                    />
                    {filterMission.name && (
                      <button className="btn" onClick={cleanFilter}>
                        <FaTimes />
                      </button>
                    )}
                    <button
                      className="btn btn-outline-success"
                      type="submit"
                      onClick={() =>
                        setFilterMission((parameter) => ({
                          ...parameter,
                          name: search,
                        }))
                      }
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>

              <div className="row ps-3 pe-3">
                <table className="table shadow">
                  <tbody>
                    <tr>
                      <th scope="col">Missão</th>
                      <th scope="col">Data</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">Infos</th>
                    </tr>

                    {missions?.data?.map((mission) => (
                      <TabelaMissao key={mission.id} {...mission} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row align-items-center justify-content-between">
              <div className="col-3">
                {missions?.totalItems} missões cadastradas
              </div>
              <div className="col-3 d-flex justify-content-end">
                <Paginacao
                  current={filterMission?.page}
                  totalPages={missions?.totalPages}
                  setCurrent={(page) =>
                    setFilterMission((prev) => ({ ...prev, page }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE INFORMAÇÃO */}
      <Modal isOpen={false} onRequestClose={() => {}} title={"Missão"}>
        <form>
          <div className="row mb-4 ">
            <div className="h5 mb-2">Sobre missão</div>

            <div className="col text-start">
              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Nome: Fogo
              </div>
            </div>

            <div className="col text-start">
              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Data: 16/09/2023
              </div>
            </div>

            <div className="col text-start">
              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Categoria: Incêndio
              </div>
            </div>
          </div>

          <div className="row mb-4 ">
            <div className="h5 mb-2">Sobre Pergunta</div>

            <div className="col text-start">
              <div className="mb-3 h-100 border-bottom border-light-subtle fw-medium p-2">
                Pergunta: <br />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
                earum nemo aperiam nam amet aliquam aspernatur error doloribus
                repudiandae sunt?
              </div>
            </div>

            <div className="col text-start">
              <div className="mb-3 h-100 border-bottom border-light-subtle fw-medium p-2">
                Descrição: <br /> Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Illo omnis corporis fugiat optio rerum quasi
                magni, labore tempore incidunt saepe deleniti doloremque. Quae,
                sit ab.
              </div>
            </div>
          </div>

          <div className="row mb-4 ">
            <div className="h5 mb-2">Sobre Respostas</div>

            <div className="col-2 text-start">
              <div className="mb-3 h-100 border-bottom border-light-subtle fw-medium p-2">
                Resposta 1: <br />
                Correta
              </div>
            </div>

            <div className="col text-start">
              <div className="mb-3 h-100 border-bottom border-light-subtle fw-medium p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                omnis corporis fugiat optio rerum quasi magni, labore tempore
                incidunt saepe deleniti doloremque. Quae, sit ab.
              </div>
            </div>
          </div>

          <div className="row mb-4 ">
            <div className="col-2 text-start">
              <div className="mb-3 h-100 border-bottom border-light-subtle fw-medium p-2">
                Resposta 2: <br />
                Errada
              </div>
            </div>

            <div className="col text-start">
              <div className="mb-3 h-100 border-bottom border-light-subtle fw-medium p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                omnis corporis fugiat optio rerum quasi magni, labore tempore
                incidunt saepe deleniti doloremque. Quae, sit ab.
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
