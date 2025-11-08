import express from 'express';
import * as dotenv from 'dotenv';
import { expressjwt } from 'express-jwt';
import cors from 'cors';
import bodyParser from 'body-parser';
import { courseRouter } from './controller/course.router';
import swaggerJSDoc from'swagger-jsdoc' ;
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;


dotenv.config();
app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status'],
    })
);

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use('/courses',courseRouter);
app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});
