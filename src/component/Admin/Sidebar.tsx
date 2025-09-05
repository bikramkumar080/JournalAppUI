import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from '@mui/material/styles';
import { sendMail } from "../../util/adminApiCalls";

export default function Sidebar(props: {
    showUsers: boolean;
    setShowUsers: (show: boolean) => void;
    showJournals: boolean;
      setShowJournals: (show: boolean) => void;
    CreateAdminOpen: boolean;
    setCreateAdminOpen: (open: boolean) => void;
    setSearchResults: ( results: { entries: any[]; users: any[] } ) => void;
    setShowUserInfo: (show: boolean) => void;
}) {
  const theme = useTheme();

  const menuItems = [
    {
      text: "Admin Tools",
      icon: <AdminPanelSettingsIcon sx={{ mr: 1 }} />,
      onClick: () => {
        props.setCreateAdminOpen(!props.CreateAdminOpen);
        props.setShowUsers(false);
        props.setShowJournals(false);
        props.setSearchResults({ entries: [], users: [] });
        props.setShowUserInfo(false);
      },
      selected: props.CreateAdminOpen,
    },
    {
      text: "Users",
      icon: <PeopleIcon sx={{ mr: 1 }} />,
      onClick: () => {
        props.setShowUsers(!props.showUsers);
        props.setShowJournals(false);
        props.setCreateAdminOpen(false);
        props.setSearchResults({ entries: [], users: [] });
        props.setShowUserInfo(false);
      },
      selected: props.showUsers,
    },
    {
      text: "Journals",
      icon: <BookIcon sx={{ mr: 1 }} />,
      onClick: () => {
        props.setShowJournals(!props.showJournals);
        props.setShowUsers(false);
        props.setCreateAdminOpen(false);
        props.setSearchResults({ entries: [], users: [] });
        props.setShowUserInfo(false);
      },
      selected: props.showJournals,
    },
    {
      text: "Send Email",
      icon: <EmailIcon sx={{ mr: 1 }} />,
      onClick: () => {
        sendMail().then(() => alert("Emails sent successfully!")).catch(() => alert("Failed to send emails."));
      },
      selected: false,
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