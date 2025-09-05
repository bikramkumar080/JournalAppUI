import React from "react";
import Header from "../component/Admin/Header";
import Sidebar from "../component/Admin/Sidebar";
import Home from "../component/Admin/Home";
import ListUsers from "../component/Admin/ListUsers";
import ListJournals from "../component/Admin/ListJournals";
import CreateAdmin from "../component/Admin/CreateAdmin";
import SearchResultsTable from "../component/Admin/SearchResultsTable";
import UserInfo from "../component/Admin/UserInfo";

const sidebarWidth = 180;

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [showUsers, setShowUsers] = React.useState(false);
  const [showJournals, setShowJournals] = React.useState(false);
  const [CreateAdminOpen, setCreateAdminOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<{ entries: any[]; users: any[] }>({ entries: [], users: [] });
  const [showUserInfo, setShowUserInfo] = React.useState(false);
  console.log("Search Query state:", searchQuery);
  console.log("Search Results state:", searchResults);
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}  
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        setShowUsers={setShowUsers}
        setShowJournals={setShowJournals}
        setCreateAdminOpen={setCreateAdminOpen}
        setShowUserInfo={setShowUserInfo}
      />
      <div style={{ flex: 1, display: "flex" }}>
        { sidebarOpen && <Sidebar showUsers={showUsers} setShowUsers={setShowUsers} showJournals={showJournals} setShowJournals={setShowJournals} CreateAdminOpen={CreateAdminOpen} setCreateAdminOpen={setCreateAdminOpen} setSearchResults={setSearchResults} setShowUserInfo={setShowUserInfo}/>
        }
        
        <div style={{ flex: 1, overflow: "auto", marginLeft: sidebarOpen ? sidebarWidth : 0, transition: "margin-left 0.3s" }}>
          <Home showUsers={showUsers} setShowUsers={setShowUsers} showJournals={showJournals} setShowJournals={setShowJournals} CreateAdminOpen={CreateAdminOpen} setCreateAdminOpen={setCreateAdminOpen} setSearchResults={setSearchResults}  setShowUserInfo={setShowUserInfo}/>
          { showUsers && <ListUsers /> }
          { showJournals &&  <ListJournals /> }
          { CreateAdminOpen && <CreateAdmin /> }
          <SearchResultsTable results={searchResults}/>
          { showUserInfo && <UserInfo/>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
