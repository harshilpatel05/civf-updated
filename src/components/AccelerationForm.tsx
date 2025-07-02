'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AccelarationForm() {
  const validator = (phone: string, equity: string) => {
    if (phone.length !== 10) return false;
    const eq = Number(equity);
    return eq >= 0 && eq <= 100;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
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

      const res = await fetch(`/api/acceleration`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 409) {
          alert('Duplicate Entry With Same Email');
        } else {
          alert('Error in Submission');
        }
        return;
      }

      const { data: id } = await res.json();
      (document.getElementById('frm') as HTMLFormElement).reset();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(error);
      toast.error(message);
    }
  };
  return (
    <section className="bg-yellow-500 py-10">
      <h1 className="text-center text-3xl font-extrabold text-white">
        Apply for Acceleration
      </h1>

      <div className="flex justify-center py-8 lg:py-0">
        <div className="w-full md:11/12 lg:w-5/6 xl:w-3/6 m-10 rounded-lg shadow bg-gray-100/50 backdrop-blur">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold md:text-2xl text-black">
              Enter your details
            </h1>

            <form id="frm" className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <h2 className="text-lg font-medium border-b border-black text-black">
                Founders&apos; Details
              </h2>

              <div className="md:grid md:grid-cols-2 md:gap-5">
                {[
                  { id: 'firstName', label: 'First Name' },
                  { id: 'lastName', label: 'Last Name' },
                  { id: 'email', label: 'Your email', type: 'email' },
                  { id: 'phone', label: 'Phone', type: 'text',placeholder: "XXX-XXX-XXXX" },
                  { id: 'equityStack', label: 'Equity Stake In %' },
                  { id: 'linkedInURL', label: 'LinkedIn URL' },
                  { id: 'componyName', label: 'Company Name' },
                  { id: 'companyWebsite', label: 'Company Website' },
                ].map(({ id, label, type = 'text',placeholder = label }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block my-2 text-sm font-medium text-black">
                      {label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={type}
                      name={id}
                      id={id}
                      placeholder = {placeholder}
                      required
                      className="border border-black outline-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white placeholder-black focus:ring-black focus:border-black"
                    />
                  </div>
                ))}

                <div className="col-span-2">
                  <label htmlFor="founderName" className="block my-2 text-sm font-medium text-black">
                    List Other Founder&apos;s Full Name. (Separated By Comma)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="founderName"
                    id="founderName"
                    required
                    className="border border-black outline-black placeholder-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white"
                    placeholder="Other founders"
                  />
                </div>

                <div className="flex flex-row items-center mt-3 col-span-2">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4 border border-black outline-black text-black rounded"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm font-bold text-black">
                    I have reviewed the program qualifications and requirements.
                  </label>
                </div>

                <div className="col-span-2">
                  <label htmlFor="productName" className="block my-2 text-sm font-medium text-black">
                    Name Of Products / Services / Solutions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="productName"
                    id="productName"
                    required
                    className="border border-black outline-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="productDescription" className="block my-2 text-sm font-medium text-black">
                    Describe your product/service/solution <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="productDescription"
                    id="productDescription"
                    required
                    className="border border-black outline-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="productDemoURL" className="block my-2 text-sm font-medium text-black">
                    Product Online Demo URL
                  </label>
                  <input
                    type="text"
                    name="productDemoURL"
                    id="productDemoURL"
                    className="border border-black outline-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="employees" className="block my-2 text-sm font-medium text-black">
                    Number of employees <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employees"
                    id="employees"
                    required
                    className="border border-black outline-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white"
                  >
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-100">51–100</option>
                    <option value="101+">More than 100</option>
                  </select>
                </div>

                <div>
                  <label className="block my-2 text-sm font-medium text-black">
                    Will You Be Primary Contact? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-x-2">
                      <input type="radio" name="isPrimary" required className="h-4 w-4" />
                      Yes
                    </label>
                    <label className="flex items-center gap-x-2">
                      <input type="radio" name="isPrimary" className="h-4 w-4" />
                      No
                    </label>
                  </div>
                </div>

                <div className="col-span-2 mt-5">
                  <h2 className="text-lg font-medium border-b border-black text-black">
                    Investor&apos;s Details
                  </h2>
                  <p className="mt-2 text-black">
                    Please list all investor details (active and non-active) in your venture:
                  </p>
                </div>

                {[
                  { id: 'nameInvestor', label: 'Name (Individual/Institutional Investor)' },
                  { id: 'investmentInINR', label: 'Investment Amount in INR' },
                  { id: 'investmentTime', label: 'When Was Investment Made?' },
                  { id: 'otherInvestors', label: 'List Other Investor Details (comma separated)' },
                ].map(({ id, label }) => (
                  <div key={id} className="col-span-2">
                    <label htmlFor={id} className="block my-2 text-sm font-medium text-black">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={id}
                      id={id}
                      className="border border-black outline-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white"
                    />
                  </div>
                ))}

                <div>
                  <label className="block my-2 text-sm font-medium text-black">
                    Is Your Product/Idea Patented? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center text-black gap-x-2">
                      <input type="radio" name="isPatented" required className="h-4  w-4" />
                      Yes
                    </label>
                    <label className="flex text-black items-center gap-x-2">
                      <input type="radio" name="isPatented" className="h-4  w-4" />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="sourceOfInformation" className="block my-2 text-sm font-medium text-black">
                    Where Did You Hear About CIVF? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sourceOfInformation"
                    id="sourceOfInformation"
                    required
                    className="border border-black outline-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Newspaper">Newspaper</option>
                    <option value="CIVF Sarathi">CIVF Sarathi</option>
                    <option value="Whatsapp">WhatsApp</option>
                    <option value="Facebook">Facebook</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="pitchDesk" className="block my-2 text-sm font-medium text-black">
                    Upload Your Pitch Deck <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="pitchDesk"
                    id="pitchDesk"
                    required
                    className="border border-black outline-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white"
                  />
                </div>
              </div>

              {/* T&C Consent */}
              <div className="mt-5">
                <p className="text-black">
                  I accept CIVF's terms and privacy policy. I confirm that I have
                  permission to share third-party data where provided.
                </p>
                <div className="flex items-start mt-2">
                  <input
                    id="terms2"
                    type="checkbox"
                    required
                    className="w-4 h-4 border border-black text-black rounded"
                  />
                  <label htmlFor="terms2" className="ml-3 text-black text-sm">
                    I Accept
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
      </section>
);
}