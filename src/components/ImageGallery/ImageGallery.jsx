import css from './ImageGallery.module.css';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <div>
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.id}
            openModal={openModal}
          />
        ))}
      </ul>
    </div>
  );
};
