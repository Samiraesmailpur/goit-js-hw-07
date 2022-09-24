import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

gallery.insertAdjacentHTML('beforeend', createGallery(galleryItems));

gallery.addEventListener('click', onGalleryClick);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div >
 `;
    })
    .join('');
}

function onGalleryClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  const activeImage = e.target;
  const instance = basicLightbox.create(
    `
    <div class="modal">
    <img src="${activeImage.dataset.source}" width="1000" height="700"/>
    /div>
`,

    {
      onShow: instance => {
        document.addEventListener('keydown', function onKeyDownHandler(evt) {
          let isEscape = false;
          if ('key' in evt) {
            isEscape = evt.key === 'Escape' || evt.key === 'Esc';
          }
          if (isEscape) {
            instance.close();
          }
          this.removeEventListener('keydown', onKeyDownHandler);
        });
      },
    }
  );
  instance.element().querySelector('.modal').onclick = instance.close;

  instance.show();
}
