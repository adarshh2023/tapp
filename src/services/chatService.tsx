import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/fine';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export async function generateChatRoomKey() {
  const response = await axios.get(
    `${API_BASE_URL}/generateChatRoomkey`,
    getAuthHeader()
  );
  return response.data.chatId;
}

export async function sendChatMessage(projectId: string, userMessage: string, chatId: string) {
  const response = await axios.post(
    `${API_BASE_URL}/chat`,
    {
      projectId,
      userMessage,
      chatId
    },
    getAuthHeader()
  );
  return response.data.assistantMessage;
}