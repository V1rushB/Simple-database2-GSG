import express from 'express';
import { User } from '../db/entities/User.js';
import { Profile } from '../db/entities/Profile.js';
import dataSource from '../db/dataSource.js';
import { insertUser, getUsers, getRoles, login } from '../controllers/findUser.js'
import authme from '../middleware/Auth.js';
import cookieParser from 'cookie-parser';
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

router.post('/', authme, async (req: express.Request, res: express.Response) => {
    insertUser(req.body).then((data) => {
        res.status(201).send(`Successfully Added the user`)
    }).catch(err => {
        console.error(`db err. ${err}`)
        res.status(500).send(`db err. ${err}`);
    })
});

router.get('/', authme, (req: express.Request, res: express.Response) => {
    getUsers().then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send(`Somethink went wronk bruv + ${err}`);
    })
})

router.post('/login', (req, res,next) => {
    const username = req.body.email;
    const password = req.body.password;

    if (username && password) {
        login(username, password).then(data => {
            res.cookie("userEmail", data.email, { maxAge: 30 * 60 * 1000 });
            res.cookie("authme", data.token, { maxAge: 30 * 60 * 1000 });
            res.cookie("loginDate", Date.now(), { maxAge: 30 * 60 * 1000 });

            res.status(200).send(`Hi`);
        }).catch(err => {
            next("Something went really really wrong my dude.");
        })
    }
    else {
        next("Invalid email or password.");
        //res.status(400).send(`Invalid email or password.`);
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie("userEmail");
    res.clearCookie("authme");
    res.clearCookie("loginDate");

    // res.cookie("userEmail",'',{maxAge:Date.now() - 1000});
    // res.cookie("authme",'',{maxAge:Date.now() - 1000}); that's some other way.
    // res.cookie("loginDate",'',{maxAge: Date.now() - 1000});

    res.status(200).send(`Logged out successfully`);
});

// register a new user using google authentication api given the token
router.post('/google', (req, res) => {
    const token = req.body.token;
    console.log(token);
    res.status(200).send(`Logged in successfully`);
})


export default router;
