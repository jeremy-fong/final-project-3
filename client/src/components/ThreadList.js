import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ThreadList.css';
import { AiOutlineArrowDown } from 'react-icons/ai';

const ThreadList = ({
  threads,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!threads.length) {
    return <h3>No Threads Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {threads &&
        threads.map((thread) => (
          <div key={thread._id} className="card">
            <h4 className="cardHeader">
              {showUsername ? (
                <>
                <Link id='user'
                  className="text-light"
                  to={`/profiles/${thread.threadAuthor}`}
                >
                  {thread.threadAuthor}
                </Link>
                <span id='date'>
                  posted on {thread.createdAt}
                </span>
                </>
              ) : (
                <>
                  <span>
                    You posted on {thread.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="cardBody">
              <h3>{thread.title}</h3>
              <p>{thread.description}</p>
            </div>
            <Link
              className="comment"
              to={`/threads/${thread._id}`}
            >
              Comment<AiOutlineArrowDown id='icon'/>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThreadList;
