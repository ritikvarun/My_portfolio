import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { FiGrid, FiAward, FiCode, FiSettings, FiUser } from 'react-icons/fi'
import Loading from '../component/Loading'

function Home() {
    const [totalProjects, setTotalProjects] = useState(0)
    const [totalSkills, setTotalSkills] = useState(0)
    const [totalCertificates, setTotalCertificates] = useState(0)
    const [settings, setSettings] = useState(null)
    const { serverUrl } = useContext(authDataContext)

    const fetchDashboardData = async () => {
        try {
            const projectsRes = await axios.get(`${serverUrl}/api/projects`, { withCredentials: true })
            setTotalProjects(projectsRes.data.length)
            
            const skillsRes = await axios.get(`${serverUrl}/api/skills`, { withCredentials: true })
            setTotalSkills(skillsRes.data.length)
            
            const certsRes = await axios.get(`${serverUrl}/api/certificates`, { withCredentials: true })
            setTotalCertificates(certsRes.data.length)

            const settingsRes = await axios.get(`${serverUrl}/api/settings`, { withCredentials: true })
            setSettings(settingsRes.data)
        } catch (err) {
            console.error("Failed to fetch dashboard counts", err)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gray-50'>
            <Nav />
            <Sidebar />

            <div className='md:ml-[220px] pt-[80px] pb-[100px] md:pb-[32px] px-[16px] md:px-[32px]'>
                {/* Page header */}
                <div className='mb-[32px]'>
                    <h1 className='text-[26px] font-bold text-gray-900'>Dashboard Overview</h1>
                    <p className='text-gray-400 text-[14px] mt-[4px]'>
                        Manage your Developer Portfolio Website from one place 👋
                    </p>
                </div>

                {/* Stat cards */}
                <div className='flex flex-wrap gap-[20px] mb-[32px]'>
                    {/* Projects count */}
                    <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[28px] flex items-center gap-[20px] flex-1 min-w-[220px]'>
                        <div className='w-[52px] h-[52px] bg-lime-50 rounded-xl flex items-center justify-center'>
                            <FiGrid className='w-[24px] h-[24px] text-lime-600' />
                        </div>
                        <div>
                            <p className='text-[13px] text-gray-400 font-medium'>Total Projects</p>
                            <p className='text-[34px] font-bold text-gray-900 leading-tight'>{totalProjects}</p>
                        </div>
                    </div>

                    {/* Skills Count */}
                    <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[28px] flex items-center gap-[20px] flex-1 min-w-[220px]'>
                        <div className='w-[52px] h-[52px] bg-pink-50 rounded-xl flex items-center justify-center'>
                            <FiCode className='w-[24px] h-[24px] text-pink-600' />
                        </div>
                        <div>
                            <p className='text-[13px] text-gray-400 font-medium'>Total Skills</p>
                            <p className='text-[34px] font-bold text-gray-900 leading-tight'>{totalSkills}</p>
                        </div>
                    </div>

                    {/* Certificates Count */}
                    <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[28px] flex items-center gap-[20px] flex-1 min-w-[220px]'>
                        <div className='w-[52px] h-[52px] bg-cyan-50 rounded-xl flex items-center justify-center'>
                            <FiAward className='w-[24px] h-[24px] text-cyan-600' />
                        </div>
                        <div>
                            <p className='text-[13px] text-gray-400 font-medium'>Certificates</p>
                            <p className='text-[34px] font-bold text-gray-900 leading-tight'>{totalCertificates}</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-[24px]'>
                    {/* Website Overview Info */}
                    <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[32px]'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[20px] flex items-center gap-[8px]'>
                            <FiUser className='text-lime-600' /> Developer Profile Settings
                        </h2>
                        {settings ? (
                            <div className='flex flex-col gap-[14px]'>
                                <div className='flex justify-between border-b border-gray-100 pb-[10px]'>
                                    <span className='text-[14px] text-gray-400 font-medium'>Name</span>
                                    <span className='text-[14px] text-gray-800 font-semibold'>{settings.developerName}</span>
                                </div>
                                <div className='flex justify-between border-b border-gray-100 pb-[10px]'>
                                    <span className='text-[14px] text-gray-400 font-medium'>Title</span>
                                    <span className='text-[14px] text-gray-800 font-semibold'>{settings.developerTitle}</span>
                                </div>
                                <div className='flex justify-between border-b border-gray-100 pb-[10px]'>
                                    <span className='text-[14px] text-gray-400 font-medium'>Email</span>
                                    <span className='text-[14px] text-gray-800 font-semibold'>{settings.contactEmail}</span>
                                </div>
                                <div className='flex justify-between border-b border-gray-100 pb-[10px]'>
                                    <span className='text-[14px] text-gray-400 font-medium'>CV Resume Path</span>
                                    <span className='text-[14px] text-gray-800 font-semibold'>{settings.resumeUrl}</span>
                                </div>
                                <div className='flex flex-col gap-[4px] mt-[10px]'>
                                    <span className='text-[12px] text-gray-400 font-semibold uppercase tracking-wider'>Social URLs</span>
                                    <p className='text-[14px] text-gray-700 font-medium'>🐙 GitHub: <a href={settings.githubUrl} className='text-blue-500' target='_blank' rel='noreferrer'>{settings.githubUrl}</a></p>
                                    <p className='text-[14px] text-gray-700 font-medium'>🔗 LinkedIn: <a href={settings.linkedinUrl} className='text-blue-500' target='_blank' rel='noreferrer'>{settings.linkedinUrl}</a></p>
                                </div>
                            </div>
                        ) : (
                            <p className='text-gray-400 text-[14px]'>Loading profile details...</p>
                        )}
                    </div>

                    {/* Bio Overview */}
                    <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[32px]'>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[20px] flex items-center gap-[8px]'>
                            <FiSettings className='text-cyan-600' /> Developer Bio
                        </h2>
                        {settings ? (
                            <div>
                                <p className='text-gray-600 text-[14px] leading-relaxed'>{settings.bio}</p>
                            </div>
                        ) : (
                            <p className='text-gray-400 text-[14px]'>Loading Bio...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
