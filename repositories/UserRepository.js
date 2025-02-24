import UserDAO from "../dao/userDAO.js";

class UserRepository {
    constructor() {
        this.userDAO = new UserDAO();
    }

    async getUserByEmail(email) {
        return await this.userDAO.getByEmail(email);
    }

    async createUser(userData) {
        return await this.userDAO.create(userData);
    }

    async getUserById(id) {
        return await this.userDAO.getById(id);
    }
}

export default UserRepository;
