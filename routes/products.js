import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { authorizeRole } from '../middlewares/authRoles.js';

const router = Router();
router.post('/', authMiddleware, authorizeRole('admin'), async (req, res) => {
    try {
        res.json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

router.put('/:id', authMiddleware, authorizeRole('admin'), async (req, res) => {
    try {
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

router.delete('/:id', authMiddleware, authorizeRole('admin'), async (req, res) => {
    try {
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;
