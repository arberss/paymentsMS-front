import { Loader as MantineLoader, MantineNumberSize } from '@mantine/core';
import './loader.scss';

interface LoaderProps {
  size?: MantineNumberSize;
  backdrop?: boolean;
  position?: 'absolute' | 'relative' | 'static';
}

const Loader = ({ size, backdrop = false, position="static" }: LoaderProps) => {
  return (
    <div className={`loader ${position ?? ''}`}>
      <MantineLoader size={size} />
      {backdrop && <div className='loader__backdrop'></div>}
    </div>
  );
};

export default Loader;
