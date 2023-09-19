import Dropzone from "../../componentes/Dropzone";
import { Modal } from "../../componentes/Modal";
import "./style.css";

export function Perfil() {
  return (
    <>
      <div className="bg-body-tertiary p-3">
        <form /* onSubmit={handleRegister} */>
          <div className="row mb-4">
            <div className="col">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  disabled
                  aria-describedby="nomeHelp"
                  placeholder="Nome do funcionario"
                  name="name"
                  value={"Diana"}
                  // onChange={onChange}
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
                  value={"diana@email.com"}
                  // onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="documento"
                  disabled
                  aria-describedby="documentoHelp"
                  placeholder="Documento (CPF)"
                  name="document"
                  value={"123.123.123-00"}
                  // onChange={e => setRegister(prev => ({ ...prev, document: document(e.target.value) }))}
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
                  value={"(11) 99999-9999"}
                  // onChange={e => setRegister(prev => ({ ...prev, phone: phone(e.target.value) }))}
                />
              </div>

              <div className="">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="gender"
                  disabled
                  value={"Feminina"}
                  // onChange={onChange}
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
                value={"00000-000"}
                // onChange={e => setRegister(prev => ({ ...prev, cep: cep(e.target.value) }))}
              />
            </div>

            <div className="col-2 mb-3">
              <button
                type="button"
                className="btn btn-primary w-100" /* onClick={searchCep} disabled={!register.cep} */
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
                value={"Av. Lins"}
                // onChange={onChange}
                // ref={addressRef}
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
                value={"Vila Mariana"}
                // onChange={onChange}
                // ref={districtRef}
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
                value={""}
                // onChange={onChange}
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
                value={"São Paulo"}
                // onChange={onChange}
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
                value={"SP"}
                // onChange={onChange}
              />
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Editar Senha
              </button>
            </div>
            <div className="col d-flex justify-content-end">
              <button type="submit" className="btn btn-primary me-3">
                Editar
              </button>
              <button
                type="submit"
                className="btn btn-danger" /* onClick={searchCep} disabled={!register.cep} */
                disabled
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* MODAL DE EDITAR SENHA */}
      <Modal
        isOpen={false}
        /*  onRequestClose={() => setIsOpenModalRegister(false)} */ title={
          "Editar Senha"
        }
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
