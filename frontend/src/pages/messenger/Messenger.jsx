import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import Navbar from '../../components/navbar/Navbar'
import './messenger.css'
const Messenger = () => {
    return (
        <> 
            <Navbar />
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message own/>
                            <Message />
                            <Message own />
                            <Message />
                            <Message own/>
                            <Message />
                            <Message own/>
                            <Message />
                            <Message own/>
                            <Message />
                            <Message own/>
                        </div>
                        <div className="chatBoxBottom">
                            <textarea
                                className='chatMessageInput'
                                placeholder="Message"
                                name=""
                                id=""
                                cols="30"
                                rows="10"></textarea>
                            <button className='chatSubmitBtn'>Send</button>
                        </div>
                    </div> 
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger
