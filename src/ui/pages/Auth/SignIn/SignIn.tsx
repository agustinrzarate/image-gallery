import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/Card/Card';
import Logo from '@/app/assets/ImageGallery.svg';
import { SignInForm } from './Form/SignInForm';

function SignIn() {
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <Card className="w-[380px] pb-8">
        <CardHeader className=" space-y-7">
          <div>
            <img src={Logo} alt="Logo" />
            <CardDescription className="px-3">Create your own gallery of your favorite images!</CardDescription>
          </div>
          <CardTitle className="px-3 text-xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="px-9">
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignIn;
