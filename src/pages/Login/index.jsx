export function Login() {
  return (
    <div className="container">
      <div className="row justify-content-center vh-100">
        <div className="col-5 align-self-center rounded shadow bg-body-secondary p-5 ">
          <form>
            <div className="text-center pb-5">
              <img
                src="/EcoVille.png"
                className="rounded h-50 w-50"
                alt="Ritter Humboldt"
              />
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Senha</label>
            </div>
            <div className="row align-items-end pt-3">
              <div className="col">
                <a
                  href="#"
                  className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                >
                  Esqueceu seu acesso?
                </a>
              </div>

              <div className="col text-end">
                <button type="submit" className="btn btn-primary w-50" href="">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="text-center">
          <img
            src="/Logo_RitterHumboldt.png"
            className="rounded w-25"
            alt="Ritter Humboldt"
          />
        </div>
      </div>
    </div>
  );
}
