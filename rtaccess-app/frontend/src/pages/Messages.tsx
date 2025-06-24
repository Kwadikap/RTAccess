import React, { useEffect, useState } from 'react';
import { Chat, ChannelList, Channel, MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = 'YOUR_STREAM_API_KEY';

export default function Messages() {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const user = { id: 'demo-user' };
      const chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser(user, chatClient.devToken(user.id));
      setClient(chatClient);
    };
    init();
    return () => { client?.disconnectUser(); };
  }, []);

  if (!client) return <p>Loading chat...</p>;

  return (
    <Chat client={client} theme="str-chat__theme-dark">
      <ChannelList setActiveChannel={setChannel} />
      {channel && (
        <Channel channel={channel} >
          <MessageList />
          <MessageInput focus />
        </Channel>
      )}
    </Chat>
  );
}
