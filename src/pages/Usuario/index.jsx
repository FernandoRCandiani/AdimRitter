import axios from "axios";
import { useRef, useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { useQuery } from "react-query";

import { Tabela } from "../../componentes/Tabela";
import { Paginacao } from "../../componentes/Paginacao";
import { Modal } from "../../componentes/Modal";
import Dropzone from "../../componentes/Dropzone";

import { useGlobal } from "../../contexts/Global";
import { api } from "../../services/api";
import { fetchUsers } from "../../services/fetches";
import { queryClient } from "../../services/queryClient";
import { cep, document, phone } from "../../util/mask";

import "./style.css";

const INITIAL_FILTER = {
  page: 0,
  name: "",
  role: "admin",
};

const INITIAL_REGISTER = {
  name: "",
  email: "",
  document: "",
  gender: "",
  cep: "",
  address: "",
  district: "",
  complement: "",
  city: "",
  uf: "",
  phone: "",
};

export function Usuario() {
  const { handleLoader, handleMessage } = useGlobal();

  const [filterUser, setFilterUser] = useState(INITIAL_FILTER);
  const [search, setSearch] = useState("");
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);
  const [register, setRegister] = useState(INITIAL_REGISTER);
  const [selectedFile, setSelectedFile] = useState();
  const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const addressRef = useRef();
  const districtRef = useRef();

  const users = useQuery(['users', filterUser], () => fetchUsers(filterUser)).data;

  function goSearch(event) {
    if (event.key === 'Enter') {
      setFilterUser(prev => ({
        ...prev,
        name: search
      }));
    }
  }

  function cleanFilter() {
    setFilterUser(INITIAL_FILTER);
    setSearch("");
  }

  async function searchCep() {
    handleLoader(true);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${register.cep}/json/`);

      if (response.data.erro) {
        handleLoader(false);
        handleMessage("CEP inválido", "error");
        return;
      }

      const { logradouro, localidade, uf, bairro } = response.data;

      setRegister(prev => ({
        ...prev,
        address: logradouro,
        city: localidade,
        district: bairro,
        uf,
      }));

      !logradouro
        ? addressRef.current?.removeAttribute("disabled")
        : addressRef.current?.setAttribute("disabled", "true");

      !bairro
        ? districtRef.current?.removeAttribute("disabled")
        : districtRef.current?.setAttribute("disabled", "true");
    } catch (error) {
      handleMessage("CEP inválido", "error");
    } finally {
      handleLoader(false);
    }
  }

  function onChange(event) {
    setRegister(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function handleRegister(event) {
    event.preventDefault();

    handleLoader(true);

    const formData = new FormData();

    formData.append("name", register.name);
    formData.append("email", register.email);
    formData.append("document", register.document);
    formData.append("gender", register.gender);
    formData.append("cep", register.cep);
    formData.append("address", register.address);
    formData.append("district", register.district);
    formData.append("complement", register.complement);
    formData.append("city", register.city);
    formData.append("uf", register.uf);
    formData.append("phone", register.phone);
    formData.append("media", selectedFile);

    try {
      await api.post("/users", formData);
      setFilterUser(INITIAL_FILTER);
      handleMessage("Usuário criado com sucesso", "success");
      setIsOpenModalRegister(false);
      queryClient.refetchQueries(['users', filterUser]);
      setRegister(INITIAL_REGISTER);
    } catch (error) {
      handleMessage("Erro ao criar usuário", "error");
    } finally {
      handleLoader(false);
    }
  }

  async function getInfoUser(id) {
    const response = await api.get(`/users/${id}`);
    setSelectedUser(response.data);
    setIsOpenModalInfo(true);
  }

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="row align-items-center justify-content-between bg-body-tertiary shadow m-0 p-3">
          <div className="col-3 h4">Lista de usuários cadastrados</div>

          <div className="col-3 d-flex justify-content-end">
            <button
              type="button"
              className="d-flex btn btn-primary align-items-center"
              onClick={() => setIsOpenModalRegister(true)}
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
                  <div className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Nome da Usuário"
                      aria-label="Search"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      onKeyDown={goSearch}
                    />
                    {filterUser.name && (
                      <button className="btn" onClick={cleanFilter}>
                        <FaTimes />
                      </button>
                    )}
                    <button className="btn btn-outline-success" onClick={() => setFilterUser(prev => ({ ...prev, name: search }))}>
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
                      <th scope="col">Documento</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Status</th>
                      <th scope="col">Infos</th>
                    </tr>

                    {users?.data?.map(user => (
                      <Tabela
                        key={user.id}
                        info={() => getInfoUser(user.id)}
                        {...user}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row align-items-center justify-content-between">
              <div className="col-3">
                {users?.totalItems} usuários cadastrados
              </div>
              <div className="col-3 d-flex justify-content-end">
                <Paginacao
                  current={filterUser?.page}
                  totalPages={users?.totalPages}
                  setCurrent={page => setFilterUser(prev => ({ ...prev, page }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CADASTRO */}
      <Modal isOpen={isOpenModalRegister} onRequestClose={() => setIsOpenModalRegister(false)} title={"Usuário"}>
        <form onSubmit={handleRegister}>
          <div className="row mb-4">
            <div className="col">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  aria-describedby="nomeHelp"
                  placeholder="Nome do funcionario"
                  name="name"
                  value={register.name}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  name="email"
                  value={register.email}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="documento"
                  aria-describedby="documentoHelp"
                  placeholder="Documento (CPF)"
                  name="document"
                  value={register.document}
                  onChange={e => setRegister(prev => ({ ...prev, document: document(e.target.value) }))}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  aria-describedby="phoneHelp"
                  placeholder="Telefone"
                  name="phone"
                  value={register.phone}
                  onChange={e => setRegister(prev => ({ ...prev, phone: phone(e.target.value) }))}
                />
              </div>

              <div className="">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="gender"
                  value={register.gender}
                  onChange={onChange}
                >
                  <option value="" disabled>Sexo</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                </select>
              </div>
            </div>

            <div className="col">
              <Dropzone onFileUploaded={setSelectedFile} />
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
                name="cep"
                value={register.cep}
                onChange={e => setRegister(prev => ({ ...prev, cep: cep(e.target.value) }))}
              />
            </div>

            <div className="col-2 mb-3">
              <button type="button" className="btn btn-primary w-100" onClick={searchCep} disabled={!register.cep}>
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
                name="address"
                value={register.address}
                onChange={onChange}
                ref={addressRef}
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
                name="district"
                value={register.district}
                onChange={onChange}
                ref={districtRef}
              />
            </div>

            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="complement"
                aria-describedby="complementHelp"
                placeholder="Complemento"
                name="complement"
                value={register.complement}
                onChange={onChange}
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
                name="city"
                value={register.city}
                onChange={onChange}
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
                name="uf"
                value={register.uf}
                onChange={onChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </form>
      </Modal>

      {/* MODAL DE INFORMAÇÃO */}
      <Modal isOpen={isOpenModalInfo} onRequestClose={() => setIsOpenModalInfo(false)} title={"Usuário"}>
        <div className="row mb-4 ">
          <div className="col text-start">
            <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
              Nome: {selectedUser?.name}
            </div>

            <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
              Email: {selectedUser?.email}
            </div>

            <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
              CPF: {document(selectedUser?.document)}
            </div>

            <div className="mb-3 border-bottom border-light-subtle fw-medium p-2">
              Telefone: {phone(selectedUser?.phone)}
            </div>

            <div className="border-bottom border-light-subtle fw-medium p-2">
              Sexo: {selectedUser?.gender}
            </div>
          </div>

          <div className="col text-center d-flex justify-content-center align-items-center">
            <img
              src={selectedUser?.image ?? "/EcoVille.png"}
              className="h-auto w-50"
              alt="Foto de usuario"
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
            CEP: {cep(selectedUser?.cep)}
          </div>

          <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
            Endereço: {selectedUser?.address}
          </div>
        </div>

        <div className="row mb-4">
          <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
            Bairro: {selectedUser?.district}
          </div>

          {selectedUser?.complement && (
            <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
              Complemento: {selectedUser?.complement}
            </div>
          )}
        </div>

        <div className="row mb-4">
          <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
            Cidade: {selectedUser?.city}
          </div>

          <div className="col border-bottom border-light-subtle fw-medium ms-3 me-3 p-2">
            Estado: {selectedUser?.uf}
          </div>
        </div>
      </Modal>
    </>
  );
}
