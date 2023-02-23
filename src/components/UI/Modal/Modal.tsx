import React, { FC } from 'react';
import './Modal.scss';

interface ModalProps {
    children?: any;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Modal: FC<ModalProps> = ({ children, onClick }) => {
    const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClick(event);
    };

    return (
        <>
            <div className="modal-background" onClick={ closeModal }></div>
            <div className="modal-ui">{ children }</div>
        </>
    );
}

export default Modal;
