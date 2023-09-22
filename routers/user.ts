import express from 'express';
import { User } from '../db/entities/User.js';
import { Profile } from '../db/entities/Profile.js';
import dataSource from '../db/dataSource.js';
import {insertUserProfile,getUsers,getRoles, login} from '../controllers/findUser.js'
import authme from '../middleware/Auth.js';
//import findUser from '../controllers/findUser.js';

const router = express.Router();

// router.get('/:id', async (req: express.Request,res: express.Response)=> {
//     const userId = parseInt(req.params.id);
//     findUser(userId).then((data)=> {
//         res.status(201).send(data);
//     })
// })

// router.post('/',async (req,res)=> {
//     try {
//         const newUser = new User();
//         const newProfile = new Profile();
//         newUser.username = req.body?.username;
//         newUser.password = req.body.password;
//         newUser.email = req.body.email;
        
//         newProfile.firstName = req.body.firstName;
//         newProfile.lastName = req.body.lastName;
//         newProfile.dateOfBirth = req.body.dateOfBirth;

//         newUser.profile = newProfile;

        
//         dataSource.transaction(async (manager)=> {
//             await manager.save(newUser);
//             await manager.save(newProfile);
//         }).then(()=> {
//             res.status(200).send(`A new user has been added, user: ${newUser}`);
//         }).catch(err=> {
//             console.error(`db err. ${err}`)
//             res.status(400).send(err);
//         });
//     }catch(err) {
//         console.error(err);
//         res.status(500).send(err)
//     }
// });

router.post('/',(req: express.Request ,res: express.Response) => {
    insertUserProfile(req.body).then((data)=> {
        res.status(201).send(`Successfully Added the user`)
    }).catch(err=> {
        console.error(`db err. ${err}`)
        res.status(500).send(`db err. ${err}`);
    })
});

router.get('/', authme ,(req: express.Request,res:express.Response)=> {
    getUsers().then(data=> {
        res.status(201).send(data);
    }).catch(err=> {
        res.status(500).send(`Somethink went wronk bruv`);
    })
})

router.post('/login',(req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    
    login(username,password).then(data=> {
        res.status(200).send(data);
    }).catch(err=> {
        res.status(404).send(err);
    })
});


export default router;