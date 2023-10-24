import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { BookmarkIcon, ImageIcon, ExitIcon, Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import ImageGallery from '@/app/assets/ImageGallery.svg';
import { Button } from '../Button/Button';
import cn from '@/app/lib/utils';
import { useAuth } from '@/ui/pages/Auth/context/AuthProvider';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  return (
    <div className="w-60 border-r border-border h-screen bg-background">
      <div className="pt-10 md:pt-0  space-y-4 relative h-full">
        <div className="w-full py-4 md:pb-4  border-b border-t md:border-t-0">
          <img src={ImageGallery} alt="logo" className="mx-auto w-48" />
        </div>
        <div className="flex flex-col w-48 mx-auto">
          <Button
            variant="ghost"
            className={cn('justify-start', location.pathname === '/gallery' && 'text-primary font-bold')}
            onClick={() => navigate('/gallery')}
          >
            <ImageIcon className="mr-3" />
            Gallery
          </Button>
          <Button
            onClick={() => navigate('/gallery/saved')}
            variant="ghost"
            className={cn('justify-start', location.pathname === '/gallery/saved' && 'text-primary font-bold')}
          >
            <BookmarkIcon className="mr-3" /> Saved images
          </Button>
        </div>
        <div className="flex flex-col w-48 mx-auto absolute bottom-6 left-6">
          <Button variant="ghost" className="justify-start" onClick={logout}>
            <ExitIcon className="mr-3" /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

function SidebarLayout() {
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
    <div className="relative max-h-screen flex">
      <div
        ref={modalRef}
        className={cn(
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

      <div className={cn(isSidebarOpen && 'blur-sm pointer-events-none', ' md:ml-60 w-full md:blur-0 h-screen')}>
        <div className="md:hidden">
          <Button onClick={() => setIsSidebarOpen(true)} size="icon">
            <HamburgerMenuIcon />
          </Button>
        </div>
        <div className="p-9 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
