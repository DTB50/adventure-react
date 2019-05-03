var obstacles = [
  {
    name: "door",
    roomFound: "55",
    description1: "a heavy wooden door, too strong to break down and locked with a heavy padlock. You're pretty sure it's also enchanted. And by enchanted, you mean 'dangerously cursed'.",
    descriptionSolved: "a heavy wooden door, now unlocked and open.",
    failedAction: "The door remains unopened, and you are struck by a magical force. It's definitely dangerously cursed.",
    solvedAction: "With a creak, the door swings open.",
    solves: "key",
    solved: false,
    failIsHarmful: true
  },
  {
    name: "darkness",
    roomFound: "55",
    description1: "an inky void of pure blackness so thick you can't even see your hand in front of your face. Not that putting your hand right in front of your face makes it any easier to see the area.",
    descriptionSolved: "a complete lack of darkness. You're just staring into thin air.",
    failedAction: "It's still dark.",
    solvedAction: "The darkness recedes.",
    solves: "torch",
    solved: false,
    failIsHarmful: false
  },
  {
    name: "rock",
    roomFound: "54",
    description1: "a big lump of what you think is granite. It definitely looks igneous to you, and felsic too. Not to mention how phaneritic it is. Must be granite. Anyway, it's too heavy to move, and it's right in your way.",
    descriptionSolved: "little shards of the felsic phaneritic igneous rock that you're sure was granite scattered on the floor.",
    failedAction: "The rock resists your efforts. Maybe that would have worked on a sedimentary rock, but this thing is igneous.",
    solvedAction: "The rock explodes into shards as the pick hits it. The crystals that fly out as you strike it are definitely macroscopic. You're now even more certain that it's granite, but it doesn't really matter now.",
    solves: "pickaxe",
    solved: false,
    failIsHarmful: false
  },
  {
    name: "orc",
    roomFound: "53",
    description1: "a gigantic orc who flexes his muscles at you menacingly as he bars your way. You feel inadequate and jealous.",
    descriptionSolved: "a dead orc. Your disproportionate surge of macho pride is marred slightly by the realisation that you should probably get out of here before his friends or the police arrive.",
    failedAction: "The orc laughs at your attempt and pushes you away with what it thinks is a gentle shove. You're pretty sure that the so-called 'gentle shove' fractured a couple of ribs, but you pretend that it did nothing because you don't want to look weak in front of this hulking mass of muscle.",
    solvedAction: "No matter how well-defined, a six-pack is really no defense against a crossbow bolt at close range. The orc collapses.",
    solves: "crossbow",
    solved: false,
    failIsHarmful: true
  },
  {
    name: "kobold",
    roomFound: "53",
    description1: "a creature that basically just like a gnome, but with a cooler name drawn from Germanic folklore. It looks angry at you.",
    descriptionSolved: "A dead gnome.",
    failedAction: "The gnome bites your knee.",
    solvedAction: "No matter how well-defined, a six-pack is really no defense against a crossbow bolt at close range. The orc collapses.",
    solves: "crossbow",
    solved: false,
    failIsHarmful: true
  }
]

export default obstacles;
