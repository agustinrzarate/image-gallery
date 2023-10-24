import { create } from 'zustand';
import Photo from '../domain/Photo';

export type PhotoStore = Photo & { saved?: boolean };

const initialState: Photo[] = [];

export interface IGalleryState {
  storedPhotos: PhotoStore[];
  storePhotos: (photos: Photo[]) => void;
  savePhoto: (photo: Photo) => void;
  deleteSavedPhoto: (id: string) => void;
}

const useGallery = create<IGalleryState>((set) => ({
  storedPhotos: initialState,
  storePhotos: (photos: Photo[]) => {
    set((state) => {
      const elements = photos.filter((photo2) => !state.storedPhotos.some((photo) => photo.id === photo2.id));
      return { storedPhotos: [...state.storedPhotos, ...elements] };
    });
  },
  savePhoto: (photo: Photo) => {
    set((state) => {
      const storedPhotos = state.storedPhotos.map((storedPhoto) => {
        if (storedPhoto.id === photo.id) {
          return { ...storedPhoto, saved: true };
        }
        return storedPhoto;
      });
      return { storedPhotos };
    });
  },
  deleteSavedPhoto: (id: string) => {
    set((state) => {
      const storedPhotos = state.storedPhotos.map((storedPhoto) => {
        if (storedPhoto.id === id) {
          return { ...storedPhoto, saved: false };
        }
        return storedPhoto;
      });
      return { storedPhotos };
    });
  },
}));

export default useGallery;
