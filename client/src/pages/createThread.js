import '../styles/CreateThread.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THREAD } from '../utils/mutations';
import { QUERY_THREADS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const ThreadForm = () => {
  const [threadText, setThreadText] = useState('');
  const [threadTitle, setThreadTitle] = useState('');
  
  const [characterCount, setCharacterCount] = useState(0);

  const [addThread, { error }] = useMutation(ADD_THREAD, {
    update(cache, { data: { addThread } }) {
      // try {
      //   const { threads } = cache.readQuery({ query: QUERY_THREADS });

      //   cache.writeQuery({
      //     query: QUERY_THREADS,
      //     data: { threads: [addThread, ...threads] },
      //   });
      // } catch (e) {
      //   console.error(e);
      // }

      // // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, threads: [...me.threads, addThread] } },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThread({
        variables: {
          threadText,
          threadTitle,
          threadAuthor: Auth.getProfile().data.username,
        },
      });

      setThreadText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'threadText' && value.length <= 280) {
      setThreadText(value);
      setCharacterCount(value.length);
    }
  };

  const handleChangeTitle = (event) => {
    const { name, value } = event.target;

    if (name === 'threadTitle') {
      setThreadTitle(value);
    }
  };

  return (
    <div className='ctContainer'>
      <div className='ctHeader'>
      <h3>Got Something To Say? Share it!</h3>
      </div>

      {Auth.loggedIn() ? (
        <>
          <form
            className="ctForm"
            onSubmit={handleFormSubmit}
          >
            <div className="addThread">
            <textarea
                name="threadTitle"
                placeholder="Thread Title..."
                value={threadTitle}
                className="formTitle  w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChangeTitle}
              ></textarea>
              <br></br>
              <textarea
                name="threadText"
                placeholder="Here's a new thread..."
                value={threadText}
                className="formText  w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
                <p
            className={`cc ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
            </div>

            <div className="col-12 col-lg-3">
              <button id='btnThread' className="btn btn-primary btn-block py-3" type="submit">
                Add Thread
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your threads. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThreadForm;
