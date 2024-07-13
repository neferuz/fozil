async function sendMessage() {
    const question = document.getElementById('question').value.trim();
    if (!question) return;

    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'user');
    messageElement.textContent = question;
    chatMessages.appendChild(messageElement);

    document.getElementById('question').value = '';
    document.getElementById('question').rows = 1;

    try {
        console.log('Sending message:', question); // Log the question being sent

        const response = await fetch('http://92.51.47.45:8000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        console.log('Response status:', response.status); // Log the response status

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Received data:', data); // Log the received data

        if (!data.answer) {
            throw new Error('Response does not contain an answer');
        }

        const answerElement = document.createElement('div');
        answerElement.classList.add('chat-message', 'ai');
        answerElement.textContent = data.answer;
        chatMessages.appendChild(answerElement);

        // Scroll to bottom of chat messages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        const errorElement = document.createElement('div');
        errorElement.classList.add('chat-message', 'error');
        errorElement.textContent = 'Error: ' + error.message;
        chatMessages.appendChild(errorElement);

        const errorDetailsElement = document.createElement('div');
        errorDetailsElement.classList.add('chat-message', 'error');
        errorDetailsElement.textContent = 'Details: ' + JSON.stringify(error);
        chatMessages.appendChild(errorDetailsElement);
    }
}
