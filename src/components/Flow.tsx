'use client';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';

const Flow = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [stage, setStage] = useState(0);

  const downloads = [
    {
      name: 'CIVF Incubatee Handbook',
      link: 'https://drive.google.com/file/d/11KGhBmuMVs7Fmqz3TtZNaqpVuAeT0CrD/view?usp=drive_link',
    },
    {
      name: 'CIVF Brochure',
      link: 'https://drive.google.com/file/d/1TfScqXRmW0lRkzmwQ7E2zuydDj7_h0qw/view?usp=drive_link',
    },
    {
      name: 'Pitch Deck',
      link: 'https://docs.google.com/presentation/d/1PSCj2b0QffgH_VrFXh3rCsz4a6Xb7d9p/edit?usp=drive_link&ouid=104645861607159297760&rtpof=true&sd=true',
    },
  ];

  return (
    <section className="px-5 lg:px-32 py-20 bg-rose-200">
      <h1 className="text-3xl font-extrabold text-center text-gray-800">Application Process</h1>

      <figure className="mx-auto py-10 font-semibold">
        <ol className="flex flex-col items-center w-full">
          {[1, 2, 3].map((num) => (
            <li
              key={num}
              className="border-l-2 border-rose-600 w-full md:w-8/12 lg:w-5/12 flex items-center"
            >
              <div className="flex items-center justify-center -ml-3" style={{ minWidth: '1.5rem' }}>
                <div className="bg-rose-600 w-6 h-6 flex items-center justify-center rounded-full ring-2 ring-white shadow">
                  <svg
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                </div>
              </div>
              <div
                onClick={() => {
                  setStage(num);
                  setOpen(true);
                }}
                className="block cursor-pointer p-6 rounded-lg shadow-lg bg-gradient-to-tr from-slate-100 to-slate-300 w-11/12 max-w-lg ml-6 mb-10"
              >
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-xl text-rose-600">
                    Stage {num}
                  </span>
                </div>
                <p className="text-gray-700 text-lg">
                  {num === 1 && (
                    <>
                      &#x2022; Online application<br />
                      &#x2022; Preliminary screening<br />
                      &#x2022; Evaluation by screening committee
                    </>
                  )}
                  {num === 2 && (
                    <>
                      &#x2022; Pitch presentation<br />
                      &#x2022; Recommending improvements<br />
                      &#x2022; Collaboration agreement
                    </>
                  )}
                  {num === 3 && <>Induction into CIVF</>}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </figure>

      <div className="pt-20 px-4 sm:px-24 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Downloads</h1>
        <div className="flex flex-wrap justify-center gap-5">
          {downloads.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              className="px-5 py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl p-6">
                  <div>
                    {stage === 1 && (
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Stage 1: Online submission and screening
                      </h2>
                    )}
                    {stage === 2 && (
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Stage 2: Pitching and Selection
                      </h2>
                    )}
                    {stage === 3 && (
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Stage 3: Induction into CIVF
                      </h2>
                    )}
                    {/* Optional: Add full text for each stage here */}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      onClick={() => setOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  );
};

export default Flow;
