import React, { Component } from 'react';
import './App.css';
import TextBox from './textBox.js';
import UserEntry from './userEntry.js';
import Info from './info.js';
// import { parseEntry, changeRoom, validMoveCheck } from './supportingFunctions.js'
import rooms from './rooms.js';
import obstacles from './items.js';
import setDressing from './setDressing.js';
import pickups from './pickups.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentRoom: rooms[0],
      userInput: '',
      confirmedUserChoice: '',
      resultMessage: "Welcome to React Quest! Enter your commands below. Enter 'get [thing]' to pick a usable item up, 'go [direction]' to move, 'check [thing]' to examine an obstacle or item, or 'use [thing a] on [thing b]' to resolve obstacles.",
      inventory: [],
      currentRoomText: this.compileInitialRoomDescription(rooms[0]),
      health: 3,
      alive: true,
      resetRooms: rooms.slice(),
      resetObstacles: obstacles.slice(),
      resetSetDressing: setDressing.slice(),
      resetPickups: pickups.slice()
    };


  this.handleInput = this.handleInput.bind(this);
  this.submitChoice = this.submitChoice.bind(this);
  this.parseEntry = this.parseEntry.bind(this);
  this.changeRoom = this.changeRoom.bind(this);
  this.validMoveCheck = this.validMoveCheck.bind(this);
  }

  ///////////////////////////////////////////////////////////////////
  // PARSE USER INPUTS  /////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  //USER ENTERS TEXT
  handleInput (event) {
      this.setState({ userInput: event.target.value });
      // console.log(this.state.userInput);
  }

  //USER CONFIRMS CHOICE
  submitChoice (event) {
    //For test's sake: print command
    console.log("current command is: " + this.state.userInput);
    this.setState({confirmedUserChoice: this.state.userInput });
    this.parseEntry(this.state.userInput, this.state.currentRoom);
    //Clear the textbox
  }

  //ENTRY IS PARSED INTO ACTIONS
  parseEntry(input, room) {
    console.log("state at parseEntry:");
    console.log(this.state.currentRoom);
    var currentAction;
    var currentSubject;
    var currentObject;

    //Break down the user's command
    var commandArray = input.split(" ");
    console.log(commandArray);

    //Get verb
    currentAction = commandArray[0].toLowerCase();

  if (this.state.alive === true){
    //Get thing to do verb on
    //Deal with edge cases in user entry
    if (commandArray.length === 1 || commandArray[1] === ""){
      if (currentAction === "go"){
        this.setState({ resultMessage: currentAction + " where?" });
        return;
      }
      else if (currentAction === "use") {
        this.setState({ resultMessage: currentAction + " what on what?" });
        return;
      }
      else if (currentAction === ""){
        this.setState({ resultMessage: currentAction + "You did nothing." });
        return;
      }
      else if (currentAction === "restart"){
        this.restartGame();
        return;
      }
      else {
        this.setState({ resultMessage: currentAction + " what?" });
        return;
      }
    }
    else if (commandArray.length <= 2){
      if (commandArray[1] === "the"){
        currentSubject = commandArray[2].toLowerCase();
      }
      else {
          currentSubject = commandArray[1].toLowerCase();
      }
    }
    else {
      if (commandArray[1] === "the"){
        currentSubject = commandArray[2].toLowerCase();
        currentObject = commandArray[4].toLowerCase();
      }
      else {
          currentSubject = commandArray[1].toLowerCase();
          currentObject = commandArray[3].toLowerCase();
      }
    }


    console.log(currentAction + " : " + currentSubject + ":" + currentObject);

    //Activate a function depending on the user's command - add contingency for command array being at least two words
    if (currentAction === "go") {
      this.changeRoom(currentSubject, room);
    }
    else if (currentAction === "get"){
      this.get(currentSubject, room);
    }
    else if (currentAction === "check"){
      this.check(currentSubject, room);
    }
    else if (currentAction === "use"){
      this.use(currentSubject, currentObject, room);
    }
    //for anything else - all are invalid
    else {
      this.setState({resultMessage: "You give it your best try, but find that you can't do this."});
    }
  }
  else if (this.state.alive === false){
      if (currentAction === "restart") {
        this.restartGame();
      }
      else {
        this.setState({resultMessage: "You are too dead to do this. Type 'restart' to try again."});
      }
  }
  //End of parse function
}

