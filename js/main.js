"use strict";

// Define the class Dir and its methods for setting the next and previous directions
class Dir {
  constructor(xDir, yDir, dirName) {
    this.xDir = xDir;
    this.yDir = yDir;
    this.dirName = dirName;
  }
  setNext(dir) {
    this.next = dir;
  }
  setPrev(dir) {
    this.prev = dir;
  }
}

// Define the class Dirs and its constructor
class Dirs {
  north = new Dir(0, 1, "North");
  east = new Dir(1, 0, "East");
  south = new Dir(0, -1, "South");
  west = new Dir(-1, 0, "West");

  constructor() {
    // Set the next and previous directions for each direction
    this.north.setNext(this.east);
    this.north.setPrev(this.west);
    this.east.setNext(this.south);
    this.east.setPrev(this.north);
    this.south.setNext(this.west);
    this.south.setPrev(this.east);
    this.west.setNext(this.north);
    this.west.setPrev(this.south);

    // Set the current direction to be East
    this.current = this.east;
  }

  // Set the current direction to be North,Continued:

  setCurrentNorth() {
    this.current = this.north;
  }

  // Set the current direction to be East
  setCurrentEast() {
    this.current = this.east;
  }

  // Set the current direction to be South
  setCurrentSouth() {
    this.current = this.south;
  }

  // Set the current direction to be West
  setCurrentWest() {
    this.current = this.west;
  }
}

// Define the class Coordinates and its constructor
class Coordinates {
  constructor(x, y) {
    this.coords = [x, y];
  }
}

// Define an object helper with methods for moving forward and backward, turning, and checking for obstacles
const helper = {
  moveFrowed(coordinate, dir) {
    let x = coordinate.coords[0] + dir.current.xDir;
    let y = coordinate.coords[1] + dir.current.yDir;
    return new Coordinates(x, y);
  },
  moveBack(coordinate, dir) {
    let x = coordinate.coords[0] - dir.current.xDir;
    let y = coordinate.coords[1] - dir.current.yDir;
    return new Coordinates(x, y);
  },
  routeRight(dir) {
    dir.current = dir.current.next;
    return dir;
  },
  routeLeft(dir) {
    dir.current = dir.current.prev;
    return dir;
  },
  isObstacles(obstacles, newCoords) {
    // Define a function to check if there are obstacles at the new coordinates
    return (
      obstacles.filter(
        (ar) => ar[0] == newCoords.coords[0] && ar[1] == newCoords.coords[1]
      ).length != 0
    );
  },
};

// Define a function to return the current position and direction
function result(coordinates, currentDir, message = "") {
  return `(${coordinates.coords[0]},${
    coordinates.coords[1]
  }) ${currentDir.current.dirName.toUpperCase()} ${message?.toUpperCase()}`.trim();
}

// Define the main function that takes commands and obstacles as input and returns the final position and direction
function main(commands, obstacles = []) {
  // Initialize the directions, coordinates, and stop flag
  let dirs = new Dirs();
  let coordinates = new Coordinates(0, 0);
  let stoped = false;

  // Define an object containing functions for handling each command
  const commandHandlers = {
    F: (obstacles) => {
      let newCoords = helper.moveFrowed(coordinates, dirs);

      if (helper.isObstacles(obstacles, newCoords)) {
        stoped = true;
        return result(coordinates, dirs, "STOPPED");
      } else {
        coordinates = newCoords;
        return result(coordinates, dirs);
      }
    },
    B: (obstacles) => {
      let newCoords = helper.moveBack(coordinates, dirs);
      if (helper.isObstacles(obstacles, newCoords)) {
        stoped = true;
        return result(coordinates, dirs, "STOPPED");
      } else {
        coordinates = newCoords;
        return result(coordinates, dirs);
      }
    },
    L: () => {
      dirs = helper.routeLeft(dirs);
      return result(coordinates, dirs);
    },
    R: () => {
      dirs = helper.routeRight(dirs);
      return result(coordinates, dirs);
    },
  };

  // Loop through the commands and execute the corresponding function
  let res;
  for (let i = 0; i < commands.length && !stoped; i++) {
    let command = commands.charAt(i);

    // If the command is not valid, return "Wrong Command"
    try {
      res = commandHandlers[command](obstacles);
    } catch {
      return "Wrong Command";
    }
  }

  return res;
}

// Define a function for unit testing
function test(description, testFunction) {
  try {
    testFunction();
    console.log(`PASSED: ${description}`);
  } catch (error) {
    console.error(`FAILED: ${description}`);
    console.error(error);
  }
}

// Perform some unit tests
const obstacles = [
  [3, 5],
  [7, 4],
  [1, 0],
];

test("it should return the correct result for a valid set ofcommands with obstacles", () => {
  const expected = "(0,0) EAST STOPPED";
  const actual = main("FLFFFRFLB", obstacles);
  console.log(`with obstacles result: ${actual} `);
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual}`);
  }
});

test("it should return the correct result for a valid set of commands with no obstacles", () => {
  const expected = "(2,2) NORTH";
  const actual = main("FLFFFRFLB");
  console.log(`with no obstacles result: ${actual} `);

  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual}`);
  }
});
// test case if there Wrong command and Here, there might be two situations
// 1- If there are obstacles, the rover may stop before it reaches the wrong Command,
//    and to make sure of that, I put the wrong Command in the first place.
// 2- If there are no obstacles, the rover will stop regardless of the wrong Command

test("it should handle invalid commands", () => {
  const expected = "Wrong Command";
  const actual1 = main("XFLFFFRFLB", obstacles);
  const actual2 = main("FLsFFFRFLB");

  if (actual1 !== expected || actual2 !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual1} and ${actual2}`);
  }
});
