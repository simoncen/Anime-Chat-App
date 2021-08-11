import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';

const MessageForm = (props) => {
    //const [state, setState] = useState(initialState);
    const [value, setValue] = useState('');
    const { chatId, creds } = props;

    const handleSubmit = (event) => {
        event.preventDefault(); // make sure to not do a browser refresh once you submit a form

        const text = value.trim();

        if(text.length > 0) sendMessage(creds, chatId, { text });

        setValue(''); // set the entered, sent message on the text box back to an empty string
    }

    const handleChange = (event) => {
        setValue(event.target.value); // set the value on the text box

        isTyping(props, chatId);
    }

    const handleUpload = (event) => {
        sendMessage(creds, chatId, { files: event.target.files, text: ''}); // the third property is the message, no text b/c this is an image
    }

    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input 
                className="message-input"
                placeholder="Send a message ..."
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon"/>
                </span>
            </label>
            <input 
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: 'none'}} // do not need the style since we already have the lable tag above
                onChange={handleUpload.bind(this)}
            />
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon" />
            </button>
        </form>
    )
}

export default MessageForm;
