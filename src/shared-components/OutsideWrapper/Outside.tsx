import { useRef } from 'react';
import { useOutsideAlerter } from './useOutside';

interface OutsideProps {
  onOutsideClick?: () => void;
  children: JSX.Element;
}

function Outside({ onOutsideClick, children }: OutsideProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onOutsideClick);

  return <div ref={wrapperRef}>{children}</div>;
}

export default Outside;
