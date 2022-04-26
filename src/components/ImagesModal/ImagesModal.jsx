import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';

const modal = document.querySelector('#modal');

export default function ImagesModal({ imagesModal, onClose }) {
    useEffect(() => {
        window.addEventListener('keydown', keyDown);
    }, [imagesModal]);

    const keyDown = event => {
        if (event.code === 'Escape') {
            window.removeEventListener('keydown', keyDown);
            onClose();
        }
    };

    const bgClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    return createPortal(
        <div className="Overlay" onClick={bgClick}>
            <div className="Modal">
                <img src={imagesModal} alt="images" />
            </div>
        </div>,
        modal,
    );
}
