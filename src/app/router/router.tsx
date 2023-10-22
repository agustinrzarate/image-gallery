import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import ErrorPage from './ErrorPage/ErrorPage';
import Loader from './Loader/Loader';
import Gallery from '@/ui/pages/Gallery/Gallery';

const SignIn = lazy(() => import('@/ui/pages/Auth/SignIn/SignIn'));

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        <Route errorElement={<ErrorPage />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>
      </>
    )
  );
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
