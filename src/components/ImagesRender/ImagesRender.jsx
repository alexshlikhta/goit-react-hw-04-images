import React, { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery';
import ImagesAPI from '../../services/Images_api';
import ImagesMoreButton from '../ImagesMoreButton';
import ImagesLoader from '../ImagesLoader/ImagesLoader';
import ImagesNotFound from '../ImagesNotFound';
import ImagesDefaults from '../ImagesDefaults/ImagesDefaults';

export default function ImagesRender({imageQuery}) {
    const [error, setError] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [imagesArr, setImagesArr] = useState([]);
    const [status, setStatus] = useState('idle');
    const [page, setPage] = useState(1);

    useEffect(() => {
        if(!imageQuery) {
            return;
        }
        ImagesAPI(imageQuery, page)
        .then(query => {
            if (query.hits.length === 0) {
                return Promise.reject(new Error(`Results for: ${imageQuery}  not found.`));
            } else {
                setImagesArr([...imagesArr, ...query.hits]);
                setStatus('resolved');
                setLoadMore(true);
                scrollTo();

                if (query.hits.length < 12) {
                    setLoadMore(false);
                }
            }
        })
        .catch(error => {
            setStatus('rejected');
            setError(error.message);
        });
    }, [imageQuery, page]);

    useEffect(() => {
        cleanImages();
    }, [imageQuery]);

    const scrollTo = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
            block: 'end',
        });
    };

    const cleanImages = () => {
        setImagesArr([]);
        setPage(1);
    };

    const loadMoreImages = () => {
        setPage(page => page + 1);
        scrollTo();
    };

    if (status === 'idle') {
        return <ImagesDefaults />;
    }

    if (status === 'pending') {
        return (
            <>
                <ImagesLoader />
                <ImageGallery images={imagesArr} />
            </>
        );
    }

    if (status === 'rejected') {
        return <ImagesNotFound error={error} />;
    }

    if (status === 'resolved') {
        return (
            <>
                <ImageGallery images={imagesArr} />
                <ImagesMoreButton onClick={loadMoreImages} loadMore={loadMore}></ImagesMoreButton>
            </>
        );
    }
}
