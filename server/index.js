import express from 'express';
import cors from 'cors';
import usersRouter from './routes/usersRouter.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log('Server started', PORT);
        });

    } catch (e) {
        console.log(e)
    }
}

start();