const { User } = require('../models');

class AuthService {
    async registerUser(userData) {
        // Check if user exists
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Create user in DB
        const user = await User.create({
            email: userData.email,
            firebaseUid: userData.firebaseUid,
            displayName: userData.displayName,
            photoURL: userData.photoURL
        });

        return user;
    }

    async getUserByFirebaseUid(firebaseUid) {
        const user = await User.findOne({ where: { firebaseUid } });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }
}

module.exports = new AuthService();
