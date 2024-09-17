"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaInfoCircle,
  FaSun,
  FaMoon,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaCarrot,
  FaAppleAlt,
  FaLeaf,
  FaBreadSlice,
  FaCandyCane,
  FaClock,
  FaBeer,
  FaSpa,
  FaCottonBureau,
  FaPepperHot,
  FaSeedling,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaWheatAwn, FaBowlRice } from "react-icons/fa6";
import { SiGooglelens } from "react-icons/si";
import { GiSugarCane, GiCottonFlower, GiCorn, GiTomato, GiPotato } from "react-icons/gi";
import { RiRoadMapLine } from "react-icons/ri";
import { MdKeyboardVoice, MdOutlineRecommend, MdPestControl } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BiSolidDashboard } from "react-icons/bi";
import { TbLemon } from "react-icons/tb";
import { FaDisease } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [diseaseMenuOpen, setDiseaseMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Weather Status", href: "/WeatherDashboard", icon: TiWeatherPartlySunny },
    { name: "Crop Metrics", href: "/CropDashboard", icon: GiPlantRoots },
    { name: "Soil Insights", href: "/SoilDashboard", icon: BiSolidDashboard },
    { name: "Plant Finder", href: "/identify", icon: RiPlantFill },
    { name: "Crop Advisor", href: "/CropRecommendation", icon: FaSeedling },
    { name: "Soil Diagnostics", href: "/SoilQualityAnalysis", icon: FaSeedling },
    { name: "Fertilizer Recommendation", href: "/fertilizerRecommendation", icon: FaSeedling },
    { name: "Crop Road Map", href: "/CropRoadMapBuilder", icon: RiRoadMapLine },
    { name: "Voice To Search", href: "/voice", icon: MdKeyboardVoice },
  ];

  const diseaseCategories = [
    {
      category: "Vegetables",
      items: [
        { name: "Potato", href: "/disease/potato", icon: GiPotato },
        { name: "Tomato", href: "/disease/tomato", icon: GiTomato },
      ],
    },
    {
      category: "Fruits",
      items: [
        { name: "Apple", href: "/disease/apple", icon: FaAppleAlt },
        { name: "Lemon", href: "/disease/lemon", icon: TbLemon },
      ],
    },
    {
      category: "Crops",
      items: [
        { name: "Rice", href: "/disease/rice", icon: FaBowlRice },
        { name: "Wheat", href: "/disease/wheat", icon: FaWheatAwn },
        { name: "Sugarcane", href: "/disease/sugarcane", icon: GiSugarCane },
        { name: "Pulses", href: "/disease/pulses", icon: FaSeedling },
        { name: "Maize", href: "/disease/maize", icon: GiCorn },
        { name: "Barley", href: "/disease/barley", icon: FaBeer },
        { name: "Soybean", href: "/disease/soyabean", icon: FaSpa },
        { name: "Groundnut", href: "/disease/groundnut", icon: FaLeaf },
        { name: "Cotton Leaf", href: "/disease/cotton-leaf", icon: GiCottonFlower },
      ],
    },
    {
      category: "Others",
      items: [
        { name: "Pest Detection", href: "/disease/pest", icon: MdPestControl },
      ],
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex flex-col h-screen p-4 m-3 bg-white shadow-lg dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && (
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
            Over View
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-800 dark:text-green-400 dark:hover:bg-green-700"
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <ul className="space-y-2 text-sm">
          {navItems.map((item) => (
            <li key={item.name} className="rounded-lg">
              <Link
                href={item.href}
                className={`flex items-center p-3 space-x-4 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-white"
                    : "hover:bg-green-50 dark:hover:bg-green-800 dark:text-gray-300"
                }`}
              >
                <item.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
          <li className="rounded-lg">
            <button
              onClick={() => setDiseaseMenuOpen(!diseaseMenuOpen)}
              className="flex items-center w-full p-3 space-x-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-800 transition-all duration-200 dark:text-gray-300"
            >
              <FaDisease className="w-6 h-6 text-green-600 dark:text-green-400" />
              {!isCollapsed && (
                <>
                  <span>Disease Detection</span>
                  {diseaseMenuOpen ? (
                    <FaChevronUp className="w-4 h-4 ml-auto" />
                  ) : (
                    <FaChevronDown className="w-4 h-4 ml-auto" />
                  )}
                </>
              )}
            </button>
            {diseaseMenuOpen && !isCollapsed && (
              <div className="pl-4">
                {diseaseCategories.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-gray-600 dark:text-gray-400 mt-4 mb-2 font-semibold">
                      {category.category}
                    </h3>
                    <ul className="pl-4 space-y-2">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`flex items-center p-2 space-x-4 rounded-lg transition-all duration-200 ${
                              pathname === item.href
                                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-white"
                                : "hover:bg-green-50 dark:hover:bg-green-800 dark:text-gray-300"
                            }`}
                          >
                            <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center p-4 mt-4">
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-800 transition-all duration-200"
        >
          {isDarkMode ? (
            <FaSun className="w-6 h-6 text-green-600 dark:text-green-400" />
          ) : (
            <FaMoon className="w-6 h-6 text-green-600 dark:text-green-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
