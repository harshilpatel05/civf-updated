"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { toast } from "sonner";

const AccFrm = () => {
  const [id, setId] = useState("");

  const validator = (phone: string, equity: string) => {
    if (phone.length !== 10) return false;
    if (Number(equity) > 100 && Number(equity) < 0) return false;
    return true;
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  return (
    <section className="bg-yellow-500 py-10">
      <h1 className="text-center text-3xl font-extrabold text-white">
        Apply for Acceleration
      </h1>

      <div className="flex justify-center py-8 lg:py-0">
        <div className="w-full md:11/12 lg:w-5/6 xl:w-3/6 m-10 rounded-lg shadow p-0 xl:p-0 bg-gray-100/50 backdrop-blur">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl  text-gray-800">
              Enter your details
            </h1>
            <form
              id="frm"
              className="space-y-4 text-black md:space-y-6"
              onSubmit={handelSubmit}
            >
              <h2 className="text-lg font-medium border-b border-black">
                Founders' Details
              </h2>
              <div className="md:grid md:grid-cols-2 md:gap-5">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-black my-2 text-sm font-medium "
                  >
                    First Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className=" border outline-none  sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block my-2 text-sm font-medium "
                  >
                    Last Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className=" border outline-none  sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block my-2 text-sm font-medium "
                  >
                    Your email
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" border outline-none  sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block my-2 text-sm font-medium "
                  >
                    Phone
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className=" border outline-none  sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="XXX-XXX-XXX"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="equityStack"
                    className="block my-2 text-sm font-medium"
                  >
                    Equity Stake In %<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="equityStack"
                    id="equityStack"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="XX.XX"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="linkedInURL"
                    className="block my-2 text-sm font-medium "
                  >
                    LinkedIn URL
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="linkedInURL"
                    id="linkedInURL"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="https://"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="componyName"
                    className="block my-2 text-sm font-medium "
                  >
                    Compony Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="componyName"
                    id="componyName"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="Your Products/ Services/ Solutions"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="companyWebsite"
                    className="block my-2 text-sm font-medium "
                  >
                    Company Website
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyWebsite"
                    id="companyWebsite"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="Your Products/ Services/ Solutions"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="founderName"
                    className="block my-2 text-sm font-medium "
                  >
                    List Other Founder's Full Name. (Separated By Comma)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="founderName"
                    id="founderName"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="Your Products/ Services/ Solutions"
                    required
                  />
                </div>
                <div className="flex items-start mt-3 col-span-2">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      name="terms"
                      type="checkbox"
                      className="w-4 h-4 border outline-none rounded  focus:ring-3   bg-gray  border-color2  focus:ring-rose-600  ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light   text-gray-">
                      I have reviewed the program qualifications and
                      requirements.
                    </label>
                  </div>
                </div>
                {/*  */}
                {/*  */}
                <div className="col-span-2">
                  <label
                    htmlFor="productName"
                    className="block my-2 text-sm font-medium "
                  >
                    Name Of Products / Services / Solutions
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="productName"
                    id="productName"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="Your Products/ Services/ Solutions"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="productDescription"
                    className="block my-2 text-sm font-medium "
                  >
                    Describe about products / services / solutions
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="productDescription"
                    id="productDescription"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    placeholder="Your Products/ Services/ Solutions"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="productDemoURL"
                    className="block my-2 text-sm font-medium "
                  >
                    Product Online Demo URL
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    type="text"
                    name="productDemoURL"
                    id="productDemoURL"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black focus:ring-rose-800  focus:border-rose-500"
                    placeholder="Your Products/ Services/ Solutions"
                  />
                </div>
                <div>
                  <label
                    htmlFor="employees"
                    className="block my-2 text-sm font-medium"
                  >
                    Number of employees
                    <span className="text-red-500">*</span>
                  </label>

                  <select
                    name="employees"
                    id="employees"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    required
                  >
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101+">More than 100</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="isPrimary"
                    className="block my-2 text-sm font-medium"
                  >
                    Will You Primary Contact?
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="isPrimaryYes"
                      name="isPrimary"
                      required
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-600"
                    />
                    <label
                      htmlFor="isPrimaryYes"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="isPrimaryNo"
                      name="isPrimary"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-600"
                    />
                    <label
                      htmlFor="isPrimaryNo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No
                    </label>
                  </div>
                </div>
                <div className="col-span-2">
                  <h2 className="text-lg font-medium border-b border-gray-600 mt-5">
                    Investor' Details
                  </h2>
                </div>{" "}
                <div className="col-span-2">
                  <p className="mt-2">
                    Please list all Investors' details (active and non-active)
                    in your venture according to the specifications below:
                  </p>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="nameInvestor"
                    className="block my-2 text-sm font-medium "
                  >
                    Name (Individual/Institutional Investor)
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    type="text"
                    name="nameInvestor"
                    id="nameInvestor"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="investmentInINR"
                    className="block my-2 text-sm font-medium "
                  >
                    How Much Investment Was Sought? (Mention The Amount In
                    Indian Rupees)
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    type="text"
                    name="investmentInINR"
                    id="investmentInINR"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="investmentTime"
                    className="block my-2 text-sm font-medium "
                  >
                    When The Investment Was Fetched? (State The Date/Month/Year)
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    type="text"
                    name="investmentTime"
                    id="investmentTime"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="otherInvestors"
                    className="block my-2 text-sm font-medium "
                  >
                    List Other Investors Details. (Separated By Comma)
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    type="text"
                    name="otherInvestors"
                    id="otherInvestors"
                    className=" border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                  />
                </div>
                <h2 className="text-lg font-medium border-b border-gray-600 mt-5 col-span-2">
                  Patent
                </h2>
                <div>
                  <label
                    htmlFor="isPatented"
                    className="block my-2 text-sm font-medium"
                  >
                    Does Your Product/Idea Patented?
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="isPatentedYes"
                      name="isPatented"
                      type="radio"
                      required
                      className="h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-600"
                    />
                    <label
                      htmlFor="isPatentedYes"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="isPatentedNo"
                      name="isPatented"
                      required
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-600"
                    />
                    <label
                      htmlFor="isPatentedNo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="sourceOfInformation"
                    className="block my-2 text-sm font-medium"
                  >
                    From Where Did You Get Information About The CIVF's
                    Accelerator Program?
                    <span className="text-red-500">*</span>
                  </label>

                  <select
                    name="sourceOfInformation"
                    id="sourceOfInformation"
                    className="border outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    required
                  >
                    <option value="1-10">LinkedIn</option>
                    <option value="11-50">Newspaper</option>
                    <option value="51-100">CIVF Sarathi</option>
                    <option value="101+">Whatsapp</option>
                    <option value="101+">Facebook</option>
                  </select>
                </div>
                <h2 className="text-lg font-medium border-b border-gray-600 mt-5 col-span-2">
                  Pitch Desk
                </h2>
                <div className="col-span-2">
                  <label
                    htmlFor="pitchDesk"
                    className="block my-2 text-sm font-medium "
                  >
                    Upload Your Pitch Desk
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="pitchDesk"
                    id="pitchDesk"
                    className="border bg-white outline-none sm:text-sm rounded-lg block w-full p-2.5  bg-gray  border-color2  placeholder-black  focus:ring-rose-800  focus:border-rose-500"
                    required
                  />
                </div>
                <hr className="border-gray-600 mt-5 col-span-2" />
              </div>

              {/*  */}
              <p>
                I Accept CIVF's Application Terms & Conditions And The Company's
                Privacy Policy{" "}
              </p>
              <p className="text-sm">
                By checking this box I accept the CIVF's Accelerator programme's
                Application Terms & Conditions and I give my consent to CIVF to
                process my personal data in accordance with the Company's
                Privacy Policy. Wherever I have provided third parties' personal
                data, the data subjects have consented to the provision of this
                personal data and the processing in accordance with the above
                mentioned Privacy Policy.
              </p>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms2"
                    aria-describedby="terms2"
                    type="checkbox"
                    className="w-4 h-4 border outline-none rounded  focus:ring-3   bg-gray  border-color2  focus:ring-rose-600  ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms2" className="">
                    I Accept
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="disabled:bg-rose-500 outline-none disabled:cursor-not-allowed w-ful text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-rose-600  hover:bg-rose-700  focus:ring-rose-800"
              >
                Create an account
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
                  <div className="bg-white flex justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-bold text-center leading-6 text-gray-900"
                        >
                          Your application is submitted successfully
                        </Dialog.Title>
                        <div className="mt-2">Your application id is: {id}</div>
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
    
    
    // <section className="bg-yellow-500 py-10">
    //     <h1 className="text-center text-3xl font-extrabold text-white hover:text-gray-200">
    //     We are not longer accepting Applications.
    //   </h1>
    // </section>
  );
};

export default AccFrm;
