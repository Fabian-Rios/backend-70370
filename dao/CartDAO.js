import Cart from '../models/Cart.js';

class CartDAO {

    async getAll() {
        try {
            const carts = await Cart.find();
            return carts;
        } catch (error) {
            throw new Error('Error al obtener los carritos');
        }
    }


    async getById(id) {
        try {
            const cart = await Cart.findById(id);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            throw new Error('Error al obtener el carrito');
        }
    }

    async create(cartData) {
        try {
            const newCart = new Cart(cartData);
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error('Error al crear el carrito');
        }
    }

    async update(id, cartData) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(id, cartData, { new: true });
            if (!updatedCart) {
                throw new Error('Carrito no encontrado');
            }
            return updatedCart;
        } catch (error) {
            throw new Error('Error al actualizar el carrito');
        }
    }

    async delete(id) {
        try {
            const deletedCart = await Cart.findByIdAndDelete(id);
            if (!deletedCart) {
                throw new Error('Carrito no encontrado');
            }
            return deletedCart;
        } catch (error) {
            throw new Error('Error al eliminar el carrito');
        }
    }
}

export default new CartDAO();
