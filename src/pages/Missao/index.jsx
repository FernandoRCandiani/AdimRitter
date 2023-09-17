import { Modal } from "../../componentes/Modal";
import { Paginacao } from "../../componentes/Paginacao";

import { MdPlaylistAdd } from "react-icons/md";

import "./style.css";
import { useState } from "react";
import { fetchMissions } from "../../services/fetches";
import { TabelaMissao } from "../../componentes/TabelaMissao";
import { FaTimes } from "react-icons/fa";

const INITIAL_FILTER = { page: 0, name: "" };

export function Missao() {
  const [filterMission, setFilterMission] = useState(INITIAL_FILTER);
  const [search, setSearch] = useState("");
  const [register, setRegister] = useState({});

  const missions = useQuery(["missions", filterMission], () =>
    fetchMissions(filterMission)
  ).data;

  function cleanFilter() {
    setFilterMission(INITIAL_FILTER);
    setSearch("");
  }

  function onSearch(event) {
    if(event.key == 'Enter') {

      setFilterMission((parameter) => ({
        ...parameter,
        name: search,
      }))
    }
  }

  function onChenge(event) {
    setRegister((parameter) => ({
      ...parameter,
      [event.target.name]: event.target.value,
    }))
  }
  
  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3 h4">Lista das Missões cadastadas</div>

          <div className="col-3 d-flex justify-content-end">
            <button
              type="button"
              className="d-flex btn btn-primary align-items-center"
            >
              <img src="./plus-circle.svg" alt="" className="pe-2" />
              Cadastrar Missões
            </button>
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
              <div className="col-3">50 missões cadastradas</div>
              <div className="col-3 d-flex justify-content-end">
                <Paginacao />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CADASTRO */}
      <Modal isOpen={false} onRequestClose={() => {}} title={"Missões"}>
        {/* CRIAR MISSÃO */}
        <form>
          <div className="h5 mb-2">Formulário para criação de missão</div>

          <div className="row">
            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="nome"
                aria-describedby="nomeHelp"
                placeholder="Nome da missão"
              />
            </div>

            <div className="col mb-3">
              <input
                type="date"
                className="form-control"
                id="data"
                aria-describedby="datalHelp"
                placeholder="Data da missão"
              />
            </div>

            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Categoria</option>
                <option value="1">Aeropaortuária</option>
                <option value="2">Incêndio</option>
                <option value="3">Coleta residual</option>
              </select>
            </div>
          </div>

          {/* CRIAR PERGUNTA */}
          <div className="h5 mb-2">Formulário para criação de pergunta</div>

          <div className="row">
            <div className="col mb-3">
              <textarea
                type="text"
                className="form-control"
                id="pergunta"
                aria-describedby="nomeHelp"
                placeholder="Pergunta"
              />
            </div>

            <div className="col mb-3">
              <textarea
                type="text"
                className="form-control"
                id="descricao"
                aria-describedby="datalHelp"
                placeholder="Descricao"
              />
            </div>
          </div>

          {/* CRIAR RESPOSTAS */}
          <div className="h5 mb-2">Formulário para criação de respostas</div>

          <div className="row grid g-3 mb-2">
            <div className="col-2 me-3 mb-3 border-bottom border-light-subtle fw-medium p-2">
              Selecione correta
            </div>

            <div className="col me-3 mb-3 border-bottom border-light-subtle fw-medium p-2">
              Adicionar as resposta em ordem aleatória
            </div>
          </div>

          <div className="row">
            <div className="col-2 mb-3 d-flex justify-content-center">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="respostaCorreta1"
              />
            </div>

            <div className="col mb-3">
              <textarea
                type="text"
                className="form-control"
                for="respostaCorreta1"
                id="resposta"
                aria-describedby="nomeHelp"
                placeholder="Resposta"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-2 mb-3 d-flex justify-content-center">
              <input
                className="form-check-input"
                type="radio"
                name="radioNoLabel"
                id="respostaCorreta2"
              />
            </div>

            <div className="col mb-3">
              <textarea
                type="text"
                className="form-control"
                for="respostaCorreta2"
                id="resposta"
                aria-describedby="nomeHelp"
                placeholder="Resposta"
              />
            </div>
          </div>

          <div className="row justify-content-end">
            <div className="col-2 mb-3">
              <button type="submit" className="btn btn-primary w-100">
                <MdPlaylistAdd /> Respostas
              </button>
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
