import { Toggle } from "../Toggle";

export function Tabela(props) {
  return (
    <tr>
      <td>{props.nome}</td>
      <td>{props.doc}</td>
      <td>{props.email}</td>
      <td>
        <Toggle checked />
      </td>
      <td>
        <img src="./info-circle.svg" alt="" className="pe-2" />
      </td>
    </tr>
  );
}