/////////////////////////////////////////////////////
// MOVE  ////////////////////////////////////////////
/////////////////////////////////////////////////////
changeRoom(direction, room) {
  //check if direction is valid AND UNBLOCKED
  let validMove = this.validMoveCheck(direction, room);
  //Valid path - go to next room
  if (validMove[0] === "valid"){
    console.log("can go this way");
    //Scan room array for room and update room state
    console.log("changing room to " + direction);
    for (let i = 0; i < rooms.length; i++){
      if (room[direction][0] === rooms[i].roomId){
        console.log(rooms[i].roomId);
        console.log(rooms[i].description);
          //Update room state - include callback to ensure that reliant function only executes after the state is updated
          this.setState({currentRoom: rooms[i]}, () => {
            console.log(this.state.currentRoom);
            this.setState({resultMessage: "You moved on"});
            this.compileRoomDescription(this.state.currentRoom);
          });

      }
    }
  }
  //Blocked path - explain blockage
  else if (validMove[0] === "blocked"){
      //search for blockage reason - if not solved, then display reason
      let obstacleMessage = "Before this path lies " + validMove[1];
      this.setState({resultMessage: obstacleMessage});
  }
  else if (validMove[0] === "invalid") {
    console.log("can't go this way");
    this.setState({resultMessage: "You can't go this way"});
  }
}

validMoveCheck (direction, room) {
  //invalid direction (no valid exit, or a term that isn't even a direction)
    if (!room.hasOwnProperty(direction) || room[direction][0] === "NA"){
    return ["invalid"];
  }
  //Blocked path
  else if (room[direction][1] !== "NA"){
    let obstacle = this.checkBlock(direction, room);
    return obstacle;
  }
  //Valid path
  else return ["valid"];
}

 checkBlock (direction, room) {
   //check the obstacles array for the name matching the assigned obstacles
   //and pass back the relevant description
   console.log("In checkBlock, direction is : " + direction);
   console.log("In checkBlock, room is : ");
   console.log("In checkBlock, direction is : " + direction);
   for (let i = 0; i < obstacles.length; i++){
     if (obstacles[i].name === room[direction][1] && obstacles[i].solved === false){
       return ["blocked", obstacles[i].description1];
     }
     else if (obstacles[i].name === room[direction][1] && obstacles[i].solved === true){
       return ["valid", obstacles[i].descriptionSolved];
     }
   }
 }

///////////////////////////////////////////////////////
// LOOK ///////////////////////////////////////////////
///////////////////////////////////////////////////////
check(subject, room) {
  console.log(room.setDressing);
//check if the object is in the room and check if it has been solved
  if (room.obstacles.includes(subject)){
      for (let i = 0; i < obstacles.length; i++){
        //display a message depending on whether it has been solved
        if (obstacles[i].name === subject && room.roomId === obstacles[i].roomFound){
          if (obstacles[i].solved === false) {
            this.setState({ resultMessage: "You see " + obstacles[i].description1 });
          }
          else {
            this.setState({ resultMessage: "You see " + obstacles[i].descriptionSolved });
          }
        }
      }
  }
  else if (room.setDressing.includes(subject)){
    console.log("subject is in room");
      for (let i = 0; i < setDressing.length; i++){
        if (setDressing[i].name === subject && room.roomId === setDressing[i].roomFound){
          this.setState({ resultMessage: setDressing[i].description });
        }
      }
  }
  else if (room.pickups.includes(subject)){
      for (let i = 0; i < pickups.length; i++){
        if (pickups[i].name === subject && room.roomId === pickups[i].roomFound){
          this.setState({ resultMessage: "You see " + pickups[i].description1 });
        }
      }
  }
  //ADD CONDITION TO CHECK INVENTORY FOR OBJECT
  //ADD CONDITION TO CHECK INVENTORY
  else if (subject === "inventory"){
      if (this.state.inventory.length > 0){
        this.setState({ resultMessage: this.state.inventory });
      }
      else {
        this.setState({ resultMessage: "Your pockets are empty."});
      }
  }
  else {
    this.setState({ resultMessage: "You don't see that here."});
  }
//check if the object is in your inventory and if so, display description in resultMessage
//if it's not in either, display a resultMessage stating that you couldn't see this object
}

////////////////////////////////////////////////////////////////////////////////
// USE  ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

