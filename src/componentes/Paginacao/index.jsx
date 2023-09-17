import './style.css'

export function Paginacao(props) {
  function changePage(page) {
    props.setCurrent(page);
  }

  function firstPage() {
    if (props.current === 0) return;

    props.setCurrent(0);
  }

  function lastPage() {
    if (props.current === props.totalPages - 1) return;

    props.setCurrent(props.totalPages - 1);
  }

  function range() {
    let pages = [],
      current = props.current,
      total = props.totalPages,
      cut = 5,
      start = 0,
      end = 0,
      ceil = Math.ceil(cut / 2),
      floor = Math.floor(cut / 2);

    if (!total) {
      start = 0;
      end = 1;
    } else if (total < cut) {
      start = 0;
      end = total;
    } else if (current >= 0 && current <= ceil) {
      start = 0;
      end = cut;
    } else if ((current + ceil) >= total) {
      start = total - cut;
      end = total;
    } else {
      start = current - floor;
      end = current + ceil;
    }

    for (let i = start; i < end; i++) {
      pages.push(i);
    }

    return pages;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination m-0">
        <li className={["page-item", props.current <= 0 ? "disabled" : ""].join(" ")} onClick={firstPage}>
          <div className="page-link" aria-label="Primeira página">
            Primeira
          </div>
        </li>
        {range().map((n, i) => (
          <li className={["page-item", props.current === n ? "active" : ""].join(" ")} key={i} onClick={() => changePage(n)} aria-current={props.current === n ? "page" : "false"}>
            <div className="page-link">
              {n + 1}
            </div>
          </li>
        ))}
        <li className={["page-item", !Boolean(props.totalPages) || props.current + 1 >= props.totalPages ? "disabled" : ""].join(" ")} onClick={lastPage}>
          <div className="page-link" aria-label="Última página">
            Última
          </div>
        </li>
      </ul>
    </nav>
  );
}