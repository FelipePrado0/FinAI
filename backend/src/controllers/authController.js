const authService = require('../services/authService');

class AuthController {
    async register(req, res, next) {
        try {
            const user = await authService.registerUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            // In Firebase auth, login is mostly handled on client side to get token
            // Backend validates token and maybe returns user profile from DB
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            next(error);
        }
    }

    async me(req, res, next) {
        try {
            // req.user is set by authMiddleware
            const user = await authService.getUserByFirebaseUid(req.user.uid);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
