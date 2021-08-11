import { useState } from "react";
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': "6fa80f15-a60d-40b6-9552-c5eb0a9a1bb3", 'User-Name': username, 'User-Secret': password};

        // try catch requires an async function
        try {
            // request: username / password => chatengine -> give messages
            await axios.get('https://api.chatengine.io/chats', { headers: authObject});

            // works out -> logged in
            // store the username and the password to the local storage, so that once you've logged in once, you don't have to log in every time you come to the page
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
            setError('');
        } catch (error) {
            // error -> try wth new username...
            setError('Oops, incorrect credentials.');
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Anime Chat App</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />  {/* required means we need to type in that user */}
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />  
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;