import express from 'express';
import { Role } from '../db/entities/Role.js';
import { Permission } from '../db/entities/Permission.js';
import { In } from 'typeorm';
import dataSource from '../db/dataSource.js';
import {insertPermission,insertRole,getUsers,getRoles} from '../controllers/findUser.js'
import authme from '../middleware/Auth.js';

const router = express.Router();

//   router.post('/',async (req,res)=> {
//     try {
//         const newRole = new Role();
//         newRole.name = req.body?.name;
//         if(req.body?.permId && req.body.permId.length > 0)
//         newRole.permissions = await Permission.find({where: {id: In(req.body?.permId) }});
//         dataSource.transaction(async manager => {
//             manager.save(newRole);
//         }).then(()=> {
//             res.status(200).send(`A new role has been added, Role: ${newRole}`);
//         }).catch(err=> {
//             console.error(`db err. ${err}`)
//         });
//     }
//     catch(err) {
//         res.send(500).send(`Something went wrong bruv, err: ${err}`);
//     }

//   });

router.post('/',(req : express.Request, res : express.Response)=> {
    insertRole(req.body).then(()=> {
        res.status(201).send(`Role has been created.`);
    }).catch(err=> {
        res.status(500).send(`Unexpected Error. error: ${err}`);
    });
});

router.get('/',authme,(req: express.Request, res: express.Response)=> {
    getRoles().then(data=> {
        res.status(201).send(data);
    }).catch(err=> {
        res.status(500).send(`Somethink went wronk bruv`);
    })
})

export default router;