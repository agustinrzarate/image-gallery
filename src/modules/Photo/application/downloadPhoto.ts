import PhotoRepository from '../domain/PhotoRepository';

function downloadPhoto(repository: PhotoRepository, url: string, name: string) {
  return repository.downloadPhoto(url, name);
}

export default downloadPhoto;
