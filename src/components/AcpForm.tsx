'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { toast } from 'sonner';

const AccFrm = () => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const validator = (phone: string, equity: string) => {
    if (phone.length !== 10) return false;
    if (Number(equity) > 100 || Number(equity) < 0) return false;
    return true;
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      if (
        !validator(
          formData.get('phone') as string,
          formData.get('equityStack') as string
        )
      ) {
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

      const { data: id } = await res.json();
      setId(id);
      setOpen(true);
      (document.getElementById('frm') as HTMLFormElement).reset();
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Unknown error');
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-yellow-500 py-10">
      <h1 className="text-center text-3xl font-extrabold text-white">
        Apply for Acceleration
      </h1>

      <div className="flex justify-center py-8 lg:py-0">
        <div className="w-full md:11/12 lg:w-5/6 xl:w-3/6 m-10 rounded-lg shadow p-0 xl:p-0 bg-gray-100/50 backdrop-blur">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-800">
              Enter your details
            </h1>
            <form
              id="frm"
              className="space-y-4 text-black md:space-y-6"
              onSubmit={handelSubmit}
            >
              <h2 className="text-lg font-medium border-b border-black">
                Founders&apos; Details
              </h2>

              {/* Include your form fields here as before */}

              <h2 className="text-lg font-medium border-b border-gray-600 mt-5 col-span-2">
                Pitch Desk
              </h2>
              <div className="col-span-2">
                <label htmlFor="pitchDesk" className="block my-2 text-sm font-medium">
                  Upload Your Pitch Desk <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="pitchDesk"
                  id="pitchDesk"
                  className="border bg-white outline-none sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <hr className="border-gray-600 mt-5 col-span-2" />
              <p>
                I Accept CIVF&apos;s Application Terms &amp; Conditions And The Company&apos;s Privacy Policy
              </p>
              <p className="text-sm">
                By checking this box I accept the CIVF&apos;s Accelerator programme&apos;s Application Terms &amp;
                Conditions and I give my consent to CIVF to process my personal data in accordance with the
                Company&apos;s Privacy Policy.
              </p>

              <div className="flex items-start">
                <input
                  id="terms2"
                  type="checkbox"
                  className="w-4 h-4 border rounded focus:ring-3"
                  required
                />
                <label htmlFor="terms2" className="ml-3 text-sm">
                  I Accept
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 text-white px-5 py-2.5 rounded hover:bg-rose-700"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                  <div className="bg-white flex justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-bold text-center leading-6 text-gray-900"
                        >
                          Your application is submitted successfully
                        </Dialog.Title>
                        <div className="mt-2">Your application ID is: {id}</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-700 sm:ml-3 sm:w-auto"
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

export default AccFrm;
