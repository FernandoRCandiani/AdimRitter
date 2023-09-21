import axios from "axios";
import { useRef, useState } from "react";

import Dropzone from "../../componentes/Dropzone";
import { Modal } from "../../componentes/Modal";
import { useGlobal } from "../../contexts/Global";
import { api } from "../../services/api";
import { signout } from "../../services/auth";
import { fetchProfile } from "../../services/fetches";
import { cep, document, phone } from "../../util/mask";

import "./style.css";

const INITAL_DATA_PASSWORD = {
  oldPassword: "",
  password: "",
  confirmPassword: ""
};

export function Perfil() {
  const { handleLoader, handleMessage, user, handleUser } = useGlobal();

  const [isOpenModalEditPassword, setIsOpenModalEditPassword] = useState(false);
  const [data, setData] = useState(user);
  const [selectedFile, setSelectedFile] = useState();
  const [dataPassword, setDataPassword] = useState(INITAL_DATA_PASSWORD);

  const addressRef = useRef();
  const districtRef = useRef();

  async function searchCep() {
    handleLoader(true);

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${data.cep}/json/`
      );

      if (response.data.erro) {
        handleLoader(false);
        handleMessage("CEP inválido", "error");
        return;
      }

      const { logradouro, localidade, uf, bairro } = response.data;

      setData((prev) => ({
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
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function onChangePassword(event) {
    setDataPassword((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleEditProfile(event) {
    event.preventDefault();

    handleLoader(true);

    const formData = new FormData();

    let form = {};

    const values = Object.values(data);
    const keys = Object.keys(data);

    for (const key in values) {
      if (values[key] !== user[keys[key]]) {
        Object.assign(form, { [keys[key]]: values[key] });

        formData.append([keys[key]], values[key]);
      }
    }

    if (selectedFile) formData.append("media", selectedFile);

    try {
      await api.patch("/users", formData);

      switch (true) {
        case data.email !== user.email:
        case data.document !== user.document:
          return signout();
        default:
          break;
      }

      handleMessage("Perfil atualizado com sucesso", "success");

      const newUser = await fetchProfile();
      handleUser(newUser);
    } catch (error) {
      handleMessage("Erro ao editar perfil", "error");
    } finally {
      handleLoader(false);
    }
  }

  async function changePassword(event) {
    event.preventDefault();

    handleLoader(true);

    try {
      await api.patch("/users", dataPassword);

      return signout();
    } catch (error) {
      const data = error?.response?.data;
      handleMessage(data?.message ?? "Erro ao atualizar a senha", "error");
    } finally {
      handleLoader(false);
    }
  }

  function onRequestClose() {
    setDataPassword(INITAL_DATA_PASSWORD);
    setIsOpenModalEditPassword(false);
  }

  function enabled() {
    const required = {
      name: data.name,
      email: data.email,
      document: data.document,
      gender: data.gender,
      cep: data.cep,
      address: data.address,
      district: data.district,
      city: data.city,
      uf: data.uf,
      phone: data.phone,
    };

    return Object.values(required).some(i => !i);
  }

  return (
    <>
      <div className="bg-body-tertiary p-3">
        <div className="col-3 h4 pb-3">Informações do Perfil</div>
        <form onSubmit={handleEditProfile}>
          <div className="row mb-4">
            <div className="col">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="nameHelp"
                  placeholder="Nome do funcionario"
                  name="name"
                  value={data.name}
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
                  value={data.email}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="document"
                  aria-describedby="documentHelp"
                  placeholder="Documento"
                  name="document"
                  value={document(data.document)}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      document: document(e.target.value),
                    }))
                  }
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
                  value={phone(data.phone)}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      phone: phone(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="gender"
                  value={data.gender}
                  onChange={onChange}
                >
                  <option value="" disabled>
                    Sexo
                  </option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                </select>
              </div>
            </div>

            <div className="col">
              <Dropzone onFileUploaded={setSelectedFile} image={user?.image} />
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
                value={cep(data.cep)}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    cep: cep(e.target.value),
                  }))
                }
              />
            </div>

            <div className="col-2 mb-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={searchCep}
                disabled={!data.cep}
              >
                Consultar
              </button>
            </div>

            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="address"
                disabled
                aria-describedby="addressHelp"
                placeholder="Endereço"
                name="address"
                value={data.address}
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
                disabled
                aria-describedby="districtHelp"
                placeholder="Bairro"
                name="district"
                value={data.district}
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
                value={data.complement}
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
                disabled
                aria-describedby="cityHelp"
                placeholder="Cidade"
                name="city"
                value={data.city}
                onChange={onChange}
              />
            </div>

            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="uf"
                disabled
                aria-describedby="ufHelp"
                placeholder="Estado"
                name="uf"
                value={data.uf}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsOpenModalEditPassword(true)}
              >
                Editar Senha
              </button>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary me-3"
                disabled={enabled()}
              >
                Editar perfil
              </button>
              <button
                type="button"
                className="btn btn-danger"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* MODAL DE EDITAR SENHA */}
      <Modal
        isOpen={isOpenModalEditPassword}
        onRequestClose={onRequestClose}
        title={"Editar Senha"}
      >
        <form onSubmit={changePassword}>
          <div className="row justify-content-center">
            <div className="col-5">
              <div className="align-self-center mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordAntiga"
                  aria-describedby="passwordAntigaHelp"
                  placeholder="Senha atual"
                  name="oldPassword"
                  value={dataPassword.oldPassword}
                  onChange={onChangePassword}
                />
              </div>
              <div className=" mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordNova"
                  aria-describedby="passwordNovaHelp"
                  placeholder="Nova senha"
                  name="password"
                  value={dataPassword.password}
                  onChange={onChangePassword}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirmarSenha"
                  aria-describedby="passwordConfirmarSenhaHelp"
                  placeholder="Confirmar nova senha"
                  name="confirmPassword"
                  value={dataPassword.confirmPassword}
                  onChange={onChangePassword}
                />
              </div>

              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-primary w-100">
                    Atualizar senha
                  </button>
                </div>
                <div className="col">
                  <button type="button" className="btn btn-danger w-100" onClick={onRequestClose}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
