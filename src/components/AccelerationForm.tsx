'use client';
import { useState } from 'react';
import { toast } from 'sonner';

type FormErrors = Record<string, string>;

const baseFieldClass =
  'border outline-black text-black sm:text-sm rounded-lg block w-full p-2.5 bg-white placeholder-black focus:ring-black focus:border-black';

const getFieldClassName = (hasError: boolean) =>
  `${baseFieldClass} ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-black'}`;

const getStringValue = (formData: FormData, key: string) =>
  formData.get(key)?.toString().trim() ?? '';

const isValidUrl = (value: string) => {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};
  const phone = getStringValue(formData, 'phone').replace(/\D/g, '');
  const equityValue = getStringValue(formData, 'equityStack');
  const equity = Number(equityValue);
  const linkedInUrl = getStringValue(formData, 'linkedInURL');
  const companyWebsite = getStringValue(formData, 'companyWebsite');
  const productDemoUrl = getStringValue(formData, 'productDemoURL');
  const isPrimary = getStringValue(formData, 'isPrimary');
  const isPatented = getStringValue(formData, 'isPatented');
  const pitchDeck = formData.get('pitchDesk');

  if (phone.length !== 10) {
    errors.phone = 'Enter a valid 10-digit phone number.';
  }

  if (!equityValue || Number.isNaN(equity) || equity < 0 || equity > 100) {
    errors.equityStack = 'Equity stake must be a number between 0 and 100.';
  }

  if (!isValidUrl(linkedInUrl)) {
    errors.linkedInURL = 'Enter a valid LinkedIn URL, including http:// or https://.';
  }

  if (!isValidUrl(companyWebsite)) {
    errors.companyWebsite = 'Enter a valid company website URL.';
  }

  if (productDemoUrl && !isValidUrl(productDemoUrl)) {
    errors.productDemoURL = 'Enter a valid demo URL or leave this field empty.';
  }

  if (isPrimary !== 'Yes' && isPrimary !== 'No') {
    errors.isPrimary = 'Select whether you are the primary contact.';
  }

  if (isPatented !== 'Yes' && isPatented !== 'No') {
    errors.isPatented = 'Select whether the product or idea is patented.';
  }

  if (!(pitchDeck instanceof File) || pitchDeck.size === 0) {
    errors.pitchDesk = 'Upload your pitch deck before submitting.';
  }

  return errors;
};

