import Photo from '../domain/Photo';
import IPhotoRepository from '../domain/PhotoRepository';

const url = 'https://picsum.photos/';

export default function photoRepository(): IPhotoRepository {
  return {
    getPhotos: async function getPhotos(page: number, limit: number) {
      try {
        const response = await fetch(`${url}/v2/list?page=${page}&limit=${limit}`, {
          method: 'GET',
        });
        const photos = await response.json();
        console.log('photos: ', photos);
        return photos as Photo[];
      } catch (error) {
        throw new Error((error as Response).statusText);
      }
    },
    getInfo: async function getInfo(id: string) {
      try {
        const response = await fetch(`${url}/id/${id}/info`, {
          method: 'GET',
        });
        const photo = await response.json();
        return photo as Photo;
      } catch (error) {
        throw new Error((error as Response).statusText);
      }
    },
  };
}
