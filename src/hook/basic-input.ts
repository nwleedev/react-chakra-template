import React, { useState } from 'react';

const useBasicInput = () => {
  const [value, setValue] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const temp = e.target.value;
    if (temp[temp.length - 1] === ' ') {
      return;
    }
    setValue(temp);
  };
  const clear = () => setValue('');
  return { value, onChange, clear };
};

export { useBasicInput };
