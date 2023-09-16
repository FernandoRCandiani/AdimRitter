import Dropzone from "../../componentes/Dropzone";
import { Modal } from "../../componentes/Modal";

import "./style.css";

export function Recompensa() {
  return (
    <>
      <div className="bg-body-tertiary shadow m-0 p-3"></div>

      <Modal isOpen={true} onRequestClose={() => {}} title={"Criar Recompensa"}>
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
    </>
  );
}
