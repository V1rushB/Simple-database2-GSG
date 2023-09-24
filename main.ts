import './config.js';
import express from 'express';
import db from './db/dataSource.js';
import "reflect-metadata";
import 'dotenv/config';
import permission from './routers/permission.js';
import role from './routers/role.js';
import user from './routers/user.js';



const app = express();
const PORT = process.env.PORT || 2077;
app.use(express.json());



app.get('/health',(req,res)=> {
    res.status(200).send("Full HP");
});

app.use('/user',user);
app.use('/permission',permission);
app.use('/role',role);

app.use((req : express.Request,res: express.Response)=>{
    res.status(405).send(`Welp, you bruv requested something I dont have, maybe try and hack me?`);
});

app.listen(PORT,()=> {
    console.log(`Server is ON and running on PORT: ${PORT}`);
    db.initialize().then(()=> {
        console.log(`Connected to DB dude!`);
    }).catch(err=> {
        console.error(`Failed to connect to the database. Error: ${err}`);
    });
});