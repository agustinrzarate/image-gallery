import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from '@ui/components/ThemeProvider/ThemeProvider';
import MaxWidthWrapper from '@/ui/components/MaxWidthWrapper/MaxWidthWrapper';
import { Toaster } from '@/ui/components/Toast/toaster';
import Router from './router/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <MaxWidthWrapper>
          <Toaster />
          <Router />
        </MaxWidthWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
