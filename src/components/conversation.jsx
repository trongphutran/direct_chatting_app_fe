import imgPlaceHolder from "../assets/Ellipse 8.png";
import { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";

function Conversation({ id, name, message_text, onUserSelect, isSelected }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
  className={`group flex justify-between items-center gap-4 p-2 rounded-2xl conversation w-full mt-4 mb-4 cursor-pointer transition duration-200 hover:bg-gray-100 ${
    isSelected ? "bg-blue-300" : "hover:bg-gray-100"
  }`}
      onClick={() => onUserSelect(id, name)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* Profile Image + Text */}
      <div className="flex items-center gap-4 flex-grow">
        <img
          src={imgPlaceHolder}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="text-left">
          <div className="font-medium text-base truncate max-w-[160px]">
            {name}
          </div>
          <div
            className={`text-sm truncate max-w-[160px] `}
          >
            
          </div>
        </div>
      </div>

      {/* Menu Icon + Dropdown */}
      <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div onClick={toggleMenu}>
          <MoreVertical size={20} className={`${isSelected ? "text-black" : "text-gray-500 hover:text-black"}`} />
        </div>

        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-50 text-gray-800"
          >
            <ul className="text-sm">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Kết bạn
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Conversation;
