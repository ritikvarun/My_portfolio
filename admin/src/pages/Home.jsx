import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { FiGrid, FiAward, FiCode, FiSettings, FiUser } from 'react-icons/fi'
import Loading from '../component/Loading'

function Home() {
    const [totalProjects, setTotalProjects] = useState(0)
    const [settings, setSettings] = useState(null)
    const { serverUrl } = useContext(authDataContext)

    const defaultSettings = {
        developerName: "Ritik Varun",
        developerTitle: "Full Stack MERN Developer",
        contactEmail: "ritikvarun64@gmail.com",
        githubUrl: "https://github.com/Ritikvarun",
        linkedinUrl: "https://www.linkedin.com/in/ritik-varun-0b6795274/",
        bio: "Not that average pick-me guy. I'm a full-stack developer, designer, and a tech enthusiast. I love to design beautiful and user-friendly interfaces. Always curious to learn new things :)"
    }

    const fetchDashboardData = async () => {
        try {
            const projectsRes = await axios.get(`${serverUrl}/api/projects`)
            if (projectsRes.data && Array.isArray(projectsRes.data)) {
                setTotalProjects(projectsRes.data.length)
            } else {
                setTotalProjects(4)
            }
        } catch (err) {
            console.warn("Using fallback projects count", err)
            setTotalProjects(4)
        }

        try {
            const settingsRes = await axios.get(`${serverUrl}/api/settings`)
            if (settingsRes.data && settingsRes.data.developerName) {
                setSettings({ ...defaultSettings, ...settingsRes.data })
            } else {
                setSettings(defaultSettings)
            }
        } catch (err) {
            console.warn("Using fallback settings", err)
            setSettings(defaultSettings)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [serverUrl])

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

                    {/* Live System Status */}
                    <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[28px] flex items-center gap-[20px] flex-1 min-w-[220px]'>
                        <div className='w-[52px] h-[52px] bg-emerald-50 rounded-xl flex items-center justify-center'>
                            <div className='w-3 h-3 rounded-full bg-emerald-500 animate-pulse' />
                        </div>
                        <div>
                            <p className='text-[13px] text-gray-400 font-medium'>Portfolio Status</p>
                            <p className='text-[24px] font-bold text-emerald-600 leading-tight'>Online & Active</p>
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
