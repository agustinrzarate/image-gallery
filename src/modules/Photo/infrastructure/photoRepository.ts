import { KeysLocalStorage } from '@/app/localStorage/keys';
import Photo from '../domain/Photo';
import IPhotoRepository from '../domain/PhotoRepository';
import { getItemLocalStorage } from '@/app/localStorage/getItem';
import { setItemLocalStorage } from '@/app/localStorage/setItem';

const url = 'https://picsum.photos/';

export default function photoRepository(): IPhotoRepository {
  return {
    getPhotos: async function getPhotos(page: number, limit: number) {
      try {
        const response = await fetch(`${url}/v2/list?page=${page}&limit=${limit}`, {
          method: 'GET',
        });
        const photos = await response.json();
        return photos as Photo[];
      } catch (error) {
        throw new Error((error as Response).statusText);
      }
    },
    getInfo: async function getInfo(id: string) {
      try {
        const response = await fetch(`${url}/id/${id}/info`, {
          method: 'GET',
        });
        const photo = await response.json();
        return photo as Photo;
      } catch (error) {
        throw new Error((error as Response).statusText);
      }
    },
    addSavedPhoto: function addSavedPhoto(photo: Photo) {
      const savedPhotos = getItemLocalStorage(KeysLocalStorage.savedPhotos);
      const photos = JSON.parse(savedPhotos || '[]');
      photos.push({ ...photo, saved: true });
      setItemLocalStorage(KeysLocalStorage.savedPhotos, photos);
    },
    deleteSavedPhoto: function deleteSavedPhoto(id: string) {
      const savedPhotos = getItemLocalStorage(KeysLocalStorage.savedPhotos);
      const photos = JSON.parse(savedPhotos || '[]');
      const newPhotos = photos.filter((photo: Photo) => photo.id !== id);
      setItemLocalStorage(KeysLocalStorage.savedPhotos, newPhotos);
    },
    downloadPhoto: async function downloadPhoto(url_download: string, name: string) {
      const response = await fetch(url_download);

      const blobImage = await response.blob();

      const href = URL.createObjectURL(blobImage);

      const anchorElement = document.createElement('a');
      anchorElement.href = href;
      anchorElement.download = name;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    },
  };
}
