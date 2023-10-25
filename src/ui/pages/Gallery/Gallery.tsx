import { useContext, useEffect, useState } from 'react';

import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { GalleryContext } from './context/GalleryProvider';
import { Card, CardFooter, CardHeader, CardTitle } from '@/ui/components/Card/Card';
import { Button } from '@/ui/components/Button/Button';
import Rectangle from '@/app/assets/Rectangle.svg';
import { toast } from '@/ui/components/Toast/use-toast';
import { ToastAction } from '@/ui/components/Toast/toast';
import { PhotoStore } from '@/modules/Photo/infrastructure/photoStore';
import CardGallery from './components/CardGallery';

function Gallery() {
  const { getPhotos, storePhotos, getStoredPhotos, addSavedPhoto, deleteSavedPhoto } = useContext(GalleryContext);

  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading } = useQuery({
    queryKey: ['photolist', page, limit],
    queryFn: () => getPhotos(page, limit),
  });
  useEffect(() => {
    if (data) {
      storePhotos(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onClick = (item: PhotoStore) => {
    if (item.saved) {
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
    } else {
      addSavedPhoto(item);
      toast({
        description: 'The photo was saved.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-14">
      <h3 className=" text-2xl text-left w-full font-semibold text-muted-foreground">Gallery</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {getStoredPhotos()?.length > 0
          ? getStoredPhotos()?.map((item) => (
              <Link to={`/gallery/image/${item.id}`} key={Math.random()} className=" cursor-default">
                <CardGallery key={Math.random()} item={item} onClickBookmark={onClick} />
              </Link>
            ))
          : [...Array(12).keys()].map((index) => (
              <Card key={index} className="max-w-xs hover:ring-1">
                <CardHeader>
                  <div className="w-full">
                    <img src={Rectangle} alt="skeleton" className="rounded-xl animate-pulse" />
                  </div>
                  <div className="relative">
                    <CardTitle className="absolute -top-7 bg-background p-2 rounded-md border left-1/3">
                      <div className="animate-pulse h-4 bg-background rounded-md w-16 text-center">...</div>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-center border-t">
                  <Button className="mt-4">More info</Button>
                </CardFooter>
              </Card>
            ))}
      </div>
      {getStoredPhotos().length > 0 && (
        <div>
          <Button
            className="mt-4"
            variant="secondary"
            disabled={isLoading}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {!isLoading ? 'View more' : 'Loading more...'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
