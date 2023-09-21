import React from 'react';

export function TabelaCertificado(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.mission}</td>
      <td>
        <img src="./info-circle.svg" alt="" className="pe-2" />
      </td>
    </tr>
  );
}
