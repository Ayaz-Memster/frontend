import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { lazy, Suspense, useState } from 'react';
import { Loader } from '../loader/loader';
import { Switch } from '../switch/switch';
import cx from 'classnames';
const LoginForm = lazy(() => import('./login-form'));
const RegisterForm = lazy(() => import('./register-form'));

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Dialog
      as="div"
      className="fixed inset-0 overflow-y-auto"
      open={props.isOpen}
      onClose={props.onClose}
      unmount
    >
      <div className="min-h-screen grid place-items-center">
        <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-25" />
        <div className="w-[95%] sm:w-auto relative flex flex-col p-5 bg-white shadow-md rounded-xl z-10">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold">Add image</Dialog.Title>
            <button className="rounded-full focus:outline-none focus:ring">
              <XIcon className="w-6 h-6" onClick={props.onClose} />
            </button>
          </div>
          <div>
            <Suspense
              fallback={
                <div className="sm:min-w-[50vh] h-60">
                  <Loader />
                </div>
              }
            >
              {!isRegister ? <LoginForm /> : <RegisterForm />}
            </Suspense>
            <div className="flex gap-2 justify-center items-center my-4">
              <span className={cx('text-lg', !isRegister && 'font-bold')}>
                Login
              </span>
              <Switch
                alt="Link or File switch"
                value={isRegister}
                onChange={setIsRegister}
              />
              <span className={cx('text-lg', isRegister && 'font-bold')}>
                Register
              </span>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export { LoginModal as default };
