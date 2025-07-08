'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplicationStatus() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleStatusCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceNumber.trim()) {
      setError('Please enter your reference number');
      return;
    }

    setLoading(true);
    setError('');
    setApplication(null);

    try {
      const response = await fetch('/api/applications');
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const applications = await response.json();
      const foundApplication = applications.find((app: any) => app.uuid === referenceNumber.trim());

      if (foundApplication) {
        setApplication(foundApplication);
      } else {
        setError('No application found with this reference number. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to check application status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Application Status Check</h1>
          <p className="text-black">Enter your reference number to check your application status</p>
        </div>

        {/* Status Check Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleStatusCheck} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="referenceNumber" className="block text-sm font-medium text-black mb-2">
                Reference Number
              </label>
              <input
                type="text"
                id="referenceNumber"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Enter your reference number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
            >
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Application Details */}
        {application && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-black">
                  {application.firstName} {application.lastName}
                </h2>
                <p className="text-black">{application.email}</p>
                <p className="text-sm text-black">Reference: {application.uuid}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-black mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-black"><span className="font-medium">Phone:</span> {application.phone}</p>
                  <p className="text-black"><span className="font-medium">Company:</span> {application.companyName}</p>
                  <p className="text-black"><span className="font-medium">Website:</span> {application.companyWebsite || 'Not provided'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-3">Product Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-black"><span className="font-medium">Product:</span> {application.productName}</p>
                  <p className="text-black"><span className="font-medium">Employees:</span> {application.employees}</p>
                  <p className="text-black"><span className="font-medium">Equity Stack:</span> {application.equityStack}%</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-black mb-3">Product Description</h3>
              <p className="text-sm text-black bg-gray-50 p-3 rounded-md">
                {application.productDescription}
              </p>
            </div>

            {application.status === 'Pending' && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                <p className="text-sm text-blue-800">
                  Your application is currently under review. Our team will evaluate your submission 
                  and you will be notified of the decision via email. This process typically takes 
                  2-3 weeks.
                </p>
              </div>
            )}

            {application.status === 'Approved' && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <h4 className="font-medium text-green-900 mb-2">Congratulations!</h4>
                <p className="text-sm text-green-800">
                  Your application has been approved! You will receive further instructions 
                  via email regarding the next steps in the acceleration program.
                </p>
              </div>
            )}

            {application.status === 'Rejected' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <h4 className="font-medium text-red-900 mb-2">Application Status</h4>
                <p className="text-sm text-red-800">
                  Unfortunately, your application was not selected for this round. 
                  We encourage you to apply again in future cycles as your business evolves.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Back to Application Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/accelaration-program#form')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            Apply for Acceleration Program
          </button>
        </div>
      </div>
    </div>
  );
} 