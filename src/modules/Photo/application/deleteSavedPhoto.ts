import PhotoRepository from '../domain/PhotoRepository';

function deleteSavedPhoto(repository: PhotoRepository, id: string) {
  return repository.deleteSavedPhoto(id);
}
export default deleteSavedPhoto;
