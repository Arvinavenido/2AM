import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile && savedProfile.name) {
      setUserName(savedProfile.name);
      setProfileLoaded(true);
    } else {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setUserName(data.name);
          setProfileLoaded(true);
          localStorage.setItem('profile', JSON.stringify(data));
        } catch (error) {
          console.error('Error fetching user data:', error.response || error.message);
        }
      };
      fetchUserData();
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <br />
        <div className="dashboard-header">
          <h2>Welcome to 2AM!</h2>
        </div>

        <div className="dashboard-main">
          <div className="health-quote">
            <p>At 2AM, we’re all about unique, high-quality T-shirts that support local talent. Every purchase helps boost the community, empowering artists and small businesses to thrive.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
