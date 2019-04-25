
var pickups = [
  {
    name: "torch",
    roomFound: "55",
    description1: "a torch, which can be used to light the way. It looks like the kind that is always lit and never runs out. Merlon's Magic Torch Emporium makes good torches.",
    failedAction: "The area was already lit. ",
    solvedAction: "The torch lights up. ",
    solves: "darkness",
    inInventory: false
  },
  {
    name: "pickaxe",
    roomFound: "44",
    description1: "a pickaxe with a wooden handle, used for picking. An inscription reads 'This belongs to Steve, hands off'. There's a dark mark on it that looks like an oddly angular bloodstain. Best not think too hard about that.",
    failedAction: "You can't pick this. ",
    solvedAction: "You swing the pick. ",
    solves: "rock",
    inInventory: false
  },
  {
    name: "key",
    roomFound: "55",
    description1: "a heavy key designed to unlock a nearby lock. This is handy because if you had a lockpicking skill stat, it would be zero.",
    failedAction: "This key doesn't fit that. ",
    solvedAction: "You use the key in the lock. ",
    solves: "door",
    inInventory: false
  },
  {
    name: "wand",
    roomFound: "55",
    description: "A magic wand put in by a programmer for testi- I mean, by a wizard to help you achieve your mystical destiny. It can do anything.",
    failedAction: "This never fails.",
    solvedAction: "You wave the wand. ",
    solves: ["door", "rock", "orc", "darkness"],
    inInventory: false
  },
  {

  }

]

export default pickups ;
