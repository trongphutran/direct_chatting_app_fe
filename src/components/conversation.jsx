import imgPlaceHolder from "../assets/Ellipse 8.png";
import { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";

function Conversation({ id, name, message_text, onUserSelect }) {
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
      className="group flex justify-between items-center gap-4 p-2 rounded-2xl conversation max-w-96 mt-4 mb-4 cursor-pointer hover:bg-gray-100 transition duration-200"
      onClick={() => onUserSelect(id, name)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* Profile Image + Text */}
      <div className="flex items-center gap-4 flex-grow">
        <img
          src={imgPlaceHolder}
          alt="Profile"
          className="min-w-16 min-h-16 rounded-full"
        />
        <div className="text-left">
          <div className="text-black text-lg">{name}</div>
          <div className="text-gray-300 text-ellipsis text-nowrap overflow-hidden w-44 text-sm">
            {message_text}
          </div>
        </div>
      </div>

      {/* Menu Icon + Dropdown */}
      <div className="relative z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div onClick={toggleMenu}>
          <MoreVertical size={20} className="text-gray-500 hover:text-black" />
        </div>

        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-50"
          >
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Xem thông tin</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Xoá cuộc trò chuyện</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Conversation;
