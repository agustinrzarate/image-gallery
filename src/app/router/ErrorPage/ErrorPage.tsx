import { useNavigate } from 'react-router-dom';
import { Button } from '@/ui/components/Button/Button';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-14">
      <div className="text-center">
        <h1 className="text-lg font-semibold">404</h1>
        <p className="">Sorry, the address you are trying to access is not found.</p>
      </div>

      <Button onClick={() => navigate('/')}>Go to homepage</Button>
    </div>
  );
}
