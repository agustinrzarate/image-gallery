import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import ErrorPage from './ErrorPage/ErrorPage';
import Loader from './Loader/Loader';
import Gallery from '@/ui/pages/Gallery/Gallery';
import SidebarLayout from '@/ui/components/Sidebar/Sidebar';
import GalleryLayout from '@/ui/pages/Gallery/GalleryLayout';
import SavedImages from '@/ui/pages/Gallery/SavedImages';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { AuthProvider } from '@/ui/pages/Auth/context/AuthProvider';
import ImageDetail from '@/ui/pages/Gallery/ImageDetail';

const SignIn = lazy(() => import('@/ui/pages/Auth/SignIn/SignIn'));

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage />}>
        <Route element={<AuthProvider />}>
          <Route path="/" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<SidebarLayout />}>
              <Route element={<GalleryLayout />}>
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/saved" element={<SavedImages />} />
                <Route path="/gallery/image/:id" element={<ImageDetail />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    )
  );
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
