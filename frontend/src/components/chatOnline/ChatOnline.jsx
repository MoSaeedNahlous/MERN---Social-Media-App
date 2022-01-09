import './chatOnline.css'
const ChatOnline = () => {
    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img
                        className="chatOnlineImg"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfbCra85mqivGKkLeMu00S-X_ah2e6GClAMbWoXuZPRr9IbpdBI-_Wrx0r-89HKDBfoac&usqp=CAU"
                        alt="Hala's img"
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Hala Haj Kasem</span>
            </div>
        </div>
    )
}

export default ChatOnline
