import { createContext, PropsWithChildren, useMemo } from 'react';
import PhotoRepository from '@/modules/Photo/domain/PhotoRepository';
import getPhotosRepository from '@/modules/Photo/application/getPhotos';
import getInfoRepository from '@/modules/Photo/application/getInfo';

export const GalleryContext = createContext({} as PhotoRepository);

export default function GalleryProvider({ repository, children }: PropsWithChildren<{ repository: PhotoRepository }>) {
  const value = useMemo(() => {
    function getPhotos(page: number, limit: number) {
      return getPhotosRepository(repository, page, limit);
    }

    function getInfo(id: string) {
      return getInfoRepository(repository, id);
    }

    return { getPhotos, getInfo };
  }, [repository]);

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}
