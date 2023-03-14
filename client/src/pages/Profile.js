import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import '../styles/Profile.css';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import ThreadList from '../components/ThreadList';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="profileContainer">
        <h2 className="profileHeader">
          {`${user.username}'s`} Profile!
        </h2>
        <div className="">
          {/* add create thread */}
        </div>
        {!userParam && (
          <div
            className=""
          >
            {/* add thread list */}
            <ThreadList
            threads={user.threads}
            title={`${user.username}'s threads...`}
            showTitle={false}
            showUsername={false}
          />
          </div>
        )}
      </div>
    </div>
  );
};


export default Profile;