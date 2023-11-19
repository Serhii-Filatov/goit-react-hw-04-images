import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt, openModal }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemPicture}
        src={src}
        alt={alt}
        onClick={() => openModal({ largeImageURL: src, tags: alt })}
      />
    </li>
  );
};
