export const ImageGalleryItem = ({ image, onClick }) => (
  <li className="gallery-item" onClick={onClick} key={image.id}>
    <img src={image.webformatURL} alt={image.tags} />
  </li>
);
