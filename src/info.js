import React, { Component } from 'react';
import './info.css';


const Info = function ({confirmedUserChoice, resultMessage}) {
    return (
    <div className="info">
      <p>{confirmedUserChoice}</p>
      <p>{resultMessage}</p>
    </div>
    );
};

export default Info;
