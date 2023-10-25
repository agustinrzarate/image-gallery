import { useNavigate } from 'react-router';

import { Bookmark } from 'lucide-react';
import cn from '@/app/lib/utils';

import Rectangle from '@/app/assets/Rectangle.svg';

import { PhotoStore } from '@/modules/Photo/infrastructure/photoStore';
import { Button } from '@/ui/components/Button/Button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/ui/components/Card/Card';

interface ICardGalleryProps {
  item: PhotoStore;
  onClickBookmark: (item: PhotoStore) => void;
}

function CardGallery({ item, onClickBookmark }: ICardGalleryProps) {
  const navigate = useNavigate();
  return (
    <Card key={Math.random()} className="max-w-xs hover:ring-1">
      <CardHeader className="relative">
        <div className="absolute right-8 top-5">
          <Button
            size="icon"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClickBookmark(item);
            }}
          >
            <Bookmark className={cn('text-primary', item.saved && 'fill-primary')} />
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
          <CardTitle className="absolute -top-7 bg-background p-2 rounded-md border left-1/3">{item.author}</CardTitle>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-center border-t">
        <Button
          className="mt-4"
          onClick={() => {
            navigate(`/gallery/image/${item.id}`);
          }}
        >
          More info
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardGallery;
