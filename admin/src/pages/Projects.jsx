import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { FiTrash2, FiEdit, FiPlus, FiUpload, FiLink, FiGithub } from 'react-icons/fi'

function Projects() {
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
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    // Form fields
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [detail, setDetail] = useState("")
    const [demo, setDemo] = useState("")
    const [github, setGithub] = useState("")
    const [category, setCategory] = useState("Frontend")
    
    // Screenshot upload array
    const [images, setImages] = useState([])
    const [uploadingImage, setUploadingImage] = useState(false)

    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)

    const fetchProjects = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${serverUrl}/api/projects`)
            setProjects(res.data)
        } catch (error) {
            console.error(error)
            toast.error("Failed to load projects")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    const resetForm = () => {
        setName("")
        setDescription("")
        setDetail("")
        setDemo("")
        setGithub("")
        setCategory("Frontend")
        setImages([])
        setIsEditing(false)
        setEditId(null)
    }

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
                // Add the new file URL to the array
                setImages([...images, res.data.fileUrl])
                toast.success("Image uploaded successfully!")
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to upload image")
        }
        setUploadingImage(false)
    }

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, idx) => idx !== indexToRemove))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !description) {
            toast.error("Title and Description are required")
            return
        }

        setActionLoading(true)
        try {
            const payload = {
                name,
                description,
                Detail: detail,
                demo,
                github,
                category,
                images
            }

            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}

            let result
            if (isEditing) {
                result = await axios.put(`${serverUrl}/api/projects/${editId}`, payload, { headers, withCredentials: true })
                toast.success("Project updated successfully")
            } else {
                result = await axios.post(`${serverUrl}/api/projects`, payload, { headers, withCredentials: true })
                toast.success("Project added successfully")
            }

            fetchProjects()
            resetForm()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Operation failed")
        }
        setActionLoading(false)
    }

    const startEdit = (proj) => {
        setIsEditing(true)
        setEditId(proj._id)
        setName(proj.name)
        setDescription(proj.description || "")
        setDetail(proj.Detail || "")
        setDemo(proj.demo || "")
        setGithub(proj.github || "")
        setCategory(proj.category || "Frontend")
        setImages(proj.images || [])
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return
        try {
            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}
            await axios.delete(`${serverUrl}/api/projects/${id}`, { headers, withCredentials: true })
            toast.success("Project removed")
            fetchProjects()
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete project")
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
                <div className='mb-[28px] flex items-center justify-between'>
                    <div>
                        <h1 className='text-[26px] font-bold text-gray-900'>Manage Projects</h1>
                        <p className='text-gray-400 text-[14px] mt-[4px]'>Add, edit or delete projects in your developer portfolio</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-[28px]'>
                    {/* Add / Edit Form */}
                    <div className='lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-[24px] h-fit'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[20px]'>
                            {isEditing ? "Edit Project" : "Add New Project"}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[18px]'>
                            <div>
                                <label className={labelClass}>Project Title</label>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='e.g. ShopX E-commerce'
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Project Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="Frontend">Frontend</option>
                                    <option value="Full Stack">Full Stack</option>
                                    <option value="AI Project">AI Project</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Brief Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='e.g. Developed a full-stack e-commerce app with voice controls'
                                    className='w-full min-h-[70px] rounded-xl p-[14px] text-gray-800 text-[14px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200 resize-y'
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Detailed Detail (HTML / Paragraphs)</label>
                                <textarea
                                    value={detail}
                                    onChange={(e) => setDetail(e.target.value)}
                                    placeholder='e.g. Detailed breakdown of features, front-end architecture, backend routing...'
                                    className='w-full min-h-[110px] rounded-xl p-[14px] text-gray-800 text-[14px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200 resize-y'
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-[12px]'>
                                <div>
                                    <label className={labelClass}>Live Demo Link</label>
                                    <input
                                        type='url'
                                        value={demo}
                                        onChange={(e) => setDemo(e.target.value)}
                                        placeholder='https://...'
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>GitHub Repo Link</label>
                                    <input
                                        type='url'
                                        value={github}
                                        onChange={(e) => setGithub(e.target.value)}
                                        placeholder='https://github.com/...'
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Image upload */}
                            <div>
                                <label className={labelClass}>Project Screenshots</label>
                                <div className='flex items-center gap-[12px] mt-1'>
                                    <label className='flex items-center gap-[8px] justify-center px-[16px] py-[10px] border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors text-[13px] font-semibold text-gray-600 w-full'>
                                        <FiUpload /> {uploadingImage ? "Uploading..." : "Upload Screenshot"}
                                        <input
                                            type='file'
                                            onChange={handleImageUpload}
                                            className='hidden'
                                            accept='image/*'
                                            disabled={uploadingImage}
                                        />
                                    </label>
                                </div>
                                
                                {/* Uploaded Image Previews */}
                                {images.length > 0 && (
                                    <div className='flex flex-wrap gap-[10px] mt-[12px]'>
                                        {images.map((img, index) => (
                                            <div key={index} className='relative w-[80px] h-[60px] border border-gray-200 rounded-lg overflow-hidden group'>
                                                <img src={resolveImage(img)} alt="Preview" className='w-full h-full object-cover' />
                                                <button
                                                    type='button'
                                                    onClick={() => removeImage(index)}
                                                    className='absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity'
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className='flex gap-[12px] mt-[8px]'>
                                <button
                                    type='submit'
                                    className='flex-1 h-[46px] rounded-full bg-black hover:bg-gray-800 text-white font-bold text-[14px] flex items-center justify-center gap-[8px] transition-all cursor-pointer shadow-md'
                                    disabled={actionLoading}
                                >
                                    {actionLoading ? <Loading /> : isEditing ? 'Save Changes' : 'Create Project'}
                                </button>
                                {isEditing && (
                                    <button
                                        type='button'
                                        onClick={resetForm}
                                        className='px-[20px] h-[46px] rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-[14px] transition-all cursor-pointer'
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Project List */}
                    <div className='lg:col-span-7 flex flex-col gap-[16px]'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[4px]'>Current Projects ({projects.length})</h2>
                        {loading ? (
                            <div className='bg-white rounded-2xl border border-gray-200 p-[32px] text-center text-gray-400'>
                                Loading projects...
                            </div>
                        ) : projects.length === 0 ? (
                            <div className='bg-white rounded-2xl border border-gray-200 p-[32px] text-center text-gray-400'>
                                No projects added yet. Get started by creating one.
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-[16px]'>
                                {projects.map((proj) => (
                                    <div key={proj._id} className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col'>
                                        {/* Cover screenshot */}
                                        <div className='h-[140px] bg-gray-100 relative'>
                                            {proj.images && proj.images.length > 0 ? (
                                                <img 
                                                    src={resolveImage(proj.images[0])} 
                                                    alt={proj.name} 
                                                    className='w-full h-full object-cover' 
                                                />
                                            ) : (
                                                <div className='w-full h-full flex items-center justify-center text-gray-300 text-[13px]'>
                                                    No screenshots uploaded
                                                </div>
                                            )}
                                        </div>

                                        <div className='p-[20px] flex-1 flex flex-col justify-between'>
                                            <div>
                                                <span className='text-[10px] bg-indigo-50 text-indigo-600 px-[8px] py-[2.5px] rounded-full font-semibold mb-[8px] inline-block uppercase tracking-wider border border-indigo-100'>{proj.category || 'Frontend'}</span>
                                                <h3 className='text-[16px] font-bold text-gray-900'>{proj.name}</h3>
                                                <p className='text-gray-400 text-[13px] mt-[6px] line-clamp-2'>{proj.description}</p>
                                                
                                                <div className='flex gap-[12px] mt-[14px] text-gray-400'>
                                                    {proj.demo && (
                                                        <a href={proj.demo} target='_blank' rel='noreferrer' className='hover:text-black flex items-center gap-[4px] text-[12px] font-medium'>
                                                            <FiLink /> Demo
                                                        </a>
                                                    )}
                                                    {proj.github && (
                                                        <a href={proj.github} target='_blank' rel='noreferrer' className='hover:text-black flex items-center gap-[4px] text-[12px] font-medium'>
                                                            <FiGithub /> GitHub
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            <div className='flex gap-[10px] mt-[20px] pt-[14px] border-t border-gray-100'>
                                                <button
                                                    onClick={() => startEdit(proj)}
                                                    className='flex-1 h-[36px] rounded-lg border border-gray-200 text-gray-700 font-semibold text-[13px] flex items-center justify-center gap-[6px] hover:bg-gray-50 transition-colors'
                                                >
                                                    <FiEdit size={14} /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(proj._id)}
                                                    className='h-[36px] w-[36px] rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center'
                                                >
                                                    <FiTrash2 size={15} />
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

export default Projects
