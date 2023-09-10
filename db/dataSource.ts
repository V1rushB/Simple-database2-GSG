import { DataSource } from "typeorm";
import { Profile } from "./entities/Profile.js";
import { User } from "./entities/User.js";
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Permission,Role,User,Profile],
    //migrations: ['./**/migration/*.ts'],
    logging: true,
    //synchronize: true
});

dataSource.initialize().then(()=> {
    console.log(`Connected to DB dude!`);
}).catch(err=> {
    console.error(`Failed to connect to the database. Error: ${err}`);
});
export default dataSource;