use(subject, object, room) {
  //set up check variables
  let subjectInInventory = false;
  let objectInRoom = false;
  let objectInInventory = false;
// check inventory for current item (subject)
  for (let i = 0; i < pickups.length; i++){
    if (pickups[i].name === subject){
      if (pickups[i].inInventory === true){
        subjectInInventory = true;
      }
    }
  }
// if obstacle is in current room, check if the subject name matches the obstacles' solve property
// display the corresponding message and alter the room state and inventory as required
  if (subjectInInventory === true){
    //check if the object is also in the INVENTORY first
    for (let i = 0; i < pickups.length; i++){
      if (pickups[i].name === object){
        if (pickups[i].inInventory === true){
          objectInInventory = true;
        }
      }
    }
    //then check if it's in the room and if so, solve the puzzle
    if (room.obstacles.includes(object)){
      objectInRoom = true;
      let validSolution = this.checkSolution(subject, object);
      if (validSolution[0] === "true") {
        this.alterObstacleState(subject, true);
        this.setState({ resultMessage: validSolution[1]}, () => {
          let newRoomText = this.compileRoomDescription(room, () => {
            this.setState({ currentRoomText: newRoomText });
        });

        });
      }
      else if (validSolution[0] === "false") {
        //check if the object is harmful
        this.checkHarm(validSolution);
        return;
      }
    }
  }

  if (objectInRoom === false && subjectInInventory === false){
      this.setState({ resultMessage: "This isn't in your inventory, and that isn't even here." })
    }
  else if (objectInRoom === true && subjectInInventory === false){
    this.setState({ resultMessage: "This isn't in your inventory." });
    }
  else if (objectInRoom === false && subjectInInventory === true && objectInInventory === false){
    this.setState({ resultMessage: "You can't use this on that, because that isn't here." });
  }
  else if (objectInInventory === true && subjectInInventory === true && objectInRoom === false){
    this.setState({ resultMessage: "This isn't the kind of game that lets you combine items. At least, not yet." });
  }
}
//

///////////////////////////////////////////////////////////////////
// GET  ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

  //If the item is in the room, pick it up (and remove it from the room)
  get(currentSubject, room) {
    console.log("activating get function for " + currentSubject);
    console.log(room.pickups)
    let itemGot = false;
    //run through the pickups
    for (let i = 0; i < room.pickups.length; i++) {
      if (currentSubject === room.pickups[i]){
        //update inventory and inInventory status of item
        console.log(room.pickups);
        this.setState({ inventory: [...this.state.inventory, room.pickups[i]] });
        itemGot = true;
        let pickUpMessage = "You got the " + room.pickups[i];
        this.setState({ resultMessage: pickUpMessage });
        this.alterPickupState(currentSubject, true);
        //remove the item from the room.pickups array
        let itemsArray = room.pickups;
        console.log(itemsArray);
        itemsArray = itemsArray.splice(i, 1);
        console.log(itemsArray);
        //alter the room's item array and assign the now altered room as the state room
        for (let j = 0; j < rooms.length; j++){
          console.log(room.roomId + " :  " + rooms[j].roomId);
          if (room.roomId === rooms[j].roomId){
            rooms[j].pickups = room.pickups;
            console.log(rooms[j].pickups);
            //alter state currentRoom to reflect change
            this.setState({ currentRoom: rooms[j]}, () => {
              this.compileRoomDescription(rooms[j]);
            });
          }
        }
      }
    }
    if (itemGot === false){
      this.setState({ resultMessage: "You can't get that."})
    }
  }

  //Check the current room and then find the item in its inventory commandArray
  findItemIndex(pickupName, room){
    for (let x = 0; x < rooms.length; x++){
      if (room.roomId === rooms[x].roomId){
        for (let y = 0; y < rooms[x].pickups.length; y++){
          if (rooms[x].pickups[y].name === pickupName){
            let itemIndex = y;
            console.log("item index is " + y)
            return itemIndex;
          }
        }
      }
    }
  }

  //Toggle pickup state of selected item
  alterPickupState(pickupName, newValue) {
    for (let i = 0; i < pickups.length; i++){
      if (pickups[i].name === pickupName){
        pickups[i].inInventory = newValue;
      }
    }
  }

  //Toggle solved state of selected obstacle
  alterObstacleState(currentSubject, newValue) {
    console.log("alterObstacleState active");
    for (let i = 0; i < obstacles.length; i++){
      if (obstacles[i].solves === currentSubject){
        obstacles[i].solved = true;
        console.log("alterObstacleState done");
      }
    }
  }

  //Check if the selected item solves the obstacle
  checkSolution(currentSubject, currentObject) {
    console.log(currentSubject + ": " + currentObject);
    //find the currentObject
    //if the currentSubject is specified as its solution, return true
    for (let i = 0; i < obstacles.length; i++){
      if (obstacles[i].name === currentObject){
        console.log(currentSubject + " tried against " + obstacles[i].solves);
        if (obstacles[i].solves === currentSubject){
          return ["true", obstacles[i].solvedAction, i];
        }
        else {
          return ["false", obstacles[i].failedAction, i];
        }
      }
    }

  }

