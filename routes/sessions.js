import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js'; 
import { authMiddleware } from '../middlewares/auth.js'; 
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET; 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true }).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/current', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

export default router;
