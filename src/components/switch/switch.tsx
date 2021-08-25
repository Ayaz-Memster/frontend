import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import cx from 'classnames';

export interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  alt: string;
}

export const Switch = ({ onChange, value, alt }: SwitchProps) => {
  return (
    <HeadlessSwitch
      checked={value}
      onChange={onChange}
      className={cx(
        value ? 'bg-blue-400' : 'bg-gray-300',
        'relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none focus:ring'
      )}
      type="button"
    >
      <span className="sr-only">{alt}</span>
      <span
        aria-hidden="true"
        className={cx(
          value ? 'translate-x-6' : 'translate-x-1',
          'inline-block w-4 h-4 transform bg-white rounded-full transition-transform'
        )}
      />
    </HeadlessSwitch>
  );
};
