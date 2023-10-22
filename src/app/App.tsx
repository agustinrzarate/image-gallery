import { ThemeProvider } from '@ui/components/ThemeProvider/ThemeProvider';
import MaxWidthWrapper from '@/ui/components/MaxWidthWrapper/MaxWidthWrapper';
import { Toaster } from '@/ui/components/Toast/toaster';
import Router from './router/router';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <MaxWidthWrapper>
        <Toaster />
        <Router />
      </MaxWidthWrapper>
    </ThemeProvider>
  );
}

export default App;
