const apiKey = 'SUA_CHAVE_DE_API_AQUI'; // Substitua pela sua chave de API
const apiUrl = 'https://api.deepseek.com/v1/chat'; // Exemplo de endpoint (verifique na documentação)

const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    // Exibe a mensagem do usuário no chat
    messagesDiv.innerHTML += `<p><strong>Você:</strong> ${userMessage}</p>`;

    // Limpa o campo de entrada
    userInput.value = '';

    // Envia a mensagem para a API do DeepSeek
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                message: userMessage
            })
        });

        const data = await response.json();
        const botMessage = data.response; // Ajuste conforme a estrutura da resposta da API

        // Exibe a resposta do bot no chat
        messagesDiv.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
    } catch (error) {
        console.error('Erro ao chamar a API:', error);
        messagesDiv.innerHTML += `<p><strong>Erro:</strong> Não foi possível obter uma resposta.</p>`;
    }
});