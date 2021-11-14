import { validDirectionsString } from "../src/direction";
import { Robot } from "../src/robot";

function outputGenerator(x: number, y: number, direction: string): string {
    return `Output: ${x},${y},${direction}`;
}

function testRobotPlacement(robot: Robot, x: number, y: number, direction: string, valid: boolean) {
    const location: string = `${x},${y},${direction}`
    const testDescription = valid ? `should be placed at ${location}` : `shouldn't be placed at ${location}`
    it(`${testDescription}`, () => {
        console.log = jest.fn();
        robot.action(`PLACE ${location}`);
        robot.action("REPORT");
        if (valid) {
            expect(console.log).toHaveBeenCalledWith(outputGenerator(x, y, direction));
        } else {
            expect(console.log).not.toHaveBeenCalledWith();
        }        
    });
}

describe("test robot placement", () => {
    const robot: Robot = new Robot();
    
    validDirectionsString.forEach((directionString) => {
        testRobotPlacement(robot, 0, 0, directionString, true);
    });

    validDirectionsString.forEach((directionString) => {
        testRobotPlacement(robot, 5, 5, directionString, true);;
    });

    validDirectionsString.forEach((directionString) => {
        testRobotPlacement(robot, -1, 0, directionString, false);
        testRobotPlacement(robot, 0, -1, directionString, false);
        testRobotPlacement(robot, -1, -1, directionString, false);

        testRobotPlacement(robot, 6, 0, directionString, false);
        testRobotPlacement(robot, 0, 6, directionString, false);
        testRobotPlacement(robot, 6, 6, directionString, false);
    });
});

function testRobotMovement(x:number, y:number, direction: string, initialX: number, initialY: number, valid: boolean) {
    const robot: Robot = new Robot();
    const initialPlacement: string = `${initialX},${initialY},${direction}`
    let testDescription: string = ""
    if (valid) {
        testDescription = `should move to ${x},${y},${direction}`
    } else {
        testDescription = `should stay on to ${x},${y},${direction}`
    }

    it(testDescription, () => {
        console.log = jest.fn();
        robot.action(`PLACE ${initialPlacement}`);
        robot.action("MOVE");
        robot.action("REPORT");
        if (valid) {
            expect(console.log).toHaveBeenCalledWith(outputGenerator(x, y, direction));
        } else {
            expect(console.log).toHaveBeenCalledWith(outputGenerator(initialX, initialY, direction));
        }
        
    });
}

describe("test robot movement", () => {
    testRobotMovement(2, 3, "NORTH", 2, 2, true);
    testRobotMovement(3, 2, "EAST", 2, 2, true);
    testRobotMovement(2, 1, "SOUTH", 2, 2, true);
    testRobotMovement(1, 2, "WEST", 2, 2, true);

    testRobotMovement(0, 0, "SOUTH", 0, 0, false);
    testRobotMovement(0, 0, "WEST", 0, 0, false);

    testRobotMovement(5, 5, "NORTH", 5, 5, false);
    testRobotMovement(5, 5, "EAST", 5, 5, false);
});

function testRobotDirection(command: string, initialDirection: string, expectedDirection: string) {
    const robot: Robot = new Robot();
    const x: number = 0;
    const y: number = 0;

    it(`should be placed at ${x},${y},${expectedDirection}`, () => {
        console.log = jest.fn();
        robot.action(`PLACE ${x},${y},${initialDirection}`);
        robot.action(command);
        robot.action("REPORT");
        expect(console.log).toHaveBeenCalledWith(outputGenerator(x, y, expectedDirection));        
    });
}

describe("test robot direction", () => {
    testRobotDirection("RIGHT", "NORTH", "EAST");
    testRobotDirection("RIGHT", "EAST", "SOUTH");
    testRobotDirection("RIGHT", "SOUTH", "WEST");
    testRobotDirection("RIGHT", "WEST", "NORTH");

    testRobotDirection("LEFT", "NORTH", "WEST");
    testRobotDirection("LEFT", "WEST", "SOUTH");
    testRobotDirection("LEFT", "SOUTH", "EAST");
    testRobotDirection("LEFT", "EAST", "NORTH");
});

function testRobotIgnoreCommandBeforePlaced(command: string) {
    const robot: Robot = new Robot();

    it(`should ignore ${command} until it is placed`, () => {
        console.log = jest.fn();
        robot.action(command);
        robot.action("REPORT");
        expect(console.log).not.toHaveBeenCalledWith();
    });
}

describe("test robot ignore command before placed", () => {
    testRobotIgnoreCommandBeforePlaced("REPORT");
    testRobotIgnoreCommandBeforePlaced("MOVE");
    testRobotIgnoreCommandBeforePlaced("LEFT");
    testRobotIgnoreCommandBeforePlaced("RIGHT");
});




