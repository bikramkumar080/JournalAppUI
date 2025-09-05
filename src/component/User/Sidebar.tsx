import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from "@mui/icons-material/Book";
import { useTheme } from '@mui/material/styles';

export default function Sidebar(props: {
    showJournals: boolean;
    setShowJournals: (show: boolean) => void;
    setSearchResults: ( results: any[] ) => void;
    setShowUserInfo: (show: boolean) => void;
    setShowSearchResults: (show: boolean) => void;
}) {
  const theme = useTheme();

  const menuItems = [
    {
      text: "Journals",
      icon: <BookIcon sx={{ mr: 1 }} />,
      onClick: () => {
        props.setShowJournals(!props.showJournals);
        props.setSearchResults([]);
        props.setShowUserInfo(false);
        props.setShowSearchResults(false);
      },
      selected: props.showJournals,
    },
  ];

  return (
    <Box
      sx={{
        width: 180,
        height: '100vh',
        bgcolor: 'white',
        color: theme.palette.primary.contrastText,
        display: 'flex',
        flexDirection: 'column',
        pt: 2,
        boxShadow: 2,
        position: 'fixed',
        left: 0,
        top: 65,
        zIndex: 1200,
      }}
      role="presentation"
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                color: 'black',
                bgcolor: item.selected ? theme.palette.primary.dark : 'inherit',
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  bgcolor: theme.palette.primary.light,
                },
              }}
              onClick={item.onClick}
              selected={item.selected}
            >
              {item.icon}
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}