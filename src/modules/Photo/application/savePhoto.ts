import Photo from '../domain/Photo';
import PhotoRepository from '../domain/PhotoRepository';

function savePhoto(repository: PhotoRepository, photo: Photo) {
  return repository.addSavedPhoto(photo);
}

export default savePhoto;
