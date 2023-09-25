import { Toggle } from "../Toggle";

import { useGlobal } from "../../contexts/Global";
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { showRarity, showTypePrize } from "../../util";

export function TabelaRecompensa(props) {
  const { handleLoader } = useGlobal();

  async function toggleActive(id) {
    handleLoader(true);

    await api.get(`/prizes/active/${id}`);

    await queryClient.getQueryCache().findAll("prizes")[0].fetch();

    handleLoader(false);
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td>{showTypePrize(props.type)}</td>
      <td>{showRarity(props.rarity)}</td>
      <td>
        <Toggle checked={props.active} onClick={() => toggleActive(props.id)} />
      </td>
      <td>
        <img src="./info-circle.svg" alt="" className="pe-2" onClick={props.info} />
      </td>
    </tr>
  );
}
