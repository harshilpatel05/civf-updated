'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { toast } from 'sonner';

const AcpForm = () => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  // Validate phone and equity input
  const validator = (phone: string, equity: string) => {
    if (phone.length !== 10) return false;
    const eq = Number(equity);
    if (isNaN(eq) || eq < 0 || eq > 100) return false;
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const phone = formData.get('phone') as string;
      const equity = formData.get('equityStack') as string;

      if (!validator(phone, equity)) {
        alert('Invalid Phone Number or Equity Stack');
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/AccForm`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 409) {
          alert('Duplicate Entry With Same Email');
          return;
        } else {
          alert('Error in Submission');
          return;
        }
      }

      const { data: newId } = await res.json();
      setId(newId);
      setOpen(true);
      (document.getElementById('frm') as HTMLFormElement).reset();
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error('Unknown error occurred');
      }
    }
  };

  return (
    <section className="bg-yellow-500 py-10">
      <h1 className="text-center text-3xl font-extrabold text-white underline hover:text-gray-200">
        Apply for Acceleration
      </h1>

      <div className="flex justify-center py-8">
        <div className="w-full md:11/12 lg:w-5/6 xl:w-3/6 m-10 rounded-lg shadow bg-gray-100/50 backdrop-blur">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold md:text-2xl text-gray-800">Enter your details</h2>

            <form id="frm" onSubmit={handleSubmit} className="space-y-4 text-black md:space-y-6">
              {/* Example fields – add more as needed */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="block w-full p-2 border rounded bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="block w-full p-2 border rounded bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="block w-full p-2 border rounded bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="block w-full p-2 border rounded bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="equityStack" className="block text-sm font-medium">
                    Equity Stack (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="equityStack"
                    name="equityStack"
                    required
                    className="block w-full p-2 border rounded bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pitchDesk" className="block text-sm font-medium mt-4">
                  Upload Your Pitch Deck <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="pitchDesk"
                  name="pitchDesk"
                  required
                  className="block w-full p-2 border rounded bg-white"
                />
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium">
                  <input type="checkbox" required className="mr-2" />
                  I accept the terms and privacy policy
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 text-white px-5 py-2.5 rounded hover:bg-rose-700"
              >
                Submit Application
              </button>
            </form>
          </div>
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
                <Dialog.Panel className="relative rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-1/2 m-5">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
                    <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
                      Application Submitted
                    </Dialog.Title>
                    <p className="mt-2">Your application ID is: <strong>{id}</strong></p>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-rose-600 px-4 py-2 text-base font-medium text-white hover:bg-rose-700 focus:outline-none"
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

export default AcpForm;
