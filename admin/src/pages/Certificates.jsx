import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { FiTrash2, FiPlus, FiUpload, FiLink } from 'react-icons/fi'

function Certificates() {
    const { serverUrl, frontendUrl } = useContext(authDataContext)
    const resolveImage = (path) => {
        if (!path) return "";
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        if (path.startsWith('/uploads/') || path.startsWith('uploads/')) {
            const cleanPath = path.startsWith('/') ? path : `/${path}`;
            return `${serverUrl}${cleanPath}`;
        }
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${frontendUrl}${cleanPath}`;
    };
    const [certificates, setCertificates] = useState([])
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    // Form fields
    const [title, setTitle] = useState("")
    const [issuer, setIssuer] = useState("")
    const [image, setImage] = useState("")
    const [link, setLink] = useState("")
    const [uploadingImage, setUploadingImage] = useState(false)

    const fetchCertificates = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${serverUrl}/api/certificates`)
            setCertificates(res.data)
        } catch (error) {
            console.error(error)
            toast.error("Failed to load certificates")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchCertificates()
    }, [])

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploadingImage(true)
        try {
            const formData = new FormData()
            formData.append('image', file)

            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}

            const res = await axios.post(`${serverUrl}/api/upload`, formData, {
                headers: { ...headers, 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })

            if (res.data.success) {
                setImage(res.data.fileUrl)
                toast.success("Certificate image uploaded successfully!")
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to upload image")
        }
        setUploadingImage(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !issuer || !image) {
            toast.error("Title, Issuer and Image are required")
            return
        }

        setActionLoading(true)
        try {
            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}

            const payload = { title, issuer, image, link }

            await axios.post(`${serverUrl}/api/certificates`, payload, { headers, withCredentials: true })
            toast.success("Certificate added successfully")

            setTitle("")
            setIssuer("")
            setImage("")
            setLink("")
            fetchCertificates()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to add certificate")
        }
        setActionLoading(false)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this certificate?")) return
        try {
            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}
            await axios.delete(`${serverUrl}/api/certificates/${id}`, { headers, withCredentials: true })
            toast.success("Certificate removed")
            fetchCertificates()
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete certificate")
        }
    }

    const inputClass = 'w-full h-[44px] rounded-xl px-[14px] text-gray-800 text-[14px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200'
    const labelClass = 'text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-[6px] block'

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gray-50'>
            <Nav />
            <Sidebar />

            <div className='md:ml-[220px] pt-[80px] pb-[100px] md:pb-[32px] px-[16px] md:px-[32px]'>
                
                {/* Header */}
                <div className='mb-[28px]'>
                    <h1 className='text-[26px] font-bold text-gray-900'>Manage Certificates</h1>
                    <p className='text-gray-400 text-[14px] mt-[4px]'>Add or delete certification and course credentials from your portfolio</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-[28px]'>
                    {/* Add Form */}
                    <div className='lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-[24px] h-fit'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[20px]'>Add New Certificate</h2>
                        
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[18px]'>
                            <div>
                                <label className={labelClass}>Certificate Title</label>
                                <input
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='e.g. React Developer Certification'
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Issuer Name</label>
                                <input
                                    type='text'
                                    value={issuer}
                                    onChange={(e) => setIssuer(e.target.value)}
                                    placeholder='e.g. Scaler Topics'
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Credential Link</label>
                                <input
                                    type='url'
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    placeholder='https://...'
                                    className={inputClass}
                                />
                            </div>

                            {/* Certificate Image upload */}
                            <div>
                                <label className={labelClass}>Certificate Proof (Image)</label>
                                <div className='flex items-center gap-[12px] mt-1'>
                                    <label className='flex items-center gap-[8px] justify-center px-[16px] py-[10px] border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors text-[13px] font-semibold text-gray-600 w-full'>
                                        <FiUpload /> {uploadingImage ? "Uploading..." : "Upload Certificate Image"}
                                        <input
                                            type='file'
                                            onChange={handleImageUpload}
                                            className='hidden'
                                            accept='image/*'
                                            disabled={uploadingImage}
                                        />
                                    </label>
                                </div>
                                
                                {image && (
                                    <div className='mt-[12px] relative w-full h-[150px] border border-gray-200 rounded-xl overflow-hidden'>
                                        <img src={resolveImage(image)} alt="Preview" className='w-full h-full object-cover' />
                                    </div>
                                )}
                            </div>

                            <button
                                type='submit'
                                className='w-full h-[46px] rounded-full bg-black hover:bg-gray-800 text-white font-bold text-[14px] flex items-center justify-center gap-[8px] transition-all cursor-pointer shadow-md'
                                disabled={actionLoading}
                            >
                                {actionLoading ? <Loading /> : 'Add Certificate'}
                            </button>
                        </form>
                    </div>

                    {/* Certificate List */}
                    <div className='lg:col-span-7 flex flex-col gap-[16px]'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[4px]'>Current Certificates ({certificates.length})</h2>
                        {loading ? (
                            <div className='bg-white rounded-2xl border border-gray-200 p-[32px] text-center text-gray-400'>
                                Loading certificates...
                            </div>
                        ) : certificates.length === 0 ? (
                            <div className='bg-white rounded-2xl border border-gray-200 p-[32px] text-center text-gray-400'>
                                No certificates added yet. Add one on the left.
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px]'>
                                {certificates.map((cert) => (
                                    <div key={cert._id} className='relative group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col'>
                                        {/* Certificate Image preview */}
                                        <div className='h-[120px] bg-gray-100 relative'>
                                            <img 
                                                src={resolveImage(cert.image)} 
                                                alt={cert.title} 
                                                className='w-full h-full object-cover'
                                            />
                                        </div>

                                        <div className='p-[16px] flex-1 flex flex-col justify-between'>
                                            <div>
                                                <h3 className='text-[14px] font-bold text-gray-900 leading-tight'>{cert.title}</h3>
                                                <p className='text-gray-400 text-[12px] mt-[4px] font-medium'>By {cert.issuer}</p>
                                                
                                                {cert.link && (
                                                    <a href={cert.link} target='_blank' rel='noreferrer' className='hover:text-black flex items-center gap-[4px] text-[12px] font-medium text-gray-400 mt-[10px] w-fit'>
                                                        <FiLink /> Credential Link
                                                    </a>
                                                )}
                                            </div>

                                            <div className='mt-[16px] pt-[10px] border-t border-gray-100 flex justify-end'>
                                                <button
                                                    onClick={() => handleDelete(cert._id)}
                                                    className='h-[30px] w-full rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-[4px] text-[12px] font-semibold cursor-pointer'
                                                >
                                                    <FiTrash2 size={13} /> Delete Certificate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Certificates
