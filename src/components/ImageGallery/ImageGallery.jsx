import React, { useState } from 'react';
import ImagesGalleryItem from '../ImagesGalleryItem';
import ImagesModal from '../ImagesModal';

export default function ImageGallery({images}) {
    const [imagesModal, setImagesModal] = useState('');
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal); 
    };

    const modalClick = largeImageURL => {
        setImagesModal(largeImageURL);
        toggleModal();
    };

    return (
        <>
            <ul className="ImageGallery">
                {images.map(({ id, previewURL, largeImageURL }) => (
                    <ImagesGalleryItem
                        key={id}
                        previewURL={previewURL}
                        onClick={() => {
                            modalClick(largeImageURL);
                        }}
                    />
                ))}
            </ul>
            {showModal && (
                <ImagesModal imagesModal={imagesModal} onClose={toggleModal} />
            )}
        </>
    );
};
