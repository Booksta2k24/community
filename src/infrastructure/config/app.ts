import 'dotenv/config'

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from '../../usecase/handler/errorHandler';
import postRouter from '../routes/postRoute';
import helmet from 'helmet';
import { consumeUserData } from '../messaging/rabbitmqConnection';

export const app = express();

app.use(cors({origin: "*"}))

consumeUserData()

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'trusted-scripts.com'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
            },
        },
        frameguard: { action: 'deny' },
    })
);

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use(morgan('dev'));

app.use("/api", postRouter);

// Use error handler
app.use(errorHandler);