import ProductModel from '../models/Product.js';

export default class ProductDAO {

    async getAll() {
        try {
            return await ProductModel.find();
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + error.message);
        }
    }

    async getById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            throw new Error('Error al obtener el producto: ' + error.message);
        }
    }

    async create(productData) {
        try {
            const product = new ProductModel(productData);
            return await product.save();
        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    async update(id, productData) {
        try {
            return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }

    async delete(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
}
