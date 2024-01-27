import Image from 'next/image';
import React, { useId } from 'react';
import Select, { StylesConfig } from 'react-select';

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#f9fafb',
    paddingTop: '1px',
    paddingBottom: '1px',
    fontSize: '14px',
    width: '100%',
    boxShadow: state.isFocused ? '#eab4b4' : 'none',
    border: state.isFocused
      ? '1px solid #FF7425'
      : '1px solid rgba(0, 0, 0, 0.25)',
    '&:hover': {
      border: state.isFocused
        ? '1px solid #FF7425'
        : '1px solid rgba(0, 0, 0, 0.25)',
    },
    minWidth: '71px',
    outline: state.isFocused ? '' : 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#eab4b4' : 'white',
    color: state.isFocused ? 'black' : 'black',
    cursor: 'pointer',
    outline: 'none',
  }),
};

interface Option {
  value: string;
  label: string;
  image?: string;
  isDisabled?: boolean;
}

interface propTypes {
  label: string;
  placeHolder: string;
  options: Option[];
  error?: any;
  onChange?: (e: any) => void;
  value?: any;
  isDisabled: boolean;
}

const ImageSelectBox = React.forwardRef<any, propTypes>(
  (
    {
      label,
      placeHolder,
      options,
      error,
      onChange,
      value,
      isDisabled,
      ...props
    }: propTypes,
    ref: any
  ) => {
    return (
      <div className='w-full'>
        <p className='mb-2 font-medium text-sm md:text-base text-mainTextColor 2xl:text-lg hidden'>
          {label}
        </p>
        <Select
          {...props}
          ref={ref}
          instanceId={useId()}
          isDisabled={isDisabled}
          options={options}
          placeholder={placeHolder}
          styles={customStyles}
          onChange={onChange}
          value={value}
          formatOptionLabel={(options: any) => (
            <div className='country-option flex items-center gap-2'>
              {options.image && (
                <Image
                  height={28}
                  width={28}
                  className='h-7 w-7'
                  src={options.image}
                  priority
                  alt='option'
                />
              )}
              <span className='text-mainTextColor text-sm'>
                {options.label}
              </span>
            </div>
          )}
        />

        {error && <p className='text-red-500 text-sm mt-3'>{error}</p>}
      </div>
    );
  }
);

export default ImageSelectBox;
