import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { useState } from 'react';

export const App = () => {
  const [searchedPhrase, setSearchedPhrase] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = query => {
    setSearchedPhrase(query);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    document.addEventListener('keydown', handleKeyDown);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      handleModalClose();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery onClick={handleImageClick} query={searchedPhrase} />
      {selectedImage && (
        <Modal image={selectedImage} onClick={handleModalClose} />
      )}
    </div>
  );
};
