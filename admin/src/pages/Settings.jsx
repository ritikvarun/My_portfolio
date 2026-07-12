import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { FiSave, FiUpload } from 'react-icons/fi'

function Settings() {
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
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    // Form fields
    const [developerName, setDeveloperName] = useState("")
    const [developerTitle, setDeveloperTitle] = useState("")
    const [bio, setBio] = useState("")
    const [aboutQuote, setAboutQuote] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [contactPhone, setContactPhone] = useState("")
    const [contactAddress, setContactAddress] = useState("")
    const [githubUrl, setGithubUrl] = useState("")
    const [linkedinUrl, setLinkedinUrl] = useState("")
    const [instagramUrl, setInstagramUrl] = useState("")
    const [resumeUrl, setResumeUrl] = useState("")
    const [whatsappUrl, setWhatsappUrl] = useState("")
    const [aboutBio, setAboutBio] = useState("")
    
    // Photo paths
    const [profileImage, setProfileImage] = useState("")
    const [aboutImage, setAboutImage] = useState("")

    // Upload loaders
    const [uploadingCV, setUploadingCV] = useState(false)
    const [uploadingProfile, setUploadingProfile] = useState(false)
    const [uploadingAboutImg, setUploadingAboutImg] = useState(false)

    const fetchSettings = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${serverUrl}/api/settings`)
            const data = res.data
            setDeveloperName(data.developerName || "")
            setDeveloperTitle(data.developerTitle || "")
            setBio(data.bio || "")
            setAboutQuote(data.aboutQuote || "")
            setContactEmail(data.contactEmail || "")
            setContactPhone(data.contactPhone || "")
            setContactAddress(data.contactAddress || "")
            setGithubUrl(data.githubUrl || "")
            setLinkedinUrl(data.linkedinUrl || "")
            setInstagramUrl(data.instagramUrl || "")
            setResumeUrl(data.resumeUrl || "")
            setWhatsappUrl(data.whatsappUrl || "")
            setAboutBio(data.aboutBio || "")
            setProfileImage(data.profileImage || "")
            setAboutImage(data.aboutImage || "")
        } catch (error) {
            console.error(error)
            toast.error("Failed to load settings")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setActionLoading(true)
        try {
            const payload = {
                developerName,
                developerTitle,
                bio,
                aboutQuote,
                contactEmail,
                contactPhone,
                contactAddress,
                githubUrl,
                linkedinUrl,
                instagramUrl,
                whatsappUrl,
                aboutBio,
                resumeUrl,
                profileImage,
                aboutImage
            }
            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}
            const res = await axios.post(`${serverUrl}/api/settings`, payload, { headers, withCredentials: true })
            if (res.data.success) {
                toast.success("Profile Settings saved successfully!")
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to save settings")
        }
        setActionLoading(false)
    }

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0]
        if (!file) return

        if (type === 'cv') setUploadingCV(true)
        if (type === 'profile') setUploadingProfile(true)
        if (type === 'aboutImg') setUploadingAboutImg(true)

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
                const uploadedUrl = res.data.fileUrl

                // Set state
                if (type === 'cv') setResumeUrl(uploadedUrl)
                if (type === 'profile') setProfileImage(uploadedUrl)
                if (type === 'aboutImg') setAboutImage(uploadedUrl)

                // Auto-save the uploaded URL immediately to DB
                const savePayload = {}
                if (type === 'cv') savePayload.resumeUrl = uploadedUrl
                if (type === 'profile') savePayload.profileImage = uploadedUrl
                if (type === 'aboutImg') savePayload.aboutImage = uploadedUrl

                try {
                    await axios.post(`${serverUrl}/api/settings`, savePayload, {
                        headers,
                        withCredentials: true
                    })
                    toast.success(`${type === 'cv' ? 'CV/Resume' : 'Image'} uploaded & saved!`)
                } catch (saveErr) {
                    console.error('Auto-save failed:', saveErr)
                    toast.success('File uploaded! Click "Save Settings" to save.')
                }
            } else {
                toast.error('Upload failed: ' + (res.data.message || 'Unknown error'))
            }
        } catch (error) {
            console.error('Upload error details:', error?.response?.data || error.message)
            toast.error('Upload failed: ' + (error?.response?.data?.message || error.message || 'Server error'))
        } finally {
            setUploadingCV(false)
            setUploadingProfile(false)
            setUploadingAboutImg(false)
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
                    <h1 className='text-[26px] font-bold text-gray-900'>Profile Settings</h1>
                    <p className='text-gray-400 text-[14px] mt-[4px]'>Customize your developer details, hero section bio, resume CV and social links</p>
                </div>

                {loading ? (
                    <div className='text-center py-[60px] text-gray-500'>Loading settings details...</div>
                ) : (
                    <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[32px] max-w-[820px]'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[28px]'>
                            
                            {/* General Profile */}
                            <div>
                                <h3 className='text-[15px] font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4'>1. General Profile</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px]'>
                                    <div>
                                        <label className={labelClass}>Developer Name</label>
                                        <input
                                            type='text'
                                            value={developerName}
                                            onChange={(e) => setDeveloperName(e.target.value)}
                                            placeholder='e.g. Ritik Varun'
                                            className={inputClass}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Professional Title</label>
                                        <input
                                            type='text'
                                            value={developerTitle}
                                            onChange={(e) => setDeveloperTitle(e.target.value)}
                                            placeholder='e.g. Frontend Developer'
                                            className={inputClass}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bio / About Quote */}
                            <div>
                                <h3 className='text-[15px] font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4'>2. Bio & Introductions</h3>
                                <div className='flex flex-col gap-[16px]'>
                                    <div>
                                        <label className={labelClass}>About Tagline / Quote</label>
                                        <input
                                            type='text'
                                            value={aboutQuote}
                                            onChange={(e) => setAboutQuote(e.target.value)}
                                            placeholder='e.g. A brief introduction about me and my interest.'
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Main Bio Paragraph (Homepage)</label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder='Write your full profile summary here...'
                                            className='w-full min-h-[100px] rounded-xl p-[14px] text-gray-800 text-[14px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200 resize-y'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>About Page Biography Paragraph</label>
                                        <textarea
                                            value={aboutBio}
                                            onChange={(e) => setAboutBio(e.target.value)}
                                            placeholder='Write your detailed bio for the About page here...'
                                            className='w-full min-h-[120px] rounded-xl p-[14px] text-gray-800 text-[14px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200 resize-y'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div>
                                <h3 className='text-[15px] font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4'>3. Contact & Social Info</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[16px]'>
                                    <div>
                                        <label className={labelClass}>Contact Email</label>
                                        <input
                                            type='email'
                                            value={contactEmail}
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            placeholder='ritikvarun@example.com'
                                            className={inputClass}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Contact Phone</label>
                                        <input
                                            type='text'
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                            placeholder='+91 ...'
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[16px]'>
                                    <div>
                                        <label className={labelClass}>GitHub URL</label>
                                        <input
                                            type='url'
                                            value={githubUrl}
                                            onChange={(e) => setGithubUrl(e.target.value)}
                                            placeholder='https://github.com/...'
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>LinkedIn URL</label>
                                        <input
                                            type='url'
                                            value={linkedinUrl}
                                            onChange={(e) => setLinkedinUrl(e.target.value)}
                                            placeholder='https://linkedin.com/in/...'
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Instagram URL</label>
                                        <input
                                            type='url'
                                            value={instagramUrl}
                                            onChange={(e) => setInstagramUrl(e.target.value)}
                                            placeholder='https://instagram.com/...'
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>WhatsApp Link / Number</label>
                                        <input
                                            type='text'
                                            value={whatsappUrl}
                                            onChange={(e) => setWhatsappUrl(e.target.value)}
                                            placeholder='e.g. +919876543210'
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Attachments & Images */}
                            <div>
                                <h3 className='text-[15px] font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4'>4. Profile Images & CV</h3>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-[16px]'>
                                    {/* CV Resume upload */}
                                    <div className='p-[16px] border border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center'>
                                        <label className={labelClass}>Upload Resume (PDF)</label>
                                        <label className='flex items-center gap-[8px] justify-center px-[12px] py-[8px] border border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors text-[12px] font-semibold text-gray-600 w-full mt-2'>
                                            <FiUpload /> {uploadingCV ? 'Uploading...' : 'Choose PDF'}
                                            <input type='file' accept='.pdf' onChange={(e) => handleFileUpload(e, 'cv')} className='hidden' disabled={uploadingCV} />
                                        </label>
                                        {resumeUrl && <span className='text-[10px] text-gray-400 mt-2 truncate w-full'>{resumeUrl}</span>}
                                    </div>

                                    {/* Profile Image upload */}
                                    <div className='p-[16px] border border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center'>
                                        <label className={labelClass}>Profile Image</label>
                                        <label className='flex items-center gap-[8px] justify-center px-[12px] py-[8px] border border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors text-[12px] font-semibold text-gray-600 w-full mt-2'>
                                            <FiUpload /> {uploadingProfile ? 'Uploading...' : 'Choose Image'}
                                            <input type='file' accept='image/*' onChange={(e) => handleFileUpload(e, 'profile')} className='hidden' disabled={uploadingProfile} />
                                        </label>
                                        {profileImage && (
                                            <img src={resolveImage(profileImage)} alt="profile" className='w-[40px] h-[40px] rounded-full object-cover mt-2' />
                                        )}
                                    </div>

                                    {/* About Image upload */}
                                    <div className='p-[16px] border border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center'>
                                        <label className={labelClass}>About Section Image</label>
                                        <label className='flex items-center gap-[8px] justify-center px-[12px] py-[8px] border border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors text-[12px] font-semibold text-gray-600 w-full mt-2'>
                                            <FiUpload /> {uploadingAboutImg ? 'Uploading...' : 'Choose Image'}
                                            <input type='file' accept='image/*' onChange={(e) => handleFileUpload(e, 'aboutImg')} className='hidden' disabled={uploadingAboutImg} />
                                        </label>
                                        {aboutImage && (
                                            <img src={resolveImage(aboutImage)} alt="about" className='w-[40px] h-[40px] rounded-lg object-cover mt-2' />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type='submit'
                                className='w-full h-[46px] rounded-full bg-black hover:bg-gray-800 text-white font-bold text-[14px] flex items-center justify-center gap-[8px] hover:shadow-lg transition-all cursor-pointer shadow-md'
                                disabled={actionLoading}
                            >
                                {actionLoading ? <Loading /> : <>
                                    <FiSave /> Save Settings
                                </>}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Settings
