export function allUsersApi(){
const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/all-user', {
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
        const response = await fetch('http://localhost:8081/api/admin/all-journal', {
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

export function sendMail(){
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/admin/send-mail', {
            method: 'POST',
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

export function createAdminApi(email: string, password: string){
    const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8081/api/admin/create-admin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              username: email,
              password: password,
              email: email,
            }),
          });
    
          if (!response.ok) {
            throw new Error("Create admin failed");
          }
    
          const data = await response.json();
          console.log(data);
          return data;
        } catch (err: any) {
          console.error(err.message || "Something went wrong");
        }
      };
      return fetchData();
}

export function search(query: string){
  const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/admin/search?query=${encodeURIComponent(query)}`, {
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
        const response = await fetch('http://localhost:8081/api/admin/info', {
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