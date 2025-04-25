import imgPlaceHolder from "../assets/Ellipse 8.png";
import { Check, X } from "lucide-react";

function Invite({ id, name, onAccept, onReject }) {
  return (
    <div
      className={`group flex justify-between items-center gap-4 p-2 rounded-2xl conversation w-full mt-4 mb-4 cursor-pointer transition duration-200 hover:bg-gray-100`}
    >
     
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
        </div>
      </div>

   
      <div className="flex items-center gap-2">
        <button
          onClick={() => onAccept(id)}
          className="text-green-500 hover:text-green-700"
        >
          <Check size={20} />
        </button>
        <button
          onClick={() => onReject(id)}
          className="text-red-500 hover:text-red-700"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default Invite;
