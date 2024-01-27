import Image from 'next/image';
import React from 'react';

interface propsTypes {
  padding: string;
  className: string;
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: React.ReactElement;
  icon2?: React.ReactElement;
  img?: any;
  onClick?: () => void;
}

const Button = ({
  padding,
  className,
  text,
  type,
  icon,
  icon2,
  onClick,
  img,
}: propsTypes) => {
  return (
    <button onClick={onClick} className={`${padding} ${className}`} type={type}>
      {img && <Image height={22} width={22} src={img} alt='userImg' priority />}{' '}
      {icon} {text} {icon2}
    </button>
  );
};

export default Button;
