import './style.min.css';

export function Dash(props) {
  return (
    <div className="dash">
      <div className="dash-card">
        <div className={["dash-card__header", props.filter ? "justify-content-evenly" : "justify-content-center"].join(" ")}>
          <h3 className="title">
            {props.title}
          </h3>

          {props.filter && (
            <label className="filter">
              <span className="filter-label">Filtrar por</span>
              <select className="form-select"
                value={props.filter} onChange={e => props.setFilter(e.target.value)}>
                <option value="name">Funcionários</option>
                <option value="company">Empresas</option>
              </select>
            </label>
          )}
        </div>

        <div className="dash-card__body">
          <div className="dash-card__graph">
            {props.children}
          </div>
        </div>

        {/* <div className="dash-card__footer">
          <button className="btn btn-primary">
            Exportar relatório
          </button>
        </div> */}
      </div>
    </div>
  );
}