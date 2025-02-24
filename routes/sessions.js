import { Router } from 'express';
import UserDAO from '../dao/userDAO.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { successResponse, errorResponse } from '../utils/response.js';

const router = Router();
const JWT_SECRET = 'superSecretKey123'; 

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const existingUser = await UserDAO.findUserByEmail(email);
        if (existingUser) {
            return errorResponse(res, 'El usuario ya está registrado');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await UserDAO.createUser({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role: 'user',
        });

        successResponse(res, 'Usuario registrado con éxito', newUser);
    } catch (error) {
        errorResponse(res, 'Error interno del servidor', error);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserDAO.findUserByEmail(email);
        if (!user) {
            return errorResponse(res, 'Usuario no encontrado');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return errorResponse(res, 'Contraseña incorrecta');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true });
        successResponse(res, 'Login exitoso', { token });
    } catch (error) {
        errorResponse(res, 'Error interno del servidor', error);
    }
});

export default router;
