### Mars Rover Application

This is an application that simulates the movement of a rover on the surface of Mars. The rover can move forward, move backward, turn left, and turn right. The application takes a string of commands as input and returns the final position and direction of the rover.

### How to Use

1-Clone or download the repository to your local machine.<br/>
2-Open the index.html file in your web browser.<br/>
3-Open the browser console to see the output of the application.<br/>
4-Call the main function with the commands and obstacles as input to run the application.<br/>

const obstacles = [
[3, 5],
[7, 4],
[1, 0],
];<br/>

console.log(main("FLFFFRFLB", obstacles)); // "(0,0) EAST STOPPED"<br/>

console.log(main("FLFFFRFLB")); // "(2,2) NORTH"<br/>

### Usage

F: Move forward<br/>
B: Move backward<br/>
L: Turn left<br/>
R: Turn right<br/>

You can also provide an optional second argument to main() function which should be an array of obstacles, where each obstacle is represented by an array of two integers representing its x and y coordinates.
The result will be a string representing the final position and direction of the rover, in the format "(x,y) DIRECTION MESSAGE", where MESSAGE will be "STOPPED" if the rover encounters an obstacle during its movement.

### Example

Here's an example of how to use the application:<br/>
const result = main("FLFFFRFLB");<br/>
console.log(result); // output: (2,2) NORTH<br/>
In this example, the rover starts at position (0,0) and moves forward, turns left, moves forward three times, turns right, turns left, and moves backward. The final position of the rover is (2,2) facing North.<br/>

### Unit Testing

The application includes a unit testing function named test that tests the functionality of the main function with various inputs and outputs. The testscover valid and invalid commands with and without obstacles.

### Class Definitions

The application includes three classes:

### Dir

This class defines a direction object with its x and y coordinates and a name.

### Dirs

This class defines a set of four directions (North, East, South, West) and their relationships with each other (next and previous directions). It also includes methods for setting the current direction.

### Coordinates

This class defines a coordinate object with its x and y coordinates.

### Helper Functions

The application includes a helper object with functions for moving the rover, turning the rover, and checking for obstacles.

### Result Function

The result function takes the current coordinates, the current direction, and an optional message as input and returns the current position and direction of the rover.

### Main Function

The main() function is the main entry point of the application. It takes a string of commands and anoptional array of obstacles as input and returns the final position and direction of the rover. The function uses the helper functions and the Dirs and Coordinates classes to simulate the movement of the rover. If the rover encounters an obstacle during its movement, the function will return the final position and direction with the message "STOPPED". If the commands include an invalid command, the function will return the string "Wrong Command".

### In the end,

Only Part 1 and Part 2 are solved.

I tried as much as possible not to use (if/case),

And if it was used,the main function might be as follows

function main(commands, obstacles = []) {<br/>
let dirs = new Dirs();<br/>
let coordinates = new Coordinates(0, 0);<br/>

for (let i = 0; i < commands.length; i++) {<br/>
let command = commands.charAt(i);<br/>

    switch (command) {
      case "F": {
        let newCoords = moveFrowed(coordinates, dirs);
        if (helper.isObstacles(obstacles, newCoords)) {
          return result(coordinates, dirs, "STOPPED");
        } else {
          coordinates = newCoords;
        }
        break;
      }
      case "B": {
        let newCoords = moveBack(coordinates, dirs);
        if (helper.isObstacles(obstacles, newCoords)) {
          return result(coordinates, dirs, "STOPPED");
        } else {
          coordinates = newCoords;
        }
        break;
      }
      case "L": {
        dirs = routeLeft(dirs);

        break;
      }
      case "R": {
        dirs = routeRight(dirs);
        break;
      }
      default:
        break;
    }

}
return result(coordinates, dirs);
}
