import { Router } from 'express';
import CartDAO from '../dao/CartDAO.js';
import ProductDAO from '../dao/ProductDAO.js';
import Ticket from '../models/Ticket.js';
import { authMiddleware } from '../middlewares/auth.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = Router();

router.post('/:cid/purchase', authMiddleware, async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartDAO.getById(cid);

        if (!cart) {
            return errorResponse(res, 'Carrito no encontrado', 404);
        }

        let totalAmount = 0;
        let productsNotProcessed = [];

        for (let cartItem of cart.products) {
            const product = await ProductDAO.getById(cartItem.product._id);

            if (product.stock >= cartItem.quantity) {
                product.stock -= cartItem.quantity;
                totalAmount += product.price * cartItem.quantity;
                await ProductDAO.update(product._id, { stock: product.stock });
            } else {
                productsNotProcessed.push(cartItem.product._id);
            }
        }

        if (totalAmount > 0) {
            const ticket = await Ticket.create({
                code: `TICKET-${Date.now()}`,
                amount: totalAmount,
                purchaser: req.user.email
            });

            cart.products = cart.products.filter(item => productsNotProcessed.includes(item.product._id));
            await CartDAO.update(cid, { products: cart.products });

            return successResponse(res, 'Compra realizada con éxito', { ticket, productsNotProcessed });
        }

        return errorResponse(res, 'No se pudo procesar la compra, productos sin stock suficiente', 400, { productsNotProcessed });

    } catch (error) {
        return errorResponse(res, 'Error interno del servidor', 500, error);
    }
});

export default router;
