// do not need to import react here anymore because we are using version 17+
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props; // destructured props

    const chat = chats && chats[activeChat]; // if chats exists, get that specific activeChat, activeChat is an integer

    //console.log(chat, userName, messages);
    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div 
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: person.person.avatar && `url(${person?.person?.avatar})`
                }}
            />
        ))
    }

    // new functional component for generating new messages
    const renderMessages = ( ) => {
        const keys = Object.keys(messages); // keys are id for specific messages
        //console.log(keys);
        return keys.map((key, index) => {
            const message = messages[key]; // get the specific message
            const lastMessageKey = index === 0 ? null : keys[index - 1];//(if there are messages, find the last message)
            const isMyMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={{ width: '100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage
                            ? <MyMessage message={message} />
                            : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}> {/* position of the message in the feed area */}
                        {renderReadReceipts(message, isMyMessage)} {/*pass in the props*/}
                    </div>
                </div>
            )
        })
    }


    if(!chat) return 'Loading...'; 

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">
                    {chat.title}
                </div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px'}} /> {/* leave some space off after we render the title and the messages*/}
            <div className="message-form-container">
                <MessageForm {... props} chatId={activeChat} />
            </div>
        </div>
    )
}

export default ChatFeed;