'use client'
import { useState, useEffect } from "react";

type Applications = {
        _id:string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        equityStack: string,
        linkedIn: string,
        companyName: string,
        companyWebsite: string,
        coFounder: string,
        productName: string,
        productDescription: string,
        productDemoURL: string,
        employees: string,
        isPrimary: string,
        uuid: string,
        status: string,
        nameInvestor: string,
        otherInvestors: string, 
        investmentInINR?: string,
        investmentTime?: string,
        files?: any[],
        createdAt?: Date,
}

export default function Applications(){
    const [applications,setApplications] = useState<Applications[]>([]);
    const [filteredApplications, setFilteredApplications] = useState<Applications[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchApplications = async() =>{
        try{
            setLoading(true);
            const res = await fetch('/api/applications');
            if (!res.ok) throw new Error("Failed to fetch applications");
            const data = await res.json();
            setApplications(data);
            setFilteredApplications(data);
            setError(null);
        }catch (err){
            console.error('Error fetching applications: ', err);
            setError('Failed to fetch applications');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, []);

    useEffect(() => {
        let filtered = applications;
        
        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(app => 
                app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }
        
        setFilteredApplications(filtered);
    }, [applications, searchTerm, statusFilter]);

    const updateApplicationStatus = async (id: string, status: string) => {
        try {
            const res = await fetch('/api/applications', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status }),
            });

            if (!res.ok) throw new Error('Failed to update status');
            
            // Refresh the applications list
            await fetchApplications();
        } catch (err) {
            console.error('Error updating application status: ', err);
            setError('Failed to update application status');
        }
    };

    const deleteApplication = async (id: string) => {
        if (!confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
            return;
        }

        try {
            setDeletingId(id);
            const res = await fetch('/api/applications', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error('Failed to delete application');
            
            // Refresh the applications list
            await fetchApplications();
        } catch (err) {
            console.error('Error deleting application: ', err);
            setError('Failed to delete application');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-black">Loading applications...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 text-black">
            <h1 className="text-3xl font-bold mb-8 text-center text-white">Applications Management</h1>
            
            {/* Search and Filter Controls */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search by name, email, company, or product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                    />
                </div>
                <div className="md:w-48">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Statistics */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-black">Total Applications</h3>
                    <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-black">Pending</h3>
                    <p className="text-2xl font-bold text-yellow-600">{applications.filter(app => app.status === 'Pending').length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-black">Approved</h3>
                    <p className="text-2xl font-bold text-green-600">{applications.filter(app => app.status === 'Approved').length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-black">Rejected</h3>
                    <p className="text-2xl font-bold text-red-600">{applications.filter(app => app.status === 'Rejected').length}</p>
                </div>
            </div>

            <div className="grid gap-6">
                {filteredApplications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {applications.length === 0 ? 'No applications found' : 'No applications match your search criteria'}
                    </div>
                ) : (
                    filteredApplications.map((app) => (
                        <div key={app._id} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-black">
                                        {app.firstName} {app.lastName}
                                    </h2>
                                    <p className="text-gray-600">{app.email}</p>
                                    <p className="text-sm text-gray-500">ID: {app.uuid}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {app.status}
                                    </span>
                                    <select
                                        value={app.status}
                                        onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                                        className="px-3 py-1 rounded text-sm text-black bg-white shadow-sm"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                    <button
                                        onClick={() => deleteApplication(app._id)}
                                        disabled={deletingId === app._id}
                                        className={`px-3 py-1 rounded text-sm font-medium shadow-sm ${
                                            deletingId === app._id
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-red-600 hover:bg-red-700 text-white'
                                        }`}
                                    >
                                        {deletingId === app._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h3 className="font-semibold text-black mb-2">Contact Information</h3>
                                    <p className="text-black"><strong>Phone:</strong> {app.phone}</p>
                                    <p className="text-black"><strong>LinkedIn:</strong> <a href={app.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{app.linkedIn || 'Not provided'}</a></p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-black mb-2">Company Details</h3>
                                    <p className="text-black"><strong>Company:</strong> {app.companyName}</p>
                                    <p className="text-black"><strong>Website:</strong> <a href={app.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{app.companyWebsite || 'Not provided'}</a></p>
                                    <p className="text-black"><strong>Employees:</strong> {app.employees}</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold text-black mb-2">Product Information</h3>
                                <p className="text-black"><strong>Product Name:</strong> {app.productName}</p>
                                <p className="text-black"><strong>Description:</strong> {app.productDescription}</p>
                                <p className="text-black"><strong>Demo URL:</strong> <a href={app.productDemoURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{app.productDemoURL || 'Not provided'}</a></p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h3 className="font-semibold text-black mb-2">Additional Information</h3>
                                    <p className="text-black"><strong>Equity Stack:</strong> {app.equityStack}</p>
                                    <p className="text-black"><strong>Co-Founder:</strong> {app.coFounder}</p>
                                    <p className="text-black"><strong>Primary Contact:</strong> {app.isPrimary}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-black mb-2">Investment Details</h3>
                                    {app.nameInvestor && <p className="text-black"><strong>Investor:</strong> {app.nameInvestor}</p>}
                                    {app.investmentInINR && <p className="text-black"><strong>Investment (INR):</strong> {app.investmentInINR}</p>}
                                    {app.investmentTime && <p className="text-black"><strong>Investment Time:</strong> {app.investmentTime}</p>}
                                    {app.otherInvestors && <p className="text-black"><strong>Other Investors:</strong> {app.otherInvestors}</p>}
                                </div>
                            </div>

                            {app.files && app.files.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-black">Attached Files</h3>
                                        <button
                                            onClick={() => {
                                                if (app.files) {
                                                    app.files.forEach((file, index) => {
                                                        setTimeout(() => {
                                                            const url = `/api/applications/files/${file.fileId}?filename=${encodeURIComponent(file.filename || `file_${index + 1}`)}`;
                                                            const link = document.createElement('a');
                                                            link.href = url;
                                                            link.download = file.filename || `file_${index + 1}`;
                                                            document.body.appendChild(link);
                                                            link.click();
                                                            document.body.removeChild(link);
                                                        }, index * 500); // Stagger downloads by 500ms
                                                    });
                                                }
                                            }}
                                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium shadow-sm"
                                        >
                                            Download All Files
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {app.files.map((file, index) => (
                                            <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded text-sm text-black">
                                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <span>{file.filename || `File ${index + 1}`}</span>
                                                <button
                                                    onClick={() => {
                                                        const url = `/api/applications/files/${file.fileId}?filename=${encodeURIComponent(file.filename || `file_${index + 1}`)}`;
                                                        const link = document.createElement('a');
                                                        link.href = url;
                                                        link.download = file.filename || `file_${index + 1}`;
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    }}
                                                    className="ml-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium shadow-sm"
                                                >
                                                    Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