export default function AccelarationForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const clearFieldError = (fieldName: string) => {
    if (!fieldName) {
      return;
    }

    setFormErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, id } = e.target;
    const fieldName = name || id;

    if (name === 'phone' && e.target instanceof HTMLInputElement) {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    }

    clearFieldError(fieldName);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      toast.error('Please correct the highlighted fields and try again.');

      const firstInvalidField = Object.keys(validationErrors)[0];
      const formControl = form.elements.namedItem(firstInvalidField);
      if (formControl instanceof RadioNodeList) {
        const firstRadio = formControl[0];
        if (firstRadio instanceof HTMLElement) {
          firstRadio.focus();
        }
      } else if (formControl instanceof HTMLElement) {
        formControl.focus();
      }

      return;
    }

    setFormErrors({});
    setLoading(true);

    try {
      const res = await fetch(`/api/acceleration`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 409) {
          setFormErrors((currentErrors) => ({
            ...currentErrors,
            email: 'An application with this email already exists.',
          }));
          toast.error('An application with this email already exists.');
        } else {
          toast.error('There was a problem submitting the form.');
        }
        return;
      }

      const data = await res.json();

      if (data.success && data.uuid) {
        setReferenceNumber(data.uuid);
        setShowPopup(true);
        form.reset();
        setFormErrors({});
        return;
      }

      toast.error('Submission failed. Please try again.');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const renderFieldError = (fieldName: string) =>
    formErrors[fieldName] ? (
      <p className="mt-1 text-sm text-red-600">{formErrors[fieldName]}</p>
    ) : null;

  return (
    <>
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
                    {
                      id: 'phone',
                      label: 'Phone',
                      type: 'tel',
                      placeholder: '9876543210',
                      inputMode: 'numeric' as const,
                      pattern: '\\d{10}',
                      maxLength: 10,
                      title: 'Enter a 10-digit phone number.',
                    },
                    {
                      id: 'equityStack',
                      label: 'Equity Stake In %',
                      type: 'number',
                      placeholder: '0 to 100',
                      min: 0,
                      max: 100,
                      step: '0.01',
                    },
                    {
                      id: 'linkedInURL',
                      label: 'LinkedIn URL',
                      type: 'url',
                      placeholder: 'https://www.linkedin.com/in/your-profile',
                    },
                    { id: 'componyName', label: 'Company Name' },
                    {
                      id: 'companyWebsite',
                      label: 'Company Website',
                      type: 'url',
                      placeholder: 'https://yourcompany.com',
                    },
                  ].map(({ id, label, type = 'text', placeholder = label, ...fieldProps }) => (
                    <div key={id}>
                      <label htmlFor={id} className="block my-2 text-sm font-medium text-black">
                        {label} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={type}
                        name={id}
                        id={id}
                        placeholder={placeholder}
                        required
                        onChange={handleFieldChange}
                        aria-invalid={Boolean(formErrors[id])}
                        className={getFieldClassName(Boolean(formErrors[id]))}
                        {...fieldProps}
                      />
                      {renderFieldError(id)}
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
                      onChange={handleFieldChange}
                      aria-invalid={Boolean(formErrors.founderName)}
                      className={getFieldClassName(Boolean(formErrors.founderName))}
                      placeholder="Other founders"
                    />
                    {renderFieldError('founderName')}
                  </div>

                  <div className="flex flex-row items-center mt-3 col-span-2">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      onChange={handleFieldChange}
                      className="w-4 h-4 border border-black outline-black text-black rounded"
                    />
                    <label htmlFor="terms" className="ml-3 text-sm font-bold text-black">
                      I have reviewed the program qualifications and requirements.
                    </label>
                  </div>
                  {renderFieldError('terms') && <div className="col-span-2">{renderFieldError('terms')}</div>}

                  <div className="col-span-2">
                    <label htmlFor="productName" className="block my-2 text-sm font-medium text-black">
                      Name Of Products / Services / Solutions <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      name="productName"
                      id="productName"
                      required
                      onChange={handleFieldChange}
                      aria-invalid={Boolean(formErrors.productName)}
                      className={getFieldClassName(Boolean(formErrors.productName))}
                    />
                    {renderFieldError('productName')}
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
                      onChange={handleFieldChange}
                      aria-invalid={Boolean(formErrors.productDescription)}
                      className={getFieldClassName(Boolean(formErrors.productDescription))}
                    />
                    {renderFieldError('productDescription')}
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="productDemoURL" className="block my-2 text-sm font-medium text-black">
                      Product Online Demo URL
                    </label>
                    <input
                      type="url"
                      name="productDemoURL"
                      id="productDemoURL"
                      placeholder="https://demo.example.com"
                      onChange={handleFieldChange}
                      aria-invalid={Boolean(formErrors.productDemoURL)}
                      className={getFieldClassName(Boolean(formErrors.productDemoURL))}
                    />
                    {renderFieldError('productDemoURL')}
                  </div>

                  <div>
                    <label htmlFor="employees" className="block my-2 text-sm font-medium text-black">
                      Number of employees <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="employees"
                      id="employees"
                      required
                      onChange={handleFieldChange}
                      aria-invalid={Boolean(formErrors.employees)}
                      className={getFieldClassName(Boolean(formErrors.employees))}
                    >
                      <option value="1-10">1–10</option>
                      <option value="11-50">11–50</option>
                      <option value="51-100">51–100</option>
                      <option value="101+">More than 100</option>
                    </select>
                    {renderFieldError('employees')}
                  </div>

                  <div>
                    <label className="block my-2 text-sm font-medium text-black">
                      Will You Be Primary Contact? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center text-black gap-x-2">
                        <input
                          type="radio"
                          name="isPrimary"
                          value="Yes"
                          required
                          onChange={handleFieldChange}
                          className="h-4 w-4"
                        />
                        Yes
                      </label>
                      <label className="flex items-center text-black gap-x-2">
                        <input
                          type="radio"
                          name="isPrimary"
                          value="No"
                          onChange={handleFieldChange}
                          className="h-4 w-4"
                        />
                        No
                      </label>
                    </div>
                    {renderFieldError('isPrimary')}
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
                        onChange={handleFieldChange}
                        aria-invalid={Boolean(formErrors[id])}
                        className={getFieldClassName(Boolean(formErrors[id]))}
                      />
                      {renderFieldError(id)}
                    </div>
                  ))}

                  <div>
                    <label className="block my-2 text-sm font-medium text-black">
                      Is Your Product/Idea Patented? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center text-black gap-x-2">
                        <input
                          type="radio"
                          name="isPatented"
                          value="Yes"
                          required
                          onChange={handleFieldChange}
                          className="h-4 w-4"
                        />
                        Yes
                      </label>
                      <label className="flex text-black items-center gap-x-2">
                        <input
                          type="radio"
                          name="isPatented"
                          value="No"
                          onChange={handleFieldChange}
                          className="h-4 w-4"
                        />
                        No
                      </label>
                    </div>
                    {renderFieldError('isPatented')}
                  </div>

                  <div>
                    <label htmlFor="sourceOfInformation" className="block my-2 text-sm font-medium text-black">
                      Where Did You Hear About CIVF? <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="sourceOfInformation"
                      id="sourceOfInformation"
                      required
                      onChange={handleFieldChange}
                      aria-invalid={Boolean(formErrors.sourceOfInformation)}
                      className={getFieldClassName(Boolean(formErrors.sourceOfInformation))}
                    >
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Newspaper">Newspaper</option>
                      <option value="CIVF Sarathi">CIVF Sarathi</option>
                      <option value="Whatsapp">WhatsApp</option>
                      <option value="Facebook">Facebook</option>
                    </select>
                    {renderFieldError('sourceOfInformation')}
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
                      onChange={handleFieldChange}
                      aria-invalid={Boolean(formErrors.pitchDesk)}
                      className={getFieldClassName(Boolean(formErrors.pitchDesk))}
                    />
                    {renderFieldError('pitchDesk')}
                  </div>
                </div>

                {/* T&C Consent */}
                <div className="col-span-2">
                  <p className="text-black">
                    I accept CIVF&apos;s terms and privacy policy. I confirm that I have
                    permission to share third-party data where provided.
                  </p>
                  <div className="flex items-start mt-2">
                    <input
                      id="terms2"
                      name="terms2"
                      type="checkbox"
                      required
                      onChange={handleFieldChange}
                      className="w-4 h-4 border border-black text-black rounded"
                    />
                    <label htmlFor="terms2" className="ml-3 text-black text-sm">
                      I Accept
                    </label>
                  </div>
                  {renderFieldError('terms2')}
                </div>

                <button
                  type="submit"
                  className={`w-full bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 mt-4 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Create an account'
                  )}
                </button>
              </form>

              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Already applied? Check your application status</p>
                <button
                  onClick={() => window.location.href = '/application-status'}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Check Application Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Application Submitted Successfully!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Thank you for your application to the CIVF Acceleration Program.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-1">Your Reference Number:</p>
                <p className="text-lg font-bold text-blue-600 break-all">{referenceNumber}</p>
              </div>
              <p className="text-xs text-gray-500 mb-6">
                Please save this reference number for future correspondence.
                You will also receive a confirmation email with these details.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}