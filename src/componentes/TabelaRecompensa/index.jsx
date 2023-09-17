import { Toggle } from "../Toggle";

export function TabelaRecompensa(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{props.rarity}</td>
      <td>
        <Toggle checked />
      </td>
      <td>
        <img src="./info-circle.svg" alt="" className="pe-2" />
      </td>
    </tr>
  );
}
