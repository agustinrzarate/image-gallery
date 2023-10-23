import PhotoRepository from '../domain/PhotoRepository';

export default function getPhotos(repository: PhotoRepository, page: number, limit: number) {
  return repository.getPhotos(page, limit);
}
