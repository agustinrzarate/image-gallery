import PhotoRepository from '../domain/PhotoRepository';

export default function getInfo(repository: PhotoRepository, id: string) {
  return repository.getInfo(id);
}
