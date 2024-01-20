import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Confetti from "react-confetti";
import { classNames } from "@/utils/styles";

interface ModalProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  isWinner?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}
const Modal = ({
  isModalVisible,
  setIsModalVisible,
  children,
  isWinner,
  maxWidth,
}: ModalProps) => {
  return (
    <Transition.Root show={isModalVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsModalVisible}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-gradient-to-br from-gray-900 via-stone-800/90 to-neutral-900/90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-hidden">
          {isWinner ? (
            <Confetti
              tweenDuration={3000}
              numberOfPieces={500}
              recycle={false}
            />
          ) : null}
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:mb-3 sm:mt-10 sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  "absolute top-1/2 h-full w-full -translate-y-1/2 transform overflow-hidden rounded-lg bg-gradient-to-br from-white via-gray-300 to-slate-500 px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:from-indigo-950 dark:via-neutral-950 dark:to-slate-950 sm:my-8 sm:w-full sm:p-6 md:h-auto lg:h-[500px] lg:w-[800px] lg:px-3 lg:pt-2",
                  maxWidth === undefined ? "sm:max-w-lg" : "",
                  maxWidth === "sm" ? " sm:max-w-sm" : "",
                  maxWidth === "md" ? " sm:max-w-md" : "",
                  maxWidth === "lg" ? " sm:max-w-lg" : "",
                  maxWidth === "xl" ? " sm:max-w-2xl" : "",
                  maxWidth === "2xl" ? " sm:max-w-4xl" : "",
                )}
              >
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block lg:pt-2">
                  <button
                    type="button"
                    tabIndex={-1}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-slate-800"
                    onClick={() => setIsModalVisible(false)}
                  >
                    <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

type ModalWithTitleProps = ModalProps & {
  title?: string;
  footer?: React.ReactNode;
};

export function ModalWithTitle({
  isModalVisible,
  setIsModalVisible,
  children,
  footer,
  title,
  isWinner,
}: ModalWithTitleProps) {
  return (
    <div className="">
      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isWinner={isWinner}
      >
        <div key={`key-statusmodal-${title}`}>
          <div className="flex items-center justify-center">
            <div className="pr-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-center font-header text-base font-semibold uppercase leading-6 tracking-wider text-gray-700 dark:text-white lg:text-xl"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2 dark:text-white">{children}</div>
            </div>
          </div>

          {footer ? (
            <div className="mt-5 flex justify-center gap-4 sm:mt-4 sm:flex-row-reverse">
              {footer}
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
