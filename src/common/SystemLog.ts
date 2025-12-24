import { error } from 'console';
import * as fs from 'fs'
import * as path from 'path'

const logFilPath = path.join(__dirname, '../../../logs/System.log')

export function LogToFile(Error : string){

    const time = new Date().toISOString();

    fs.appendFileSync(logFilPath,` \n [ time : ${time} ] <=> ${Error} \n `);
}