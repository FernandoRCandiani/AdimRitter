import { Toggle } from "../Toggle";

import { useGlobal } from '../../contexts/Global';
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

export function Tabela(props) {
  const { handleLoader } = useGlobal();

  async function changeStatus() {
    handleLoader(true);

    const status = props.deletedAt ? true : false;

    try {
      await api.delete(`/users/${props.id}?status=${status}`);

      queryClient.refetchQueries();
    } catch (error) {
    } finally {
      handleLoader(false);
    }
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.document}</td>
      <td>{props.email}</td>
      <td>
        <Toggle onClick={changeStatus} checked={!props.deletedAt} />
      </td>
      <td>
        <img src="./info-circle.svg" alt="" className="pe-2" onClick={props.info} />
      </td>
    </tr>
  );
}
