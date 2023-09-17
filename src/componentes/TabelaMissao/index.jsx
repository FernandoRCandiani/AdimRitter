export function TabelaMissao(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.startsAt}</td>
      <td>{props.category}</td>
      <td>
        <img src="./info-circle.svg" alt="" className="pe-2" />
      </td>
    </tr>
  );
}
