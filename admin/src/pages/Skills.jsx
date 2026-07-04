import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { FiTrash2, FiPlus, FiUpload } from 'react-icons/fi'

function Skills() {
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
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    // Form fields
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [uploadingImage, setUploadingImage] = useState(false)

    const fetchSkills = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${serverUrl}/api/skills`)
            setSkills(res.data)
        } catch (error) {
            console.error(error)
            toast.error("Failed to load skills")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSkills()
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
                toast.success("Skill logo uploaded successfully!")
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to upload image")
        }
        setUploadingImage(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !image) {
            toast.error("Name and Logo Image are required")
            return
        }

        setActionLoading(true)
        try {
            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}

            await axios.post(`${serverUrl}/api/skills`, { name, image }, { headers, withCredentials: true })
            toast.success("Skill added successfully")

            setName("")
            setImage("")
            fetchSkills()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to add skill")
        }
        setActionLoading(false)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return
        try {
            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}
            await axios.delete(`${serverUrl}/api/skills/${id}`, { headers, withCredentials: true })
            toast.success("Skill deleted")
            fetchSkills()
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete skill")
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
                    <h1 className='text-[26px] font-bold text-gray-900'>Manage Skills</h1>
                    <p className='text-gray-400 text-[14px] mt-[4px]'>Add or remove programming languages, frameworks, or tools from your portfolio</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-[28px]'>
                    {/* Add Form */}
                    <div className='lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-[24px] h-fit'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[20px]'>Add New Skill</h2>
                        
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[18px]'>
                            <div>
                                <label className={labelClass}>Skill Name</label>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='e.g. Next JS'
                                    className={inputClass}
                                    required
                                />
                            </div>

                            {/* Logo File upload */}
                            <div>
                                <label className={labelClass}>Skill Logo</label>
                                <div className='flex items-center gap-[12px] mt-1'>
                                    <label className='flex items-center gap-[8px] justify-center px-[16px] py-[10px] border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors text-[13px] font-semibold text-gray-600 w-full'>
                                        <FiUpload /> {uploadingImage ? "Uploading..." : "Upload Logo"}
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
                                    <div className='mt-[12px] p-[10px] border border-gray-100 rounded-xl bg-gray-50 flex items-center gap-[12px]'>
                                        <img src={resolveImage(image)} alt="Preview" className='w-[40px] h-[40px] object-contain' />
                                        <span className='text-[12px] text-gray-500 truncate'>{image}</span>
                                    </div>
                                )}
                            </div>

                            <button
                                type='submit'
                                className='w-full h-[46px] rounded-full bg-black hover:bg-gray-800 text-white font-bold text-[14px] flex items-center justify-center gap-[8px] transition-all cursor-pointer shadow-md'
                                disabled={actionLoading}
                            >
                                {actionLoading ? <Loading /> : 'Add Skill'}
                            </button>
                        </form>
                    </div>

                    {/* Skill List */}
                    <div className='lg:col-span-7 flex flex-col gap-[16px]'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[4px]'>Current Skills ({skills.length})</h2>
                        {loading ? (
                            <div className='bg-white rounded-2xl border border-gray-200 p-[32px] text-center text-gray-400'>
                                Loading skills...
                            </div>
                        ) : skills.length === 0 ? (
                            <div className='bg-white rounded-2xl border border-gray-200 p-[32px] text-center text-gray-400'>
                                No skills added yet. Add one on the left.
                            </div>
                        ) : (
                            <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[24px]'>
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-[16px]'>
                                    {skills.map((skill) => (
                                        <div key={skill._id} className='relative group border border-gray-100 rounded-2xl p-[16px] flex flex-col items-center gap-[12px] hover:shadow-md transition-shadow bg-gray-50/50'>
                                            <div className='w-[50px] h-[50px] flex items-center justify-center'>
                                                <img 
                                                    src={resolveImage(skill.image)} 
                                                    alt={skill.name} 
                                                    className='w-full h-full object-contain'
                                                />
                                            </div>
                                            <span className='text-[13px] font-semibold text-gray-800 text-center'>{skill.name}</span>
                                            
                                            <button
                                                onClick={() => handleDelete(skill._id)}
                                                className='absolute top-[8px] right-[8px] w-[26px] h-[26px] rounded-full bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-red-100'
                                            >
                                                <FiTrash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skills
