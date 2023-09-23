import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";

import { Modal } from "../../componentes/Modal";
import { Paginacao } from "../../componentes/Paginacao";
import { TabelaCertificado } from "../../componentes/TabelaCertificado";

import { useGlobal } from "../../contexts/Global";
import { api } from "../../services/api";
import { fetchCertificates } from "../../services/fetches";

import "./style.css";

const INITIAL_FILTER = {
  page: 0,
  title: "",
};

const INITIAL_REGISTER = {
  title: "",
  categoryId: "",
  quizId: "",
};

export function Certificado() {
  const [filterCertificate, setFilterCertificate] = useState(INITIAL_FILTER);
  const [search, setSearch] = useState("");
  const [register, setRegister] = useState(INITIAL_REGISTER);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState();
  const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);

  const { handleLoader, handleMessage } = useGlobal();

  const certificates = useQuery(["certificate", filterCertificate], () =>
    fetchCertificates(filterCertificate)
  ).data;

  function clearFilter() {
    setFilterCertificate(INITIAL_FILTER);
    setSearch("");
  }

  function onSearch(event) {
    if (event.key == "Enter") {
      setFilterCertificate((prev) => ({
        ...prev,
        title: search,
      }));
    }
  }

  function onChange(event) {
    setRegister((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleRegister(event) {
    event.preventDefault();

    handleLoader(true);
    handleLoader(false);
  }

  async function getInfoCertificate(id) {
    handleLoader(true);

    const response = await api.get(`/certificates/${id}`);
    setSelectedCertificate(response.data);
    setIsOpenModalInfo(true);

    handleLoader(false);
  }

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3 h4">Lista dos certificados cadastrados</div>

          <div className="col-3 d-flex justify-content-end">
            <button
              type="button"
              className="d-flex btn btn-primary align-items-center"
              onClick={() => setIsOpenModalRegister(true)}
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
                  <div className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Nome da Certificados"
                      aria-label="Search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      onKeyDown={onSearch}
                    />
                    {filterCertificate.title && (
                      <button className="btn" onClick={clearFilter}>
                        <FaTimes />
                      </button>
                    )}
                    <button
                      className="btn btn-outline-success"
                      type="submit"
                      onClick={() =>
                        setFilterCertificate((prev) => ({
                          ...prev,
                          title: search,
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
                      <th scope="col">Certificado</th>
                      <th scope="col">Missão</th>
                      <th scope="col">Infos</th>
                    </tr>

                    {certificates?.data?.map((prize) => (
                      <TabelaCertificado
                        key={prize.id}
                        info={() => getInfoCertificate(prize.id)}
                        {...prize}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row align-items-center justify-content-between">
              <div className="col-3">
                {certificates?.totalItems} certificados cadastradas
              </div>
              <div className="col-3 d-flex justify-content-end">
                <Paginacao
                  current={filterCertificate?.page}
                  totalPages={certificates?.totalPages}
                  setCurrent={(page) =>
                    setFilterCertificate((prev) => ({ ...prev, page }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CADASTRO */}
      <Modal
        isOpen={isOpenModalRegister}
        onRequestClose={() => setIsOpenModalRegister(false)}
        title={"Certificado"}
      >
        <form onSubmit={handleRegister}>
          <div className="row">
            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="titleHelp"
                placeholder="Nome do Certificado"
                name="title"
                value={register.title}
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
                <option value="1">Aeropaortuária</option>
                <option value="2">Incêndio</option>
                <option value="3">Coleta residual</option>
              </select>
            </div>

            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
                name="quizId"
                value={register.quizId}
                onChange={onChange}
              >
                <option value="" disabled>
                  Missão
                </option>
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
      <Modal
        isOpen={isOpenModalInfo}
        onRequestClose={() => setIsOpenModalInfo(false)}
        title={"Certificado"}
      >
        <form>
          <div className="row mb-4 ">
            <div className="col text-start">
              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Certificado: {selectedCertificate?.title}
              </div>
            </div>

            <div className="col text-start">
              <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
                Missão: {selectedCertificate?.quiz?.name}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
