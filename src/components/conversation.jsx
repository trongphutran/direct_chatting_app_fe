import imgPlaceHolder from "../assets/Ellipse 8.png";

function Conversation({ id, name, message_text, onUserSelect}) {
  return (
    <div className="flex items-center gap-4 p-2 rounded-2xl conversation max-w-96 mt-4 mb-4 cursor-pointer" onClick={() => onUserSelect(id, name)}>
      {/* Profile Image */}
      <div>
        <img src={imgPlaceHolder} alt="Profile" className="min-w-16 min-h-16 rounded-full" />
      </div>

      {/* Text Content */}
      <div className="text-left">
        <div className=" text-black text-lg">{name}</div>
        <div className="text-gray-300 text-ellipsis text-nowrap overflow-hidden w-9/12 text-sm">{message_text}</div>
      </div>
    </div>
  );
}

export default Conversation;
