import Photo from './Photo';

interface PhotoRepository {
  getPhotos: (page: number, limit: number) => Promise<Photo[]>;
  getInfo: (id: string) => Promise<Photo>;
}

export default PhotoRepository;
