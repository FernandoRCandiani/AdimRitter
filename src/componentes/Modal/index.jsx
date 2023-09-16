import ReactModal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai"
import './style.css'

ReactModal.setAppElement("#root")

export function Modal(props) {
  return (
    <ReactModal overlayClassName='rModal' className='rModal-content' {...props}>
      <div className="rModal-header">
        <div className="rModal-header__title h4">
          {props.title}
        </div>
        <div className="rModal-header__close">
          <button onClick={props.onRequestClose && props.onRequestClose()} ><AiOutlineCloseCircle /></button>
        </div>

      </div>
      <div className="rModal-body">

        {props.children}
      </div>
    </ReactModal>
  )
    ;
} 