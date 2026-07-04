import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { FiTrash2, FiPlus, FiCode } from 'react-icons/fi'

function Notes() {
    const { serverUrl } = useContext(authDataContext)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    // Form fields
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [code, setCode] = useState("")
    const [language, setLanguage] = useState("javascript")

    const fetchNotes = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${serverUrl}/api/notes`)
            setNotes(res.data)
        } catch (error) {
            console.error(error)
            toast.error("Failed to load notes")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setCode("")
        setLanguage("javascript")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title) {
            toast.error("Title is required")
            return
        }

        setActionLoading(true)
        try {
            const payload = {
                title,
                description,
                code,
                language
            }

            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}

            await axios.post(`${serverUrl}/api/notes`, payload, { headers, withCredentials: true })
            toast.success("Note/Snippet added successfully")

            fetchNotes()
            resetForm()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Operation failed")
        }
        setActionLoading(false)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note/snippet?")) return
        try {
            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}
            await axios.delete(`${serverUrl}/api/notes/${id}`, { headers, withCredentials: true })
            toast.success("Note/Snippet removed")
            fetchNotes()
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete note")
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
                        <h1 className='text-[26px] font-bold text-gray-900'>Manage Notes & Codes</h1>
                        <p className='text-gray-400 text-[14px] mt-[4px]'>Add, edit or delete developer code snippets and quick notes</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-[28px]'>
                    {/* Add Form */}
                    <div className='lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-[24px] h-fit'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[20px]'>Add New Note / Code</h2>
                        
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[18px]'>
                            <div>
                                <label className={labelClass}>Title</label>
                                <input
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='e.g. Centering a Div with Tailwind'
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Description / Notes</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='Write quick notes or description here...'
                                    className='w-full min-h-[80px] rounded-xl p-[14px] text-gray-800 text-[14px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200 resize-y'
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Code Snippet (Optional)</label>
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder='// Paste your code here...'
                                    className='w-full min-h-[140px] font-mono rounded-xl p-[14px] text-gray-800 text-[12px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200 resize-y'
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Programming Language</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="javascript">JavaScript / TypeScript</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="python">Python</option>
                                    <option value="bash">Bash / Shell</option>
                                    <option value="markdown">Markdown</option>
                                    <option value="json">JSON</option>
                                </select>
                            </div>

                            <button
                                type='submit'
                                className='h-[46px] rounded-full bg-black hover:bg-gray-800 text-white font-bold text-[14px] flex items-center justify-center gap-[8px] transition-all cursor-pointer shadow-md'
                                disabled={actionLoading}
                            >
                                {actionLoading ? <Loading /> : <><FiPlus /> Create Entry</>}
                            </button>
                        </form>
                    </div>

                    {/* Listing Column */}
                    <div className='lg:col-span-7 flex flex-col gap-[16px]'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[4px]'>Current Notes ({notes.length})</h2>
                        {loading ? (
                            <div className='bg-white rounded-2xl border border-gray-200 p-[32px] text-center text-gray-400'>
                                Loading notes & snippets...
                            </div>
                        ) : notes.length === 0 ? (
                            <div className='bg-white rounded-2xl border border-gray-200 p-[32px] text-center text-gray-400'>
                                No notes or code snippets added yet.
                            </div>
                        ) : (
                            <div className='flex flex-col gap-[16px]'>
                                {notes.map((note) => (
                                    <div key={note._id} className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[20px] flex flex-col justify-between'>
                                        <div>
                                            <div className='flex items-center justify-between mb-[8px]'>
                                                <h3 className='text-[16px] font-bold text-gray-900'>{note.title}</h3>
                                                <span className='text-[10px] bg-indigo-50 text-indigo-600 px-[8px] py-[2.5px] rounded-full font-semibold border border-indigo-100 uppercase tracking-wider'>{note.language}</span>
                                            </div>
                                            
                                            {note.description && (
                                                <p className='text-gray-500 text-[13px] mt-[6px] whitespace-pre-wrap leading-relaxed'>{note.description}</p>
                                            )}

                                            {note.code && (
                                                <pre className='mt-[14px] bg-zinc-950 p-[12px] rounded-xl font-mono text-[12px] overflow-x-auto border border-zinc-800 text-zinc-300 whitespace-pre leading-normal'>
                                                    <code>{note.code}</code>
                                                </pre>
                                            )}
                                        </div>

                                        <div className='flex justify-end mt-[16px] pt-[12px] border-t border-gray-100'>
                                            <button
                                                onClick={() => handleDelete(note._id)}
                                                className='h-[36px] px-[12px] rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-[6px] text-[13px] font-semibold'
                                            >
                                                <FiTrash2 size={14} /> Delete
                                            </button>
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

export default Notes
