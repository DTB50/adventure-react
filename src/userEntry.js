import React, { Component } from 'react';
import './userEntry.css';


const UserEntry = function({ userInput, handleInput, submitChoice, parseEntry }) {
    return (
    <div className="UserEntry">
      <input className="UserInput" placeholder="Please enter command here" onChange={handleInput} value={userInput}></input>
      <button onClick={submitChoice} >DO IT</button>
    </div>
    );
};

export default UserEntry;
