import { useContext } from 'react';
import { ArrowLeft, Bookmark, Download } from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router';

import useGallery from '@/modules/Photo/infrastructure/photoStore';
import { Card, CardFooter, CardHeader, CardTitle } from '@/ui/components/Card/Card';
import { Button } from '@/ui/components/Button/Button';
import cn from '@/app/lib/utils';
import { GalleryContext } from './context/GalleryProvider';
import { toast } from '@/ui/components/Toast/use-toast';
import { ToastAction } from '@/ui/components/Toast/toast';
import Rectangle from '@/app/assets/Rectangle.svg';

function ImageDetail() {
  const { addSavedPhoto, deleteSavedPhoto, downloadPhoto } = useContext(GalleryContext);
  const storedImages = useGallery((state) => state.storedPhotos);
  const { id } = useParams();
  const item = storedImages.find((photo) => photo.id === id);
  const navigate = useNavigate();
  if (!item) {
    return <Navigate to="/gallery" />;
  }

  const onClick = () => {
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
    <div className="flex h-full justify-center items-center w-full relative space-y-14 flex-col">
      <Button onClick={() => navigate(-1)} variant="ghost" className="absolute top-10 -left-1" size="icon">
        <ArrowLeft className="text-primary" />
      </Button>
      <h3 className="text-2xl text-left font-semibold text-muted-foreground">Detail image</h3>

      <Card key={Math.random()} className="md:w-[460px] lg:w-[600px] xl:w-[800px]">
        <CardHeader className="relative">
          <div className="absolute right-8 top-5">
            <Button size="icon" variant="secondary" onClick={onClick}>
              <Bookmark className={cn('text-primary', item.saved && 'fill-primary')} />
            </Button>
          </div>
          <div className="w-full xl:h-[600px]">
            <img
              src={item.download_url ? item.download_url : Rectangle}
              alt={`of ${item.author}`}
              className=" rounded-xl w-full min-w-[150px] h-full object-cover"
            />
          </div>
          <div className="relative">
            <CardTitle className="absolute -top-7 bg-background p-2 rounded-md border left-1/3 xl:left-[42%]">
              {item.author}
            </CardTitle>
          </div>
        </CardHeader>
        <CardFooter className="flex border-t pt-3 justify-between items-center">
          <div>
            <div className=" font-semibold text-muted-foreground">Height: {item.height}px</div>
            <div className=" font-semibold text-muted-foreground">Width: {item.width}px</div>
          </div>
          <Button
            onClick={() => {
              downloadPhoto(item.download_url, `${item.author}-${item.id}`);
            }}
          >
            <Download width={16} className="mr-1" /> Download
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ImageDetail;
