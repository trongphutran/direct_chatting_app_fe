import { useState, useEffect } from 'react';
import { MessageCircle, Contact } from 'lucide-react';
import placeHolderImg from '../assets/Ellipse 9.png'
function LeftMenu({ onSelectMenu }) {
    const [selected, setSelected] = useState('messages');

    useEffect(() => {
        onSelectMenu('messages');
    }, []); 

    const handleClick = (menu) => {
        setSelected(menu);
        onSelectMenu(menu);
    };

    const baseClass = "w-full text-center py-3 px-4 rounded-xl cursor-pointer";
    const activeClass = "bg-blue-300 text-white";
    const inactiveClass = "hover:bg-gray-100 text-gray-800";

    return (
        <div className="min-w-[10vh] p-2 flex flex-col items-center gap-4 bg-white border-r border-gray-200 rounded-2xl">
              <img src={placeHolderImg} className='w-16 ml-10 mr-10' alt="" />
            <button
                className={`${baseClass} ${selected === 'messages' ? activeClass : inactiveClass}`}
                onClick={() => handleClick('messages')}
            >
                <MessageCircle size={24} />
            </button>

            <button
                className={`${baseClass} ${selected === 'contacts' ? activeClass : inactiveClass}`}
                onClick={() => handleClick('contacts')}
            >
                <Contact size={24}/>
            </button>
        </div>
    );
}

export default LeftMenu;
