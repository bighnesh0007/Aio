"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Phone, BarChart2, Rocket, DollarSign } from 'lucide-react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
]

const analysisOptions = [
  { id: 'soil', name: 'Soil Analysis', href: '/home' },
  { id: 'crop', name: 'Crop Health', href: '/analysis/crop' },
  { id: 'weather', name: 'Weather Patterns', href: '/analysis/weather' },
]

const roboFarmerOptions = [
  { id: 'status', name: 'RoboFarmer Status', href: '/robofarmer/status' },
  { id: 'schedule', name: 'Schedule Tasks', href: '/robofarmer/schedule' },
  { id: 'maintenance', name: 'Maintenance', href: '/robofarmer/maintenance' },
]

const economicOptions = [
  { id: 'market', name: 'Market Trends', href: '/economic/market' },
  { id: 'profit', name: 'Profit Analysis', href: '/economic/profit' },
  { id: 'forecast', name: 'Economic Forecast', href: '/economic/forecast' },
]

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
}

const Navbar = () => {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleCall = () => {  
    console.log('Initiating call...')
  }

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
              Agri Vision
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu
              title="Analysis"
              icon={<BarChart2 className="w-5 h-5 mr-1" />}
              options={analysisOptions}
              isOpen={openDropdown === 'analysis'}
              onToggle={() => handleDropdownToggle('analysis')}
            />
            <DropdownMenu
              title="RoboFarmer"
              icon={<Rocket className="w-5 h-5 mr-1" />}
              options={roboFarmerOptions}
              isOpen={openDropdown === 'robofarmer'}
              onToggle={() => handleDropdownToggle('robofarmer')}
            />
            <DropdownMenu
              title="Economic Status"
              icon={<DollarSign className="w-5 h-5 mr-1" />}
              options={economicOptions}
              isOpen={openDropdown === 'economic'}
              onToggle={() => handleDropdownToggle('economic')}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCall}
              className="flex items-center text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
              aria-label="Call support"
            >
              <Phone className="w-5 h-5" /> 
            </button>
            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-haspopup="true"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">{languages.find(lang => lang.code === currentLang)?.name}</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code)
                          setIsLangOpen(false)
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 w-full text-left"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <SignedOut>
              <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="rounded-full overflow-hidden">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}

interface DropdownMenuProps {
  title: string
  icon: React.ReactNode
  options: { id: string; name: string; href: string }[]
  isOpen: boolean
  onToggle: () => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, icon, options, isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button
        className="flex items-center text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {icon}
        <span>{title}</span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10"
          >
            {options.map((option) => (
              <Link
                key={option.id}
                href={option.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 w-full text-left"
                onClick={() => {
                  console.log(`Navigating to ${option.name}`)
                  onToggle()
                }}
              >
                {option.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
