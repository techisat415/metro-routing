import dotenv from 'dotenv';
import express from 'express';
import app from './app.js';
import { initGraph } from './services/routing.services.js';

dotenv.config({
    path: './.env'
});

initGraph().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});