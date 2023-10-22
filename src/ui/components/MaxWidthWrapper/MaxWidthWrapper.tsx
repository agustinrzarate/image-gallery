import { ReactNode } from 'react';
import cn from '../../../app/lib/utils';

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
  return <div className={cn('max-w-screen-2xl mx-auto w-full px-2.5 lg:px-20 relative', className)}>{children}</div>;
};

MaxWidthWrapper.defaultProps = {
  className: '',
};

export default MaxWidthWrapper;
