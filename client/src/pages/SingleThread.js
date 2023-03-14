import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_THREAD } from '../utils/queries';

const SingleThread = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { threadId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THREAD, {
    // pass URL parameter
    variables: { threadId: threadId },
  });

  const thread = data?.thread || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="card">
      <h3 className="cardHeader">
        {thread.threadAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          posted this thread on {thread.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {thread.title}
          <br />
          {thread.description}
        </blockquote>
      </div>

      {/* <div className="my-5">
        <CommentList comments={thread.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm threadId={thread._id} />
      </div> */}
    </div>
  );
};

export default SingleThread;
