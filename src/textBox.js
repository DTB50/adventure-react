import React, { Component } from 'react';
import './textBox.css';


const TextBox = function ({roomName, currentRoom}) {
    return (
    <div className="textBox">
      <p>{roomName}:</p>
      <p>{currentRoom}</p>
    </div>
    );
};

export default TextBox;
