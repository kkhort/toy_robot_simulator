import { Direction } from "./direction";

export const MOVE: string = "MOVE";
export const PLACE: string = "PLACE";
export const LEFT: string = "LEFT";
export const RIGHT: string = "RIGHT";
export const REPORT: string = "REPORT";

export enum Command {
    PLACE,
    MOVE,
    LEFT,
    RIGHT,
    REPORT,
    INVALID,
}

export const COMMAND_MAP = new Map<string, Command> ([
    [MOVE, Command.MOVE],
    [PLACE, Command.PLACE],
    [REPORT, Command.REPORT],
    [LEFT, Command.LEFT],
    [RIGHT, Command.RIGHT],
]);

export function getCommand(commandValue: string): Command {
    switch (commandValue) {
        case MOVE:
            return Command.MOVE;
        case PLACE:
            return Command.PLACE;
        case LEFT:
            return Command.LEFT;
        case RIGHT:
            return Command.RIGHT;
        case REPORT:
            return Command.REPORT;
        default:
            return Command.INVALID;
    }
}

export class Action {
    private command: Command;
    private placeX: number = 0;
    private placeY: number = 0;
    private placeDirection: Direction = Direction.NORTH;

    constructor(command: Command) {
        this.command = command;
    }

    public setPlaceX(x: number) {
        this.placeX = x;
    }

    public setPlaceY(y: number) {
        this.placeY = y;
    }

    public setPlaceDirection(direction: Direction) {
        this.placeDirection = direction;
    }

    public getCommand(): Command {
        return this.command;
    }

    public getX(): number {
        return this.placeX;
    }
    
    public getY(): number {
        return this.placeY;
    }
    
    public getDirection(): Direction {
        return this.placeDirection;
    }

}
