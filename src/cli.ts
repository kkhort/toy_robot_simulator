#!/usr/bin/env node

import { Robot } from './robot'
import * as readline from 'readline';

function main() {
    const robot: Robot = new Robot();
    
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.prompt();
    rl.on('line', (line) => {
        robot.action(line);
        rl.prompt();
    }).on('close', () => {
        console.log('Robot is shutting off...\nRobot says Good Bye.')
    })
}

main()