///////////////////////////////////////////////////////////////////////////////
// OTHER //////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
//Put together room description  /////////////////
//////////////////////////////////////////////////

  compileRoomDescription (room, callback) {
    let descriptionText = "";
    //Get room description
    descriptionText = descriptionText + room.description;

    //check available directions - if not NA, then log
    let validDirections = [];
    let directions = ["north", "south", "east", "west"];
      for (let i = 0; i < directions.length; i++){
        if (room.hasOwnProperty(directions[i]) && room[directions[i]][0] !== "NA"){
          //check if there is an obstacle
            validDirections = [...validDirections, [directions[i], room[directions[i]]]];
          }
        }
        console.log(validDirections);

    for (let i = 0; i < validDirections.length; i++){
        //For each valid direction, note it in the description.
        descriptionText = descriptionText + " To the " + validDirections[i][0] + " is " + validDirections[i][1][2] + ".";
        console.log(validDirections[i][0]);
        //For each valid direction, check if there is an obstacle in its way and log its description into an array
        let isBlocked = this.validMoveCheck(validDirections[i][0], room)
        console.log(isBlocked);
        if (isBlocked[0] === "blocked"){
          descriptionText = descriptionText + " Blocking the way, you see " + validDirections[i][1][3] + ".";
        }
    }
    console.log(descriptionText);

    //List things to look at around the room.
    if (room.setDressing.length === 0){
      descriptionText = descriptionText + " You don't see anything else worth examining."
    }
    else if (room.setDressing.length === 1){
      descriptionText = descriptionText + " You see a " + room.setDressing[0] + ".";
    }
    else if (room.setDressing.length >= 1){
      descriptionText = descriptionText + " You also see "
      for (let i = 0; i < room.setDressing.length; i++){
        if (i === 0){
          descriptionText = descriptionText + "a " + room.setDressing[i];
        }
        else if (i >= 1 && i < room.setDressing.length-1){
          descriptionText = descriptionText + ", a " + room.setDressing[i];
        }
        else if (i >= 1 && i === room.setDressing.length-1){
          descriptionText = descriptionText + " and a " + room.setDressing[i] + ".";
        }
      }
    }

    //Check for items and list these
    if (room.pickups.length === 0){
      descriptionText = descriptionText + " You don't see anything worth picking up."
    }
    else if (room.pickups.length === 1){
      descriptionText = descriptionText + " Looking for things that might be useful, you see a " + room.pickups[0] + ".";
    }
    else if (room.pickups.length >= 1){
      descriptionText = descriptionText + " Looking for things that might be useful, you also see "
      for (let i = 0; i < room.pickups.length; i++){
        if (i === 0){
          descriptionText = descriptionText + "a " + room.pickups[i];
        }
        else if (i >= 1 && i < room.pickups.length-1){
          descriptionText = descriptionText + ", a " + room.pickups[i];
        }
        else if (i >= 1 && i === room.pickups.length-1){
          descriptionText = descriptionText + " and a " + room.pickups[i] + ".";
        }
      }
    }

    //setstate the room decsription
        this.setState({currentRoomText: descriptionText});
  }

