import { addDays, format, startOfToday } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";

import { MdPlaylistAdd } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useGlobal } from "../../contexts/Global";
import { showCategoryName } from "../../util";

import "./style.css";

export function CriacaoMissao() {
  const [register, setRegister] = useState({});
  const [expandQuestion, setExpandQuestion] = useState(false);

  const { handleLoader, handleMessage, categories } = useGlobal();

  const today = startOfToday();

  function onChange(event) {
    setRegister((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function onExpandQuestion() {
    setExpandQuestion(!expandQuestion);
  }

  return (
    <>
      <div className="d-flex align-items-center bg-body-tertiary shadow m-0 p-3">
        <Link
          to="/missao"
          className={["btn", "btn-primary", "/missao"].join(" ")}
        >
          <div className="d-flex align-items-center gap-2">
            <AiOutlineArrowLeft />
            Voltar
          </div>
        </Link>

        <div className="col text-center h3 m-0">Criar Missão</div>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="m-0">
          <div className="bg-body-tertiary p-3">
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
                    name="name"
                    value={register.name}
                    onChange={onChange}
                  />
                </div>

                <div className="col mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="data"
                    aria-describedby="datalHelp"
                    placeholder="Data da missão"
                    min={format(addDays(today, 2), "yyyy'-'MM'-'dd")}
                    max="9999-12-31"
                    name="startsAt"
                    value={register.startsAt}
                    onChange={onChange}
                  />
                </div>

                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="categoryId"
                    value={register.categoryId}
                    onChange={onChange}
                  >
                    <option value="" disabled>
                      Categoria
                    </option>
                    {categories?.map((category) => (
                      <option value={category.id} key={category.id}>
                        {showCategoryName(category?.name)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CRIAR PERGUNTA */}
              <div className="h5 mb-2">Criação de pergunta</div>
              <div className="row justify-content-start">
                <div className="col-2 mb-3">
                  <button type="button" className="btn btn-primary w-100">
                    <MdPlaylistAdd /> Criar Pergunta
                  </button>
                </div>
              </div>
              <div>
                <p>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    onClick={onExpandQuestion}
                  >
                    <div className="d-flex align-items-center gap-2">
                      Pergunta
                      {expandQuestion ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                  </button>
                </p>
                <div className="collapse" id="collapseExample">
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
                  <div className="h5 mb-2">
                    Formulário para criação de respostas
                  </div>

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
                        // for="respostaCorreta1"
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
                        // for="respostaCorreta2"
                        id="resposta"
                        aria-describedby="nomeHelp"
                        placeholder="Resposta"
                      />
                    </div>
                  </div>

                  <div className="row justify-content-end">
                    <div className="col-2 mb-3">
                      <button type="button" className="btn btn-primary w-100">
                        <MdPlaylistAdd /> Respostas
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row justify-content-end">
                <div className="col-2 mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled
                  >
                    Criar Missão
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
