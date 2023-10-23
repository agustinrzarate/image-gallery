import { useContext, useEffect, useState } from 'react';

import { useQuery } from 'react-query';
import { Bookmark } from 'lucide-react';

import { GalleryContext } from './context/GalleryProvider';
import { Card, CardFooter, CardHeader, CardTitle } from '@/ui/components/Card/Card';
import { Button } from '@/ui/components/Button/Button';
import Rectangle from '@/app/assets/Rectangle.svg';
import Photo from '@/modules/Photo/domain/Photo';

function Gallery() {
  const { getPhotos } = useContext(GalleryContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(9);
  const { data, isLoading } = useQuery({
    queryKey: ['movements', page, limit],
    queryFn: () => getPhotos(page, limit),
  });
  const [savedData, setSavedData] = useState<Photo[]>([]);

  useEffect(() => {
    if (data) {
      setSavedData((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedData?.length > 0
          ? savedData?.map((item) => (
              <Card key={item.id} className="max-w-xs hover:ring-1">
                <CardHeader className="relative">
                  <div className="absolute right-8 top-5">
                    <Button size="icon" variant="secondary">
                      <Bookmark className="text-primary" />
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
            ))
          : [...Array(10).keys()].map((index) => (
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
      {savedData.length > 0 && (
        <div>
          <Button
            className="mt-4"
            variant="secondary"
            disabled={isLoading}
            onClick={() => {
              setLimit(limit + 9);
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
