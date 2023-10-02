import './config.js';
import express from 'express';
import db from './db/dataSource.js';
import "reflect-metadata";
import 'dotenv/config';
import permission from './routers/permission.js';
import role from './routers/role.js';
import user from './routers/user.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error.js';
const app = express();
const PORT = process.env.PORT || 2077;
app.use(express.json());
app.use(cookieParser());
app.get('/health', (req, res) => {
    res.status(200).send("Full HP");
});
app.use('/user', user);
app.use('/permission', permission);
app.use('/role', role);
const dp = (x) => x * (x + 1) / 2;
app.use((req, res) => {
    let user = "Unknown";
    if (req.cookies["userEmail"] && req.cookies) {
        user = req.cookies["userEmail"];
        //  user = `Nigga` // :)
    }
    const x = dp(10);
    console.log(x);
    res.status(405).send(`Welp, you bruv requested something I dont have, maybe try and hack me. Monsieur ${user}?`);
});
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is ON and running on PORT: ${PORT}`);
    db.initialize().then(() => {
        console.log(`Connected to DB dude!`);
    }).catch(err => {
        console.error(`Failed to connect to the database. Error: ${err}`);
    });
});
//# sourceMappingURL=main.js.map