import React, { useContext } from 'react';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import ChatContext from '../contexts/ChatContext';
import LinearProgress from '@mui/material/LinearProgress';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ChatList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const { chats, isChatsLoading, errorLoadingChats } = useContext(ChatContext);

  return (
    <Grid container spacing={2} className='ChatList'>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
          Chats
        </Typography>
        {isChatsLoading && <LinearProgress />}
        <Demo>
          <List dense={dense}>
            {chats.map((chat) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
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
