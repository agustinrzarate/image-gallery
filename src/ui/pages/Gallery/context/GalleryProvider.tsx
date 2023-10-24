import { createContext, PropsWithChildren, useMemo } from 'react';
import PhotoRepository from '@/modules/Photo/domain/PhotoRepository';
import getPhotosRepository from '@/modules/Photo/application/getPhotos';
import getInfoRepository from '@/modules/Photo/application/getInfo';
import useGallery, { PhotoStore } from '@/modules/Photo/infrastructure/photoStore';
import Photo from '@/modules/Photo/domain/Photo';
import { getItemLocalStorage } from '@/app/localStorage/getItem';
import { KeysLocalStorage } from '@/app/localStorage/keys';

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
      return repository.addSavedPhoto(photo);
    }

    function deleteSavedPhoto(id: string) {
      deletePhoto(id);
      return repository.deleteSavedPhoto(id);
    }

    return { getPhotos, getInfo, storePhotos, getStoredPhotos, addSavedPhoto, deleteSavedPhoto };
  }, [repository, updateStatePhotos, statePhotos, savePhoto, deletePhoto]);

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}
