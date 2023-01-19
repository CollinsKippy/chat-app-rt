import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ChatContext from '../contexts/ChatContext';

function ChatForm() {
  const { handleChatSubmit, user } = useContext(ChatContext);

  const [chatMessage, setChatMessage] = useState('');
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    if (user) {
      setUserExists(true);
    }
  }, [user]);

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (chatMessage?.trim === '') {
      // TODO: Show Dialog
      return;
    }

    handleChatSubmit(chatMessage);
    setChatMessage('');
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            type='text'
            disabled={!userExists}
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            sx={{ width: '100%' }}
            id='chatMessage'
            name='chatMessage'
            label='Enter message here...'
            variant='outlined'
          />
        </Box>
        <Box>
          <Button type='submit' sx={{ height: '100%' }} variant='contained'>
            Send
          </Button>
        </Box>
      </Grid>
    </form>
  );
}

export default ChatForm;
