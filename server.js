import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from './config/passport.js';
import sessionsRouter from './routes/sessions.js';
import dotenv from 'dotenv';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import Ticket from './models/Ticket.js';


dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

mongoose.connect('mongodb://localhost:27017/your-database-name')
    .then(() => console.log('🚀 Base de datos conectada'))
    .catch((err) => console.error('Error de conexión:', err));

app.use('/api/sessions', sessionsRouter);

app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
