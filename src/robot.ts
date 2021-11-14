import { Action, COMMAND_MAP as COMMAND_MAP, Command, PLACE, getCommand } from "./action";
import { Direction, DIRECTION_MAP, DIRECTION_STRING_MAP, getDirection } from "./direction";
import { isNumber, modulo } from "./utilities";


const TABLE_MAX_LENGTH: number = 5, TABLE_MAX_WIDTH: number = 5;
const TABLE_MIN_LENGTH: number = 0, TABLE_MIN_WIDTH: number = 0;

export class Robot {
    private x: number = 0;
    private y: number = 0;
    private face_direction: Direction = Direction.NORTH;
    private placed: boolean = false;

    constructor() {}

    private validate_position(x: number, y: number): boolean {
        return x >= TABLE_MIN_LENGTH && x <= TABLE_MAX_LENGTH && 
            y >= TABLE_MIN_WIDTH && y <= TABLE_MAX_WIDTH;
    }

    private validateInput(input: string): Action {
        if (COMMAND_MAP.has(input)) {
            
            return new Action(getCommand(input));
        } else {
            const inputs: string[] = input.split(" ");
            if (inputs[0] === PLACE && inputs.length == 2) {
                const locations: string[] = inputs[1].split(",");            
                if (locations.length == 3 && 
                    isNumber(locations[0]) && 
                    isNumber(locations[1]) && 
                    DIRECTION_MAP.has(locations[2])
                ) {
                    const action: Action = new Action(Command.PLACE);
                    action.setPlaceX(parseInt(locations[0]));
                    action.setPlaceY(parseInt(locations[1]));
                    action.setPlaceDirection(getDirection(locations[2]));
                    return action;
                }
            }

            return new Action(Command.INVALID);
        }
    }
    
    private place(action: Action) {
        const x: number = action.getX();
        const y: number = action.getY();
        const direction: Direction = action.getDirection();
        if (this.validate_position(x, y)) {
            this.x = x;
            this.y = y;
            this.face_direction = direction;
            this.placed = true;
        }
    }
    
    private move() {
        let dry_x: number = this.x;
        let dry_y: number = this.y;
        switch (this.face_direction) {
            case Direction.NORTH:
                dry_y += 1;
                break;
            case Direction.SOUTH:
                dry_y -= 1;
                break;
            case Direction.EAST:
                dry_x += 1;
                break;
            case Direction.WEST:
                dry_x -= 1;
                break;
        }

        if (this.validate_position(dry_x, dry_y)) {
            this.x = dry_x;
            this.y = dry_y;
        }
    }

    private changeDirection(action: Action) {
        switch (action.getCommand()) {
            case Command.LEFT:
                this.face_direction -= 1 ;
                break;
            case Command.RIGHT:
                this.face_direction += 1;
                break;
        }
        this.face_direction = modulo(this.face_direction, Direction.WEST + 1);
    }

    private report() {
        console.log(`Output: ${this.x},${this.y},${DIRECTION_STRING_MAP.get(this.face_direction)}`);
        
    }

    private invalid() {
        return;
    }

    public action(input: string) {
        
        const action: Action = this.validateInput(input);
        const command: Command = action.getCommand();

        if (!this.placed) {
            if (command === Command.PLACE) {
                this.place(action);
            }
            return;
        }

        switch (command) {
            case Command.PLACE:
                this.place(action);
                break;
            case Command.LEFT:
            case Command.RIGHT:
                this.changeDirection(action);
                break;
            case Command.REPORT:
                this.report();
                break;
            case Command.MOVE:
                this.move();
                break;
            case Command.INVALID:
                this.invalid();
                break;
        }       
    }
}