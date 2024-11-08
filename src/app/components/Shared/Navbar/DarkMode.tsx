import { useState } from 'react';
import { MdDarkMode } from "react-icons/md";
  import { MdOutlineDarkMode } from "react-icons/md";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
 
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className=" text-gray-500 dark:text-gray-300"
    >
      {isDarkMode ?  <span><MdDarkMode/> </span> :  <span><MdOutlineDarkMode/> </span>}
    </button>
  );
}
