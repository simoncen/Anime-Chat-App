const TheirMessage = (lastMessage, message) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

    return (
        <div className="message-row">
            {isFirstMessageByUser && (
                <div
                    className="message-avatar"
                    style={{backgroundImage: `url(${message?.sender?.avatar})`}} // only the first message of the consecutive chunk by one user show the avatar of that user
                />
            )}
            {message?.attachments?.length > 0 // message is an image(? checks the existance the the previous variable)
                ?  (
                        <img
                        src={message.attachments[0].file}
                        alt="message-attachment"
                        className="message-image"
                        style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
                        />
                ) : (
                    <div className="message" style={{float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }} > {/* the buble for their message is CABCDC color */}
                        {message.text}
                    </div>
                )
                }
        </div>
    )
}

export default TheirMessage;

