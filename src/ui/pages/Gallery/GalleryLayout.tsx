import { Outlet } from 'react-router';

import photoRepository from '@/modules/Photo/infrastructure/photoRepository';
import GalleryProvider from './context/GalleryProvider';

function GalleryLayout() {
  const repository = photoRepository();
  return (
    <GalleryProvider repository={repository}>
      <Outlet />
    </GalleryProvider>
  );
}

export default GalleryLayout;
