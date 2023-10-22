import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { BookmarkIcon, ImageIcon, ExitIcon, Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import ImageGallery from '@/app/assets/ImageGallery.svg';
import { Button } from '../Button/Button';

function Sidebar() {
  return (
    <div className="w-60 border-r border-border h-screen bg-background">
      <div className="pt-10 md:pt-0  space-y-4 relative h-full">
        <div className="w-full py-4 md:pb-4  border-b border-t md:border-t-0">
          <img src={ImageGallery} alt="logo" className="mx-auto w-48" />
        </div>
        <div className="flex flex-col w-48 mx-auto">
          <Button variant="ghost" className="justify-start">
            <ImageIcon className="mr-3" />
            Gallery
          </Button>
          <Button variant="ghost" className="justify-start">
            <BookmarkIcon className="mr-3" /> Bookmarks
          </Button>
        </div>
        <div className="flex flex-col w-48 mx-auto absolute bottom-6 left-6">
          <Button variant="ghost" className="justify-start">
            <ExitIcon className="mr-3" /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative max-h-screen flex mt-3">
      <div
        ref={modalRef}
        className={clsx(
          isSidebarOpen ? 'translate-x-0  ' : '-translate-x-[110%]',
          ' md:translate-x-0 transition-transform duration-300 ease-in-out left-0 h-screen fixed top-0 bg-background z-10'
        )}
      >
        <Sidebar />
        <Button
          className="absolute top-0 right-1 md:hidden"
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(false)}
        >
          <Cross2Icon />
        </Button>
      </div>

      <div className={clsx(isSidebarOpen && 'blur-sm', ' md:ml-60 w-full md:blur-0')}>
        <div className="md:hidden">
          <Button onClick={() => setIsSidebarOpen(true)} size="icon">
            <HamburgerMenuIcon />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default SidebarLayout;
