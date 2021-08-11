const MyMessage = ( { message }) => {
    // render the image
    if(message?.attachements?.length > 0){ // message is an image(? checks the existance the the previous variable)
        return  (
            <img
                src={message.attachements[0].file}
                alt="message-attachment"
                className="message-image"
                style={{ float: 'right' }} // my messages appears on the right side of the window
            />
        )
    }

    // render the text
    return (
        <div className="message" style={{float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50'}} > {/* the buble for my message is purpleish color */}
            {message.text} 
        </div>
    )
}

export default MyMessage;