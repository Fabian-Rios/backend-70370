import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: 'Token no encontrado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};
