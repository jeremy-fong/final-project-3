import React from 'react';
import About from '../components/About';
import Thread from '../components/Thread';
import '../styles/Home.css'
import { useQuery } from '@apollo/client';
import ThreadList from '../components/ThreadList';
// import ThreadList from '../components/ThreadList';
// import ThreadForm from '../components/ThreadForm';

import { QUERY_THREADS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THREADS);
  const threads = data?.threads || [];

  return (
   <div>
      <About />
      <Thread />
      <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThreadList
              threads={threads}
              title="Some Feed for Thread(s)..."
            />
          )}
        </div>
   </div>
  );
};

export default Home;
