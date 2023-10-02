import express from 'express';

function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error("ERROR NIGGA!!!!!11!111!11!1!1111!!1!!1!");
    res.status(500).send(err);
}

export default errorHandler;
