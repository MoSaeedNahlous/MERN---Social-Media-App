import './message.css'
const Message = ({own}) => {
    return (
        <div className={own?'message own':'message'}>
            <div className="messageTop">
                <img
                className="messageImg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfbCra85mqivGKkLeMu00S-X_ah2e6GClAMbWoXuZPRr9IbpdBI-_Wrx0r-89HKDBfoac&usqp=CAU"
                alt="Hala's img"
                />
                <p className='messageText'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}

export default Message
