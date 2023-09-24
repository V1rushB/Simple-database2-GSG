import express from 'express';
import { Permission } from '../db/entities/Permission.js';
import dataSource from '../db/dataSource.js';
import {insertPermission,getUsers,getRoles, getPermission} from '../controllers/findUser.js'
import authme from '../middleware/Auth.js';

const router = express.Router();

router.post('/', async (req : express.Request,res: express.Response)=> {
    insertPermission(req.body).then(()=> {
        res.status(201).send(`Permissions has been added successfully.`);
    }).catch(err=> {
        res.status(500).send(`Unexpected Error: ${err}`);
    })
});

router.get('/',authme,(req : express.Request, res: express.Response)=> {
    getPermission().then(data => {
        res.status(200).send(data);
    }).catch(err=> {
        res.status(500).send(`An error occured.`);
    });
});

export default router;