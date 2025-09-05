export function searchJournals(query: string){
  const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/user/search?keyword=${encodeURIComponent(query)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    return fetchData();
}

export function getInfo(){
  const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/user/info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    return fetchData();
}

export function allJournalsApi(){
  const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/journal', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    return fetchData();
}

export function updateSentimentPreference(enable: boolean) {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/user/toggle-sentiment?enable=${enable}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  return fetchData();
}

export async function addJournal(journal: { title: string; content: string }) {
  const response = await fetch("http://localhost:8081/api/journal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(journal),
  });
  return response.json();
}

export async function editJournal(id: number, journal: { title: string; content: string }) {
  const response = await fetch(`http://localhost:8081/api/journal/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(journal),
  });
  return response.json();
}

export async function deleteJournal(id: number) {
  const response = await fetch(`http://localhost:8081/api/journal/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.ok;
}