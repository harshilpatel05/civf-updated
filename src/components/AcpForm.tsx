"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { toast } from "sonner";

const AccFrm = () => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const validator = (phone: string, equity: string) => {
    if (phone.length !== 10) return false;
    const eq = Number(equity);
    if (eq > 100 || eq < 0) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      if (
        !validator(
          formData.get("phone") as string,
          formData.get("equityStack") as string
        )
      ) {
        alert("Invalid Phone Number or Equity Stack");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/AccForm`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 409) {
          alert("Duplicate Entry With Same Email");
          return;
        } else {
          alert("Error in Submission");
          return;
        }
      }

      const { data: id } = await res.json();
      setId(id);
      setOpen(true);
      (document.getElementById("frm") as HTMLFormElement).reset();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    }
  };

  return (
    <section className="bg-yellow-500 py-10">
      <h1 className="text-center text-3xl font-extrabold text-white underline hover:text-gray-200">
        Apply for Acceleration
      </h1>

      <div className="flex justify-center py-8 lg:py-0">
        <div className="w-full md:11/12 lg:w-5/6 xl:w-3/6 m-10 rounded-lg shadow bg-gray-100/50 backdrop-blur">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold md:text-2xl text-gray-800">
              Enter your details
            </h1>
            <form id="frm" className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* ... all your form inputs ... */}
              
              {/* Fix radio buttons */}
              <input id="isPrimaryYes" name="isPrimary" type="radio" value="Yes" required className="..." />
              <input id="isPrimaryNo" name="isPrimary" type="radio" value="No" className="..." />

              <input id="isPatentedYes" name="isPatented" type="radio" value="Yes" required className="..." />
              <input id="isPatentedNo" name="isPatented" type="radio" value="No" className="..." />

              {/* Fix select options */}
              <select name="sourceOfInformation" required className="...">
                <option value="LinkedIn">LinkedIn</option>
                <option value="Newspaper">Newspaper</option>
                <option value="CIVF Sarathi">CIVF Sarathi</option>
                <option value="Whatsapp">Whatsapp</option>
                <option value="Facebook">Facebook</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                className="disabled:bg-rose-500 outline-none disabled:cursor-not-allowed w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-rose-600 hover:bg-rose-700 focus:ring-rose-800"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                        <Dialog.Title as="h3" className="text-lg font-bold text-center leading-6 text-gray-900">
                          Your application is submitted successfully
                        </Dialog.Title>
                        <div className="mt-2">Your application ID is: {id}</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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
