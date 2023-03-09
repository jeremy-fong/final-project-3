import React from 'react';
import '../styles/Thread.css';
import { AiFillPlusCircle } from 'react-icons/ai';

const Thread = () => {

  return (
    <div className='thread-container columns'>
        <div className='threads is-four-fifths d-flex justify-between'>
            <h2 className='title is-3 thr'>Threads:</h2>
            <span className="right"><AiFillPlusCircle /></span>
            <table className='table'>
              
            </table>
        </div>
    </div>
  )
}

export default Thread