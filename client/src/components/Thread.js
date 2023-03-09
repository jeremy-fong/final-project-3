import React from 'react';
import '../styles/Thread.css';

const getThreadsQuery = gql`
  {
    threads {
      title
      _id
    }
  }
`

const Thread = () => {
  function genThreads() {
    
  }

  return (
    <div className='thread-container columns'>
        <div className='threads is-four-fifths'>
            <h2 className='title is-3 thr'>Threads:</h2>
            <table className='table'>

            </table>
        </div>
    </div>
  )
}

export default Thread