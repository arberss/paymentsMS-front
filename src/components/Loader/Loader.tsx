import { Loader as MantineLoader, MantineNumberSize } from '@mantine/core';
import { CSSProperties } from 'react';
import './loader.scss';

interface LoaderProps {
  size?: MantineNumberSize;
  backdrop?: boolean;
  backdropStyle?: CSSProperties;
  position?: 'absolute' | 'relative' | 'static';
}

const Loader = ({
  size,
  backdrop = false,
  backdropStyle,
  position = 'static',
}: LoaderProps) => {
  return (
    <div className={`loader ${position ?? ''}`}>
      <MantineLoader size={size} />
      {backdrop && (
        <div className='loader__backdrop' style={backdropStyle}></div>
      )}
    </div>
  );
};

export default Loader;
