# PIG: The Dice Game

This is an old dice game I discovered once when looking for personal project ideas. I then made it into a web dev project and host it here: franksmith22.github.io/PigDiceGame.

I would now like to remake it in React to keep up practice!

<hr/>

To keep myself motivated and organized, I will do the following
1. Make a trello board to keep track of individual features so it's not just all up in my head
2. Not get hung up on the design. The difficult part for me here is the data side of things with react + redux, so focus on that first. Design will come later.

## Bugs to fix
- Pressing the enter key to trigger the start game button causes the hold action to occur. This is because the hold button is tied to the enter key, but strangely using the spacebar to trigger the start game button does not cause the roll action to occur (roll button is tied to spacebar).