
import './conversation.css'
import { setState, useEffect} from 'react'
import axios from 'axios'
const Conversation = ({ conversation,currentUser }) => {
    const PUBLIC_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = setState(null)
    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== currentUser)
        const getUser = async () => {
            try {
                const { data } = await axios.get(`/users?userId=${friendId}`)
                setUser(data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation, currentUser])
    return (
        <div className='conversation'>
            <img
                className="conversationImg"
                src={
                    user.profilePic
                    ? `${PUBLIC_PROFILE}/${user.profilePic}`
                    : `${PUBLIC_PROFILE}/default/profile.png`
                }
                alt={`${user.username}'s img`}
            />
            <span className='conversationName'>{ user.username }</span>
        </div>
    )
}

export default Conversation
