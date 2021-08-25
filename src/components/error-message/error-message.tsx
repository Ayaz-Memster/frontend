import React from 'react';
import { SadMonkey } from './sad-monkey';

export interface ErrorMessage {
  title: string;
  subtitle?: string;
}

export const ErrorMessage = ({ title, subtitle }: ErrorMessage) => {
  return (
    <div className="w-full h-full grid place-items-center">
      <article className="flex flex-col items-center">
        <SadMonkey />
        <h1 className="font-bold text-2xl text-center text-gray-700">
          {title}
        </h1>
        {subtitle && (
          <h2 className="font-semibold text-xl text-center text-gray-600">
            {title}
          </h2>
        )}
      </article>
    </div>
  );
};

export default ErrorMessage;