//////////////////////////////////////////////////
//Put together initial room description  /////////
//////////////////////////////////////////////////

  //For initial setup - returns text string instead of setState
  compileInitialRoomDescription (room) {
    let descriptionText = "";
    //Get room description
    descriptionText = descriptionText + room.description;

    //check available directions - if not NA, then log
    let validDirections = [];
    let directions = ["north", "south", "east", "west"];
      for (let i = 0; i < directions.length; i++){
        if (room.hasOwnProperty(directions[i]) && room[directions[i]][0] !== "NA"){
          //check if there is an obstacle
            validDirections = [...validDirections, [directions[i], room[directions[i]]]];
          }
        }
        console.log(validDirections);

    for (let i = 0; i < validDirections.length; i++){
        //For each valid direction, note it in the description.
        descriptionText = descriptionText + "To the " + validDirections[i][0] + " is " + validDirections[i][1][2] + ".";
        console.log(validDirections[i][0]);
        //For each valid direction, check if there is an obstacle in its way and log its description into an array
        let isBlocked = this.validMoveCheck(validDirections[i][0], room)
        console.log(isBlocked);
        if (isBlocked[0] === "blocked"){
          descriptionText = descriptionText + " Blocking the way, you see " + validDirections[i][1][3] + ".";
        }
    }
    console.log(descriptionText);

    //List things to look at around the room.
    if (room.setDressing.length === 0){
      descriptionText = descriptionText + " You don't see anything else worth examining."
    }
    else if (room.setDressing.length === 1){
      descriptionText = descriptionText + " You see a " + room.setDressing[0] + ".";
    }
    else if (room.setDressing.length >= 1){
      descriptionText = descriptionText + " You also see "
      for (let i = 0; i < room.setDressing.length; i++){
        if (i === 0){
          descriptionText = descriptionText + "a " + room.setDressing[i];
        }
        else if (i >= 1 && i < room.setDressing.length-1){
          descriptionText = descriptionText + ", a " + room.setDressing[i];
        }
        else if (i >= 1 && i === room.setDressing.length-1){
          descriptionText = descriptionText + " and a " + room.setDressing[i] + ".";
        }
      }
    }

    //Check for items and list these
    if (room.pickups.length === 0){
      descriptionText = descriptionText + " You don't see anything worth picking up."
    }
    else if (room.pickups.length === 1){
      descriptionText = descriptionText + " Looking for things that might be useful, you see a " + room.pickups[0] + ".";
    }
    else if (room.pickups.length >= 1){
      descriptionText = descriptionText + " Looking for things that might be useful, you also see "
      for (let i = 0; i < room.pickups.length; i++){
        if (i === 0){
          descriptionText = descriptionText + "a " + room.pickups[i];
        }
        else if (i >= 1 && i < room.pickups.length-1){
          descriptionText = descriptionText + ", a " + room.pickups[i];
        }
        else if (i >= 1 && i === room.pickups.length-1){
          descriptionText = descriptionText + " and a " + room.pickups[i] + ".";
        }
      }
    }

    //update current room description to include it
    return descriptionText;
  }

  //Bring back the obstacle array index corresponding to the relevant obstacle
  // findObstacleIndex(obstacleName, room){
  //       for (let j = 0; j < rooms[i].obstacles.length; i++){
  //         if (rooms[i].obstacles[j].name === obstacleName){
  //           let itemIndex = j;
  //           return itemIndex;
  //         }
  //       }
  //     }

  //////////////////////////////////////////////////
  // Health system  ////////////////////////////////
  //////////////////////////////////////////////////

  checkHarm (validSolution) {
    //if failed puzzle is harmful, reduce health by 1
    //scan obstacle array for obstacle matching room and obstacle name
    //if harmful, decrement health;
    if (obstacles[validSolution[2]].failIsHarmful === true){
        console.log("fail is harmful");
        let healthLeft = this.state.health;
        healthLeft--;
        this.setState({ health: healthLeft });
        }
    //if health is 0, end game
    if (this.state.health === 0){
      this.setState({ alive: false });
      this.setState({ resultMessage: validSolution[1] + " You died. Enter 'restart' to try again." });
    }
    else {
      this.setState({ resultMessage: validSolution[1] + " It hurt. You have " + this.state.health + " hits left in you."});
    }
    //Print status message and disable functions other than restart
  }

  restartGame() {
    //restore React state props to initialised states
    //reset all arrays to original state
    this.setState({ rooms: this.state.resetRooms });
    this.setState({ obstacles: this.state.resetRooms });
    this.setState({ setDressing: this.state.resetSetDressing });
    this.setState({ pickups: this.state.resetPickups });

    //clear INVENTORY
    this.setState({ inventory: [] });

    //restore health
    this.setState({ health: 3 });
    this.setState({ alive: true });

    //clear user messages
    this.setState({ resultMessage: "You restarted the game." });

    //place user in initial room
    this.setState({ currentRoom: rooms[0] });
    this.setState({ currentRoomText: this.compileInitialRoomDescription(rooms[0]) });
  }


  //Put it all together
  render() {
    return (
      <div className="App">
        <TextBox currentRoom={this.state.currentRoomText} roomName={this.state.currentRoom.title}/>
        <Info confirmedUserChoice={this.state.confirmedUserChoice} resultMessage={this.state.resultMessage}/>
        <UserEntry userInput={this.state.userInput} handleInput={this.handleInput} submitChoice={this.submitChoice} parseEntry={this.parseEntry}/>
      </div>
    );
  }
}


export default App;
