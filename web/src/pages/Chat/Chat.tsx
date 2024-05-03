import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import styles from './Chat.module.scss';

type Message = {
    message: string;
    timestamp: string;
    sender_info: string;
};

interface ChatProps {
    teamId: number,
    memberId: string
    ;
}

function Chat({ teamId, memberId }: ChatProps) {
    console.log('memberId:', memberId)
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');

    // Function to fetch messages from the backend
    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/messages/${teamId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [teamId]);

    // Function to send a message to the backend
    const sendMessage = async () => {
        if (!messageInput.trim()) return;
        try {
            await axios.post('http://localhost:8000/api/messages', {
                message: messageInput,
                teamId,
                memberId  // Sending this to the backend
            });
            setMessageInput('');
            fetchMessages();  // Refresh messages after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    const handleMessageSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        sendMessage();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageInput(event.target.value);
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messages}>
                {messages.map((message, index) => (
                    <div key={index} className={styles.message}>
                        <strong>{message.sender_info}:</strong> {message.message} - {dayjs(message.timestamp).format('YYYY-MM-DD HH:mm')}
                    </div>
                ))}
            </div>
            <form onSubmit={handleMessageSubmit} className={styles.form}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={handleChange}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
