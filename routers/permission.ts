import express from 'express';
import { Permission } from '../db/entities/Permission.js';
import dataSource from '../db/dataSource.js';

const router = express.Router();

router.post('/',(req,res)=> {
    try{
    const newPerm = new Permission();
    newPerm.name = req.body?.name;
    newPerm.description = req.body?.description;
    dataSource.transaction(async manager => {
        manager.save(newPerm);
    }).then(()=> {
        res.status(201).send(`Successfully added the perm, perm added: ${newPerm}`);
    }).catch(err=> {
        res.status(500).send(`db err, ${err}`);
    })
    }
    catch(err) {
    res.status(500).send(`an error occured while trying to add the permission, err: ${err}`);
    }
});

export default router;