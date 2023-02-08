import { FC, useState } from 'react';
import './Modal.scss';

type ModalProps = {
    children?: any;
    onClick: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClick }) => {
    // const [visible, setVisible] = useState<boolean>(true);
    //
    // const closeOnBackgroundCLick = () => {
    //     setVisible(false);
    // };

    return (
        <div className="modal-background" onClick={ onClick }><div className="modal-ui">{ children }</div></div>
    );
}

export default Modal;
