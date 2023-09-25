import { showCategoryName } from "../../util";

import { format, parseISO } from "date-fns";

export function TabelaMissao(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{format(parseISO(String(props.startsAt)), "dd'/'MM'/'yyyy")}</td>
      <td>{showCategoryName(props.category?.name)}</td>
      <td>
        <img src="./info-circle.svg" alt="" className="pe-2" onClick={props.info} />
      </td>
    </tr>
  );
}
