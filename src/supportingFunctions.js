import rooms from './rooms.js';

//TAKE USER INPUTS AND PARSE INTO ACTIONS
export function parseEntry (input, room) {
  console.log("state at parseEntry:");
  console.log(this.state.currentRoom);
  var currentAction;
  var currentSubject;

  //Break down the user's command
  var commandArray = input.split(" ");
  console.log(commandArray);

  //Get verb
  currentAction = commandArray[0].toLowerCase();

  //Get thing to do verb on
  //Deal with edge cases in user entry
  if (commandArray[1] == "at") {
      currentAction = currentAction + " " + commandArray[1];
      currentSubject = commandArray[2].toLowerCase();
  }
  else if (commandArray[1] == "the"){
    currentSubject = commandArray[2];
  }
  else {
      currentSubject = commandArray[1].toLowerCase();
  }

  console.log(currentAction + " : " + currentSubject);

  //Activate a function depending on the user's command
  if (currentAction == "go") {
    changeRoom(currentSubject, room);
  }

}

//   else if (currentAction == "look" || currentAction == "look at"){
//     look(currentSubject);
//   }
//   else if (currentAction == "check"){
//     checkInventory();
//   }
//   else if (currentAction == "use"){
//     use(item);
//   }
//
//   //End of parse function
// }
//
// MOVE
export function changeRoom (direction, room) {
  //check if direction is valid
  let validMove = validMoveCheck(direction, room);
  //If valid
  if (validMove == true){
    console.log("can go this way");
  }
  //Scan room array for room
  console.log("changing room to " + direction);
  for (let i = 0; i < rooms.length; i++){
    if (room[direction] == rooms[i].roomId){
      console.log(rooms[i].roomId);
        // this.setState({currentRoom: rooms[i]});
        // console.log(this.state.currentRoom);
    }
  }
}

export function validMoveCheck (direction, room) {
  console.log("at vMC");
  console.log(room);
    if (room[direction] != "NA"){
    return true;
  }
  else return false;
}
//
// //LOOK
// look(subject) {
//
// }
//
// //CHECK
// check(subject){
//
// }
// //USE
// use(item) {
// }
//
//
