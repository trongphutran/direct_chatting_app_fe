import placeHolderImg from '../assets/Ellipse 9.png'
import placeHolderImg2 from '../assets/Ellipse 8.png' 



const Header = ({username,selectedMenu,selectedId}) => {

    const shouldShowHeaderInfo = !(
        selectedMenu === "contacts" &&
        (selectedId === "friendsList" || selectedId === "invitesList")
      );
    return (
        <div className='header flex border-1 border-gray-300 rounded-2xl bg-white'>
            <div className='flex flex-row min-w-96 justify-between mt-4 mb-4 ml-8 bg-white border-r-1 border-gray-200'>
                <div className='flex flex-row items-center'>
                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="55" height="55" rx="27.5" fill="#1B1B1B" />
                    <path d="M28.6759 11.5L16.5 23.5L28.6759 31.9953M28.6759 31.9953V20.4906L37.5793 25.2849L28.6759 31.9953ZM28.6759 31.9953L38.5 37.7477L28.6759 43.5V31.9953Z" stroke="#99FFAF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className='m-2.5 text-black'>CHATBOOTH</div>
                </div>
                <div>
                    {/* <img src={placeHolderImg} className='w-16 ml-10 mr-10' alt="" /> */}
                </div>
            </div>
            {shouldShowHeaderInfo && (
                <><div className='w-2 border-gray-100'></div><div className='flex items-center ml-14 mt-4 mb-4'>
                    <div className={`${username ? "block" : "hidden"}`}>
                        <img src={placeHolderImg2} alt="image" />
                    </div>
                    <div className='text-left ml-2.5'>
                        <div className={`${username ? "text-black" : "hidden"}`}>{username}</div>
                        <div className={`${username ? "text-gray-500" : "hidden"}`}>Online</div>
                    </div>
                </div></>
)}
            
        </div>
    );
}
export default Header;