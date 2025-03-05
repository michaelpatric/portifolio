document.addEventListener('DOMContentLoaded', function() {
    const messagesDiv = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('chatbot-user-input');
    const sendButton = document.getElementById('chatbot-send-button');
    const loadingDiv = document.getElementById('chatbot-loading');

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        displayMessage('Você', message);
        userInput.value = '';
        loadingDiv.style.display = 'block';

        try {
            const response = await fetch('http://localhost:3000/chat', { // Endereço do seu servidor
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Erro ao comunicar com o servidor.');
            }

            const data = await response.json();
            displayMessage('Gemini', data.response);
        } catch (error) {
            console.error('Erro:', error);
            displayMessage('Gemini', 'Desculpe, ocorreu um erro.');
        } finally {
            loadingDiv.style.display = 'none';
        }
    }

    function displayMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${sender}: ${message}`;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
});