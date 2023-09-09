import express from 'express';
import { Role } from '../db/entities/Role.js';
import { Permission } from '../db/entities/Permission.js';
import { In } from 'typeorm';
import dataSource from '../db/dataSource.js';

const router = express.Router();

  router.post('/',async (req,res)=> {
    try {
        const newRole = new Role();
        newRole.name = req.body?.name;
        if(req.body?.permId && req.body.permId.length > 0)
        newRole.permissions = await Permission.find({where: {id: In(req.body?.permId) }});
        dataSource.transaction(async manager => {
            manager.save(newRole);
        }).then(()=> {
            res.status(200).send(`A new role has been added, Role: ${newRole}`);
        }).catch(err=> {
            console.error(`db err. ${err}`)
        });
    }
    catch(err) {
        res.send(500).send(`Something went wrong bruv, err: ${err}`);
    }

  });