import { Button } from '@ui/components/Button/Button';
import { ThemeProvider } from '@/ui/components/ThemeProvider/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className=" ">
        <Button>Hi</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
