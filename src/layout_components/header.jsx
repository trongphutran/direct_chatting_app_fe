import placeHolderImg from '../assets/Ellipse 9.png'
import placeHolderImg2 from '../assets/Group 2.png' 

const Header = () => {
    return (
        <div className='header flex border-1 border-gray-700 rounded-2xl bg-black'>
            <div className='flex flex-row min-w-96 justify-between mt-4 mb-4 ml-8'>
                <div className='flex flex-row items-center'>
                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="55" height="55" rx="27.5" fill="#1B1B1B" />
                    <path d="M28.6759 11.5L16.5 23.5L28.6759 31.9953M28.6759 31.9953V20.4906L37.5793 25.2849L28.6759 31.9953ZM28.6759 31.9953L38.5 37.7477L28.6759 43.5V31.9953Z" stroke="#99FFAF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className='m-2.5 text-emerald-200'>CHATBOOTH</div>
                </div>
                <div>
                    <img src={placeHolderImg} className='w-16 ml-10 mr-10' alt="" />
                </div>
            </div>
            <div className='w-2 bg-gray-700'></div>
            <div className='flex items-center ml-14 mt-4 mb-4'>
                <div>
                    <img src={placeHolderImg2} alt="" />
                </div>
                <div className='text-left ml-2.5'>
                    <div className='text-white'>Paarth Jain</div>
                    <div className='text-gray-300'>Online</div>
                </div>
            </div>
        </div>
    );
}
export default Header;