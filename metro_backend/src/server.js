import dotenv from 'dotenv';
import express from 'express';
import app from './app.js';

dotenv.config({
    path: './.env'
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});