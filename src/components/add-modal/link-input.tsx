import React, { ChangeEventHandler, useEffect, useState } from 'react';

export interface LinkInputProps {
  onChange: (link: string) => void;
}

export const LinkInput = ({ onChange }: LinkInputProps) => {
  const [link, setLink] = useState<string>('');

  const updateLink: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLink(e.target.value);
  };

  const onSave = () => {
    onChange(link);
  };

  return (
    <div className="flex gap-2 items-end">
      <div className="relative pt-6 flex-grow">
        <input
          type="text"
          className="peer text-lg rounded-md border p-1 focus:outline-none focus:ring w-full placeholder-transparent"
          placeholder="Link"
          onChange={updateLink}
          value={link}
        />
        <label
          htmlFor="link"
          className="text-base transition-all absolute left-1 top-0 text-gray-600 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-base"
        >
          Link
        </label>
      </div>
      <button
        className="rounded-md bg-gray-200 px-2 py-1 text-lg focus:outline-none focus:ring"
        onClick={onSave}
        type="button"
      >
        Save
      </button>
    </div>
  );
};
