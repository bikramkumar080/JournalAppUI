import React from "react";
import Header from "../component/User/Header";
import Sidebar from "../component/User/Sidebar";
import Home from "../component/User/Home";
import ListJournals from "../component/User/ListJournals";
import SearchResultsTable from "../component/User/SearchResultsTable";
import UserInfo from "../component/User/UserInfo";

const sidebarWidth = 180;

const UserDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [showJournals, setShowJournals] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [showUserInfo, setShowUserInfo] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        setShowJournals={setShowJournals}
        setShowUserInfo={setShowUserInfo}
      />
      <div style={{ flex: 1, display: "flex" }}>
        {sidebarOpen && (
          <Sidebar
            showJournals={showJournals}
            setShowJournals={setShowJournals}
            setSearchResults={setSearchResults}
            setShowUserInfo={setShowUserInfo}
          />
        )}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            marginLeft: sidebarOpen ? sidebarWidth : 0,
            transition: "margin-left 0.3s",
          }}
        >
          <Home />
          {showJournals && <ListJournals />}
          <SearchResultsTable journals={searchResults} />
          {showUserInfo && <UserInfo />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;