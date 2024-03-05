const {authenticate} = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    // User routes

    /**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 * /api/users/login:
 *   post:
 *     description: Log in a user
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */
    app.post('/api/users/login', UserController.login);

/**
 * @swagger
 * tags: 
 *   name: Users
 *   description: User management
 * /api/users/logout:
 *   post:
 *     description: Log out a user
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

    app.post('/api/users/logout', UserController.logout);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 * /api/users/register:
 *   post:
 *     description: Register a new user
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
    app.post('/api/users/register', UserController.register);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 * /api/users/loggedin:
 *   get:
 *     description: Get the logged in user
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
    app.get('/api/users/loggedin', authenticate, UserController.getLoggedInUser);
}
