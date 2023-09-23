import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../db/entities/User.js';

const authme = async (req:express.Request,res:express.Response,next: express.NextFunction) => {
    try {
    const token = req.headers["authorization"] || "";
    const isValid = jwt.verify(token as string,process.env.SECRET_KEY || '');

    if(isValid) {
        const decode = jwt.decode(token as string, { json: true })
        const user = await User.findOne({
            where:{email:decode?.email}
        })
        res.locals.user = user;
        next();
        return;
    }
    res.status(401).send(`tf u doing bruv`);
    } catch(err) {
        res.send(err);
    }
}

export default authme;