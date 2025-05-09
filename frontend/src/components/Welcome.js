import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Welcome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.first_name} {user.last_name}!</h1>
      ) : (
        <h1>Welcome, Guest!</h1>
      )}
      <Link to="/old-items"><button>Old Items</button></Link>
      <Link to="/new-items"><button>New Items</button></Link>
    </div>
  );
}

export default Welcome;
