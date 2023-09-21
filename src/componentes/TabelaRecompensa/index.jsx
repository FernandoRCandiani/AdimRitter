import { Toggle } from "../Toggle";

import { showRarity, showTypePrize } from "../../util";

export function TabelaRecompensa(props) {

  
  return (
    <tr>
      <td>{props.name}</td>
      <td>{showTypePrize(props.type)}</td>
      <td>{showRarity(props.rarity)}</td>
      <td>
        <Toggle checked={props.active} />
      </td>
      <td>
        <img src="./info-circle.svg" alt="" className="pe-2" onClick={props.info} />
      </td>
    </tr>
  );
}
