import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GalleryContext } from './context/GalleryProvider';
import cn from '@/app/lib/utils';

import { getItemLocalStorage } from '@/app/localStorage/getItem';
import { KeysLocalStorage } from '@/app/localStorage/keys';
import { PhotoStore } from '@/modules/Photo/infrastructure/photoStore';

import { toast } from '@/ui/components/Toast/use-toast';
import { ToastAction } from '@/ui/components/Toast/toast';
import CardGallery from './components/CardGallery';

function SavedImages() {
  const { deleteSavedPhoto, addSavedPhoto } = useContext(GalleryContext);
  const savedPhotosJson = getItemLocalStorage(KeysLocalStorage.savedPhotos);
  const savedPhotos = JSON.parse(savedPhotosJson || '[]') as PhotoStore[];

  const onDelete = (item: PhotoStore) => {
    deleteSavedPhoto(item.id);
    toast({
      variant: 'destructive',
      title: 'Succesfully deleted',
      description: 'The photo was deleted from your saved photos.',
      action: (
        <ToastAction altText="Try again" onClick={() => addSavedPhoto(item)}>
          Undo
        </ToastAction>
      ),
    });
  };
  return (
    <div className={cn('flex flex-col items-center space-y-14 h-full', savedPhotos.length === 0 && 'justify-center')}>
      <h3 className=" text-2xl text-left w-full font-semibold text-muted-foreground">Saved images</h3>

      {savedPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedPhotos?.map((item) => (
            <Link to={`/gallery/image/${item.id}`} key={Math.random()} className=" cursor-default">
              <CardGallery item={item} onClickBookmark={onDelete} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-lg text-muted-foreground  h-full">
          You don&apos;t have any saved images yet. Go to the gallery and save your favorite images!
        </div>
      )}
    </div>
  );
}

export default SavedImages;
