import { ThemeProvider } from '@ui/components/ThemeProvider/ThemeProvider';
import MaxWidthWrapper from '@/ui/components/MaxWidthWrapper/MaxWidthWrapper';
import SignIn from '@/ui/pages/Auth/SignIn/SignIn';
import { Toaster } from '@/ui/components/Toast/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <MaxWidthWrapper>
        <Toaster />
        <SignIn />
      </MaxWidthWrapper>
    </ThemeProvider>
  );
}

export default App;
