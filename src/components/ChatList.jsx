import React, { useContext } from 'react';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ChatContext from '../contexts/ChatContext';
import LinearProgress from '@mui/material/LinearProgress';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ChatList() {
  const { chats, isChatsLoading, errorLoadingChats } = useContext(ChatContext);

  return (
    <Grid container spacing={2} className='ChatList'>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
          Chats
        </Typography>
        {isChatsLoading && <LinearProgress />}

        {errorLoadingChats && <p>Error: {JSON.stringify(errorLoadingChats)}</p>}
        <Demo>
          <List>
            {chats.map((chat) => (
              <ListItem key={chat.id}>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={chat.message}
                  secondary={chat.displayName}
                />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
}
