export enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST,
}

export const validDirectionsString = ["NORTH", "EAST", "SOUTH", "WEST"];

export const DIRECTION_MAP = new Map<string, Direction> ([
    ["NORTH", Direction.NORTH],
    ["EAST", Direction.EAST],
    ["SOUTH", Direction.SOUTH],
    ["WEST", Direction.WEST],
]);

export const DIRECTION_STRING_MAP = new Map<Direction, string> ([
    [Direction.NORTH, "NORTH"],
    [Direction.EAST, "EAST"],
    [Direction.SOUTH, "SOUTH"],
    [Direction.WEST, "WEST"],
])


export function getDirection(directionValue: string): Direction {
    switch (directionValue) {
        case "NORTH":
            return Direction.NORTH;
        case "EAST":
            return Direction.EAST;
        case "SOUTH":
            return Direction.SOUTH;
        case "WEST":
            return Direction.WEST;
        default:
            return Direction.NORTH;
    }
}