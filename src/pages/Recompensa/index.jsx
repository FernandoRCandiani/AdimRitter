import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";

import Dropzone from "../../componentes/Dropzone";
import { Modal } from "../../componentes/Modal";
import { Paginacao } from "../../componentes/Paginacao";
import { TabelaRecompensa } from "../../componentes/TabelaRecompensa";

import { useGlobal } from "../../contexts/Global";
import { api } from "../../services/api";
import { fetchPrizes } from "../../services/fetches";

import "./style.css";
import { queryClient } from "../../services/queryClient";

const INITIAL_FILTER = {
  page: 0,
  name: ""
};

const INITIAL_REGISTER = {
  name: "",
  rarity: "",
  type: ""
};

export function Recompensa() {
  const [filterPrize, setFilterPrize] = useState(INITIAL_FILTER);
  const [search, setSearch] = useState("");
  const [register, setRegister] = useState(INITIAL_REGISTER);
  const [selectedFile, setSelectFile] = useState();
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState();
  const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);

  const { handleLoader, handleMessage } = useGlobal();

  const prizes = useQuery(["prizes", filterPrize], () => fetchPrizes(filterPrize)).data;

  function clearFilter() {
    setFilterPrize(INITIAL_FILTER);
    setSearch("");
  }

  function onSearch(event) {
    if (event.key == "Enter") {
      setFilterPrize((prev) => ({
        ...prev,
        name: search,
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

    const formData = new FormData();

    const values = Object.values(register);
    const keys = Object.keys(register);

    for (const key in values) {
      formData.append([keys[key]], values[key]);
    }

    formData.append("media", selectedFile);

    try {
      await api.post("/prizes", formData);

      setFilterPrize(INITIAL_FILTER);
      handleMessage("Recompensa cadastrada com sucesso!", "success");
      queryClient.refetchQueries(["prizes", filterPrize]);
    } catch (error) {
      const data = error?.response?.data;
      handleMessage(data?.message ?? "Erro ao cadastrar recompensa");
    } finally {
      handleLoader(false);
    }
  }

  async function getInfoPrize(id) {
    const response = await api.get(`/prizes/${id}`);
    setSelectedPrize(response.data);
    setIsOpenModalInfo(true);
  }

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3 h4">Lista das Recompensas cadastadas</div>

          <div className="col-3 d-flex justify-content-end">
            <button
              type="button"
              className="d-flex btn btn-primary align-items-center"
              onClick={() => setIsOpenModalRegister(true)}
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
                  <div className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Nome da Recompensas"
                      aria-label="Search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      onKeyDown={onSearch}
                    />
                    {filterPrize.name && (
                      <button className="btn" onClick={clearFilter}>
                        <FaTimes />
                      </button>
                    )}
                    <button
                      className="btn btn-outline-success"
                      type="submit"
                      onClick={() =>
                        setFilterPrize((prev) => ({
                          ...prev,
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
                      <th scope="col">Nome</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Raridade</th>
                      <th scope="col">Status</th>
                      <th scope="col">Infos</th>
                    </tr>

                    {prizes?.data?.map((prize) => (
                      <TabelaRecompensa
                        key={prize.id}
                        info={() => getInfoPrize(prize.id)}
                        {...prize}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row align-items-center justify-content-between">
              <div className="col-3">
                {prizes?.totalItems} recompensas cadastradas
              </div>
              <div className="col-3 d-flex justify-content-end">
                <Paginacao
                  current={filterPrize?.page}
                  totalPages={prizes?.totalPages}
                  setCurrent={page => setFilterPrize(prev => ({ ...prev, page }))}
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
        title={"Criar Recompensa"}
      >
        <form onSubmit={handleRegister}>
          <div className="row mb-4 ">
            <div className="col">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  aria-describedby="nomeHelp"
                  placeholder="Nome da recompensa"
                  name="name"
                  value={register.name}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="type"
                  value={register.type}
                  onChange={onChange}
                >
                  <option value="" disabled>Tipo</option>
                  <option value="VIRTUAL">Virtual</option>
                  <option value="PHYSICAL">Físico</option>
                </select>
              </div>

              <div className="mb-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="rarity"
                  value={register.rarity}
                  onChange={onChange}
                >
                  <option value="" disabled>Raridade</option>
                  <option value="COMMON">Comum</option>
                  <option value="UNCOMMON">Incomum</option>
                  <option value="EPIC">Épico</option>
                  <option value="RARE">Raro</option>
                  <option value="LENDARY">Lendário</option>
                  <option value="LIMITED">Limitado</option>
                </select>
                <div className="notacao">
                  Obs: Toda recompensa física é limitada por padrão
                </div>
              </div>
            </div>

            <div className="col">
              <Dropzone onFileUploaded={setSelectFile} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Cadastrar recompensa
          </button>
        </form>
      </Modal>

      {/* MODAL DE INFORMAÇÃO */}
      <Modal isOpen={false} onRequestClose={() => { }} title={"Recompensa"}>
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
