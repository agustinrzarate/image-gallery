import Photo from './Photo';

interface PhotoRepository {
  getPhotos: (page: number, limit: number) => Promise<Photo[]>;
  getInfo: (id: string) => Promise<Photo>;
  addSavedPhoto: (photo: Photo) => void;
  deleteSavedPhoto: (id: string) => void;
}

export default PhotoRepository;
