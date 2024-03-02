import express, { NextFunction, Request, Response, json } from 'express'
import user_router from './routes/user.router'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
app.use(express.json());
app.use(cors())
app.use(json())

app.use('/users', user_router)

app.use(bodyParser.urlencoded({ extended: false }));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: error.message
    })
    next()
})


let port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})