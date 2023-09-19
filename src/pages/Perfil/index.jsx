import { useRef, useState } from "react";
import Dropzone from "../../componentes/Dropzone";
import { Modal } from "../../componentes/Modal";
import { useGlobal } from "../../contexts/Global";
import "./style.css";
import { api } from "../../services/api";
import { cep, document, phone } from "../../util/mask";

const INITIAL_CHANGE_DATA = {
  name: "Diana",
  email: "diana@email.com",
  document: "123.123.123-00",
  gender: "Feminina",
  cep: "00000-000",
  address: "Av. Lins",
  district: "Vila Mariana",
  complement: "",
  city: "São Paulo",
  uf: "SP",
  phone: "(11) 99999-9999",
};

export function Perfil() {
  const { handleLoader, handleMessage } = useGlobal();

  const [isOpenModalEditPassword, setIsOpenModalEditPassword] = useState(false);
  const [changeData, setChangeData] = useState(INITIAL_CHANGE_DATA);
  const [edit, setEdit] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const documentRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();
  const cepRef = useRef();
  const addressRef = useRef();
  const districtRef = useRef();
  const complementRef = useRef();
  const cityRef = useRef();
  const ufRef = useRef();
  const buttonConsultCepRef = useRef();
  const buttonSaveRef = useRef();

  function editPerfil() {
    if (!edit) {
      setEdit(true);
      nameRef.current?.removeAttribute("disabled");
      emailRef.current?.removeAttribute("disabled");
      documentRef.current?.removeAttribute("disabled");
      phoneRef.current?.removeAttribute("disabled");
      genderRef.current?.removeAttribute("disabled");
      cepRef.current?.removeAttribute("disabled");
      addressRef.current?.removeAttribute("disabled");
      districtRef.current?.removeAttribute("disabled");
      complementRef.current?.removeAttribute("disabled");
      cityRef.current?.removeAttribute("disabled");
      ufRef.current?.removeAttribute("disabled");
      buttonConsultCepRef.current?.removeAttribute("disabled");
      buttonSaveRef.current?.removeAttribute("disabled");
    } else {
      setEdit(false);
      nameRef.current?.setAttribute("disabled", "true");
      emailRef.current?.setAttribute("disabled", "true");
      documentRef.current?.setAttribute("disabled", "true");
      phoneRef.current?.setAttribute("disabled", "true");
      genderRef.current?.setAttribute("disabled", "true");
      cepRef.current?.setAttribute("disabled", "true");
      addressRef.current?.setAttribute("disabled", "true");
      districtRef.current?.setAttribute("disabled", "true");
      complementRef.current?.setAttribute("disabled", "true");
      cityRef.current?.setAttribute("disabled", "true");
      ufRef.current?.setAttribute("disabled", "true");
      buttonConsultCepRef.current?.setAttribute("disabled", "true");
      buttonSaveRef.current?.setAttribute("disabled", "true");
    }
  }

  // async function searchCep() {
  //   handleLoader(true);

  //   try {
  //     const response = await axios.get(
  //       `https://viacep.com.br/ws/${changeData.cep}/json/`
  //     );

  //     if (response.data.erro) {
  //       handleLoader(false);
  //       handleMessage("CEP inválido");
  //       return;
  //     }

  //     const { logradouro, localidade, uf, bairro } = response.data;

  //     setChangeData((prev) => ({
  //       ...prev,
  //       address: logradouro,
  //       city: localidade,
  //       district: bairro,
  //       uf,
  //     }));

  //     !logradouro
  //       ? addressRef.current?.removeAttribute("disabled")
  //       : addressRef.current?.setAttribute("disabled", "true");

  //     !bairro
  //       ? districtRef.current?.removeAttribute("disabled")
  //       : districtRef.current?.setAttribute("disabled", "true");
  //   } catch (error) {
  //     handleMessage("CEP inválido");
  //   } finally {
  //     handleLoader(false);
  //   }
  // }

  function onChange(event) {
    setChangeData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleChange(event) {
    event.preventDefault();

    // handleLoader(true);

    const formData = new FormData();

    formData.append("name", changeData.name);
    formData.append("email", changeData.email);
    formData.append("document", changeData.document);
    formData.append("gender", changeData.gender);
    formData.append("cep", changeData.cep);
    formData.append("address", changeData.address);
    formData.append("district", changeData.district);
    formData.append("complement", changeData.complement);
    formData.append("city", changeData.city);
    formData.append("uf", changeData.uf);
    formData.append("phone", changeData.phone);
    // formData.append("media", selectedFile);

    // try {
    //   await api.post("/users", formData);
    //   setFilterUser(INITIAL_FILTER);
    //   handleMessage("Usuário criado com sucesso", "success");
    //   queryClient.refetchQueries(['users', filterUser]);
    // } catch (error) {
    //   handleMessage("Erro ao criar usuário", "error");
    // } finally {
    //   handleLoader(false);
    // }
  }

  return (
    <>
      <div className="bg-body-tertiary p-3">
        <div className="col-3 h4 pb-3">Informações do Perfil</div>
        <form onSubmit={handleChange}>
          <div className="row mb-4">
            <div className="col">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  disabled
                  aria-describedby="nameHelp"
                  placeholder="Nome do funcionario"
                  name="name"
                  value={changeData.name}
                  onChange={onChange}
                  ref={nameRef}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  disabled
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  name="email"
                  value={changeData.email}
                  onChange={onChange}
                  ref={emailRef}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="document"
                  disabled
                  aria-describedby="documentHelp"
                  placeholder="Documento (CPF)"
                  name="document"
                  value={changeData.document}
                  onChange={(e) =>
                    setChangeData((prev) => ({
                      ...prev,
                      document: document(e.target.value),
                    }))
                  }
                  ref={documentRef}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  disabled
                  aria-describedby="phoneHelp"
                  placeholder="Telefone"
                  name="phone"
                  value={changeData.phone}
                  onChange={(e) =>
                    setChangeData((prev) => ({
                      ...prev,
                      phone: phone(e.target.value),
                    }))
                  }
                  ref={phoneRef}
                />
              </div>

              <div className="">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="gender"
                  disabled
                  value={changeData.gender}
                  onChange={onChange}
                  ref={genderRef}
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

            <div className="col text-center d-flex justify-content-center align-items-center">
              {/* <div className="col"> */}
              {/* <Dropzone  onFileUploaded={setSelectedFile} /> */}
              <img
                src={"/EcoVille.png"}
                className="h-auto w-25"
                alt="Foto de usuario"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4 mb-3">
              <input
                type="text"
                className="form-control"
                id="cep"
                disabled
                aria-describedby="ceplHelp"
                placeholder="CEP"
                name="cep"
                value={changeData.cep}
                onChange={(e) =>
                  setChangeData((prev) => ({
                    ...prev,
                    cep: cep(e.target.value),
                  }))
                }
                ref={cepRef}
              />
            </div>

            <div className="col-2 mb-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                // onClick={searchCep}
                // disabled={!changeData.cep}
                disabled
                ref={buttonConsultCepRef}
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
                value={changeData.address}
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
                value={changeData.district}
                onChange={onChange}
                ref={districtRef}
              />
            </div>

            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="complement"
                disabled
                aria-describedby="complementHelp"
                placeholder="Complemento"
                name="complement"
                value={changeData.complement}
                onChange={onChange}
                ref={complementRef}
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
                value={changeData.city}
                onChange={onChange}
                ref={cityRef}
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
                value={changeData.uf}
                onChange={onChange}
                ref={ufRef}
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
                type="button"
                className="btn btn-primary me-3"
                onClick={editPerfil}
              >
                {edit ? "Cancelar" : "Editar"}
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                disabled
                ref={buttonSaveRef}
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* MODAL DE EDITAR SENHA */}
      <Modal
        isOpen={isOpenModalEditPassword}
        onRequestClose={() => setIsOpenModalEditPassword(false)}
        title={"Editar Senha"}
      >
        <form>
          <div className="row justify-content-center">
            <div className="col-5">
              <div className="align-self-center mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordAntiga"
                  aria-describedby="passwordAntigaHelp"
                  placeholder="Senha Antiga"
                  name="passwordAntiga"
                />
              </div>
              <div className=" mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordNova"
                  aria-describedby="passwordNovaHelp"
                  placeholder="Senha Nova"
                  name="passwordNova"
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirmarSenha"
                  aria-describedby="passwordConfirmarSenhaHelp"
                  placeholder="Confirmar Senha Nova"
                  name="passwordConfirmarSenha"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
