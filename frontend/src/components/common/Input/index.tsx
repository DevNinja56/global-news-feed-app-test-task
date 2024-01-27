import React from 'react';

interface propTypes {
  placeHolder: string;
  error?: any;
  onChange?: (e: any) => void;
  className: string;
  type?: string;
  autoComplete?: string;
  label?: string;
}

const Input = React.forwardRef<any, propTypes>(
  (
    {
      placeHolder,
      error,
      onChange,
      className,
      type,
      autoComplete,
      label,
      ...props
    }: propTypes,
    ref: any
  ) => {
    return (
      <div className='flex flex-col gap-2 w-full'>
        {label && (
          <p className='text-mainBlackColor text-xl font-semibold'>{label}</p>
        )}
        <input
          autoComplete={autoComplete}
          type={type}
          className={className}
          {...props}
          ref={ref}
          placeholder={placeHolder}
          onChange={onChange}
        />

        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
    );
  }
);

export default Input;
