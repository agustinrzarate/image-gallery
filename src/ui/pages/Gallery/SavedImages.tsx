import { useContext, useEffect, useState } from 'react';

import { Bookmark } from 'lucide-react';

import { GalleryContext } from './context/GalleryProvider';
import { Card, CardFooter, CardHeader, CardTitle } from '@/ui/components/Card/Card';
import { Button } from '@/ui/components/Button/Button';
import Rectangle from '@/app/assets/Rectangle.svg';
import cn from '@/app/lib/utils';
import { getItemLocalStorage } from '@/app/localStorage/getItem';
import { KeysLocalStorage } from '@/app/localStorage/keys';
import { PhotoStore } from '@/modules/Photo/infrastructure/photoStore';

import { toast } from '@/ui/components/Toast/use-toast';
import { ToastAction } from '@/ui/components/Toast/toast';

function SavedImages() {
  const { deleteSavedPhoto, addSavedPhoto } = useContext(GalleryContext);
  const savedPhotosJson = getItemLocalStorage(KeysLocalStorage.savedPhotos);
  const savedPhotos = JSON.parse(savedPhotosJson || '[]') as PhotoStore[];

  return (
    <div className={cn('flex flex-col items-center space-y-5 h-full', savedPhotos.length === 0 && 'justify-center')}>
      {savedPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedPhotos?.map((item) => (
            <Card key={Math.random()} className="max-w-xs hover:ring-1">
              <CardHeader className="relative">
                <div className="absolute right-8 top-5">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => {
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
                    }}
                  >
                    <Bookmark className={cn('fill-primary text-primary')} />
                  </Button>
                </div>
                <div className="w-full h-44">
                  <img
                    src={item.download_url ? item.download_url : Rectangle}
                    alt={`of ${item.author}`}
                    className=" rounded-xl w-full min-w-[150px] h-full object-cover"
                  />
                </div>
                <div className="relative">
                  <CardTitle className="absolute -top-7 bg-background p-2 rounded-md border left-1/3">
                    {item.author}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-center border-t">
                <Button className="mt-4">More info</Button>
              </CardFooter>
            </Card>
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
