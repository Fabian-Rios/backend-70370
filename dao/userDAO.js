import UserModel from '../models/User.js';

const createUser = async (userData) => {
    try {
        const newUser = await UserModel.create(userData);
        return newUser;
    } catch (error) {
        throw new Error('Error al crear el usuario');
    }
};

const findUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        return user;
    } catch (error) {
        throw new Error('Error al buscar el usuario por email');
    }
};

const findUserById = async (id) => {
    try {
        const user = await UserModel.findById(id);
        return user;
    } catch (error) {
        throw new Error('Error al buscar el usuario por ID');
    }
};

const UserDAO = {
    createUser,
    findUserByEmail,
    findUserById
};

export default UserDAO;
