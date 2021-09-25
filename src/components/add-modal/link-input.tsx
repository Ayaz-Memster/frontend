import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';

export interface LinkInputProps {
  value?: string;
  onChange: (link: string) => void;
  error?: string;
}

export const LinkInput = ({ onChange, error, value }: LinkInputProps) => {
  const [link, setLink] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number>();

  const updateLink: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    onChange(link);
  }, [link]);

  useEffect(() => {
    if (error) {
      inputRef.current?.focus();
    }
  }, [error]);

  useEffect(() => {
    if (value) {
      setLink(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 items-end">
        <div className="relative pt-6 flex-grow">
          <input
            type="text"
            className="peer text-lg rounded-md border p-1 focus:outline-none focus:ring w-full placeholder-transparent"
            placeholder="Link"
            onChange={updateLink}
            value={link}
            ref={inputRef}
          />
          <label
            htmlFor="link"
            className="text-base transition-all absolute left-1 top-0 text-gray-600 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-base"
          >
            Link
          </label>
        </div>
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
