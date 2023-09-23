import React from "react";

export function TabelaCertificado(props) {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.quiz.name}</td>
      <td>
        <img
          src="./info-circle.svg"
          alt=""
          className="pe-2"
          onClick={props.info}
        />
      </td>
    </tr>
  );
}
