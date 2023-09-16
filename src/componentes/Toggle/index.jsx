import "./style.css";

export function Toggle(props) {
  return (
    <>
      <div
        className={["toggle", props.checked ? "checked" : ""].join(" ")}
        aria-disabled={props.disabled}
        onClick={props.onClick}
        {...props}
      >
        <div className="toggle__case">
          <span />
        </div>
        {props.children && (
          <span className="toggle__text">{props.children}</span>
        )}
      </div>
    </>
  );
}
