import express from 'express';
import { User } from '../db/entities/User.js';
import { Profile } from '../db/entities/Profile.js';
import dataSource from '../db/dataSource.js';

const router = express.Router();

router.post('/',async (req,res)=> {
    try {
        const newUser = new User();
        const newProfile = new Profile();
        newUser.username = req.body?.username;
        newUser.password = req.body?.password;
        newUser.email = req.body?.email;
        
        newProfile.firstName = req.body?.firstName;
        newProfile.lastName = req.body?.lastName;
        newProfile.dateOfBirth = new Date(req.body?.dateOfBirth);

        newUser.profile = newProfile;

        
        dataSource.transaction(async (manager)=> {
            await manager.save(newUser);
            await manager.save(newProfile);
        }).then(()=> {
            res.status(200).send(`A new user has been added, user: ${newUser}`);
        }).catch(err=> {
            console.error(`db err. ${err}`)
        });
    }catch(err) {
        res.status(500).send(err)
    }
});

export default router;