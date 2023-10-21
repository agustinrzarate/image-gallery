import { ThemeProvider } from '@ui/components/ThemeProvider/ThemeProvider';
import { Button } from '@ui/components/Button/Button';

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
