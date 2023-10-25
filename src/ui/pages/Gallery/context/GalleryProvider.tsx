import { createContext, PropsWithChildren, useMemo } from 'react';

import useGallery, { PhotoStore } from '@/modules/Photo/infrastructure/photoStore';

import { getItemLocalStorage } from '@/app/localStorage/getItem';
import { KeysLocalStorage } from '@/app/localStorage/keys';

import Photo from '@/modules/Photo/domain/Photo';

import savePhotoRepository from '@/modules/Photo/application/savePhoto';
import downloadPhotoRepository from '@/modules/Photo/application/downloadPhoto';
import deleteSavedPhotoRepository from '@/modules/Photo/application/deleteSavedPhoto';
import PhotoRepository from '@/modules/Photo/domain/PhotoRepository';
import getPhotosRepository from '@/modules/Photo/application/getPhotos';
import getInfoRepository from '@/modules/Photo/application/getInfo';

type IGalleryContext = PhotoRepository & {
  storePhotos: (photos: Photo[]) => void;
  getStoredPhotos: () => PhotoStore[];
};
export const GalleryContext = createContext({} as IGalleryContext);

export default function GalleryProvider({ repository, children }: PropsWithChildren<{ repository: PhotoRepository }>) {
  const statePhotos = useGallery((state) => state.storedPhotos);
  const updateStatePhotos = useGallery((state) => state.storePhotos);
  const savePhoto = useGallery((state) => state.savePhoto);
  const deletePhoto = useGallery((state) => state.deleteSavedPhoto);

  const value = useMemo(() => {
    function getStoredPhotos() {
      return statePhotos;
    }
    function storePhotos(photos: Photo[]) {
      updateStatePhotos(photos);
      const savedPhotos = getItemLocalStorage(KeysLocalStorage.savedPhotos);
      const savedPhotosLocalStorage = JSON.parse(savedPhotos || '[]');

      savedPhotosLocalStorage.map((photo: Photo) => {
        savePhoto(photo);
        return photo;
      });
    }

    function getPhotos(page: number, limit: number) {
      return getPhotosRepository(repository, page, limit);
    }

    function getInfo(id: string) {
      return getInfoRepository(repository, id);
    }

    function addSavedPhoto(photo: Photo) {
      savePhoto(photo);
      return savePhotoRepository(repository, photo);
    }

    function deleteSavedPhoto(id: string) {
      deletePhoto(id);
      return deleteSavedPhotoRepository(repository, id);
    }

    function downloadPhoto(url: string, name: string) {
      return downloadPhotoRepository(repository, url, name);
    }

    return { getPhotos, getInfo, storePhotos, getStoredPhotos, addSavedPhoto, deleteSavedPhoto, downloadPhoto };
  }, [repository, updateStatePhotos, statePhotos, savePhoto, deletePhoto]);

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}
