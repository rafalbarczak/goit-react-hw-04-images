import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { getPhotos } from 'components/api';

export const ImageGallery = ({ query, onClick }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [prevQuery, setPrevQuery] = useState('');

  const fetchImages = async () => {
    setIsLoading(true);
    if (query !== prevQuery) {
      setImages([]);
      if (page === 1) fetchData();
      setPage(1);
      setPrevQuery(query);
      return;
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      const images = await getPhotos(query, page);
      if (images.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setIsLoading(false);
      } else {
        setImages(prevImages => [...prevImages, ...images.hits]);
        setIsLoading(false);

        if (page === 1) {
          Notiflix.Notify.success(
            `Horray! We found ${images.totalHits} images.`
          );
        }

        if (images.totalHits < page * 40) {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong while fetching images.'
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (query !== '') {
      fetchImages();
      setPrevQuery(query);
    }
    // eslint-disable-next-line
  }, [query, page]);

  const handleButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <ul className={css.gallery}>
        {images.map(image => (
          <ImageGalleryItem
            image={image}
            onClick={() => onClick(image)}
            key={image.id}
          />
        ))}
      </ul>
      {images.length > 0 && <Button onClick={handleButton} />}
    </div>
  );
};
