var rooms = [
  {
    roomId: "55",
    title: "Cell",
    description: "A dingy cell with thick stone walls, where you awoke.",
    pickups: ["torch", "key"],
    obstacles: ["door"],
    setDressing: ["note"],
    light: "lit",
    north: ["54", "door", "a threshold", "a locked door", "an unlocked and open door"],
    south: ["NA", "NA"],
    west: ["NA", "NA"],
    east: ["NA", "NA"],
    up: ["NA", "NA"],
    down: ["NA", "NA"],
  },
  {
    roomId: "54",
    title: "Prison hall",
    description: "A stone hallway that connects the two cells in the prison to what you hope is the outside.",
    pickups: [],
    obstacles: ["rock"],
    setDressing: ["note"],
    light: "lit",
    north: ["53", "rock", "an unlocked and open door", "a giant rock", "little fragments of rock"],
    south: ["55", "NA", "the open door to the cell you awoke in", "NA", "the open door to the cell you awoke in"],
    west: ["44", "NA", "an unlocked and open door", "NA", "NA"],
    east: ["NA", "NA"],
    up: ["NA", "NA"],
    down: ["NA", "NA"]
  },
  {
    roomId: "53",
    title: "Outside the prison",
    description: "A small clearing outside the prison. Definitely more open than the prison.",
    pickups: [],
    obstacles: [],
    setDressing: [],
    light: "lit",
    north: ["NA", "NA"],
    south: ["54", "NA", "an open door to the prison hall"],
    west: ["NA", "NA"],
    east: ["NA", "NA"],
    up: ["NA", "NA"],
    down: ["NA", "NA"]
  },
  {
    roomId: "44",
    title: "Another prison cell",
    description: "This stone cell isn't as nice as the one you woke up in. For one thing, yours didn't have a body in the corner. Well, aside from your own, which was still alive. You decide resolutely not to interact with the body, so don't even try it.",
    pickups: ["pickaxe"],
    obstacles: [""],
    setDressing: [],
    light: "lit",
    north: ["NA", "NA"],
    south: ["NA", "NA"],
    west: ["NA", "NA"],
    east: ["54", "NA", "an open door to the prison hall"],
    up: ["NA", "NA"],
    down: ["NA", "NA"]
  }
]

export default rooms;
