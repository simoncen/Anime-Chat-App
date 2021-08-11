import { ChatEngine } from 'react-chat-engine';

import LoginForm from './components/LoginForm';
import ChatFeed from './components/ChatFeed';

import './App.css';

const projectID="6fa80f15-a60d-40b6-9552-c5eb0a9a1bb3"

const App = () => {
    if(!localStorage.getItem('username')) return <LoginForm />

    return (
        <ChatEngine
            height="100vh"  // height to be our entire project
            projectID={projectID} // string you will get once you create your chat application on chatengine
            userName= {localStorage.getItem('username')} // "simoncen" // username of the currently logged in person on chatengine
            userSecret= {localStorage.getItem('password')} //"123123" // password 
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>} //redesign the chat feed section in the middle of the app
            onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
    )
}

export default App;