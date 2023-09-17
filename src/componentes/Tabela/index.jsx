import { Toggle } from "../Toggle";

export function Tabela(props) {
  return (
    <tr>
      <td>{props.nome}</td>
      <td>{props.doc}</td>
      {props.certificado ? null : <td>{props.email}</td>}
      {props.certificado ? null : (
        <td>
          <Toggle checked />
        </td>
      )}
      <td>
        <img src="./info-circle.svg" alt="" className="pe-2" />
      </td>
    </tr>
  );
}
