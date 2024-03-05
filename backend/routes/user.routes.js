const { authenticate } = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');


module.exports = (app) => {
    /**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 * 
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: User login
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid username or password
 */
    app.post('/api/users/login', UserController.login);

    /**
     * @swagger
     * /api/users/logout:
     *  post:
     *    tags:
     *      - Users
     *    summary: User logout
     *    description: Logout a user
     *    responses:
     *      200:
     *        description: User logged out successfully
     *      400:
     *        description: User not logged in
     */
    app.post('/api/users/logout', UserController.logout);

    /**
     * @swagger
     * /api/users/register:
     *   post:
     *     tags:
     *       - Users
     *     summary: Register a new user
     *     description: Register a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               confirmPassword:
     *                 type: string
     *     responses:
     *       '200':
     *         description: User registered successfully
     *       '400':
     *         description: Username or email already in use
     *       '500':
     *         description: Server error
     */
    app.post('/api/users/register', UserController.register);

    /**
     * @swagger
     * /api/users/loggedin:
     *   get:
     *     tags:
     *       - Users
     *     summary: Get logged in user
     *     description: Get the currently logged in user
     *     responses:
     *       200:
     *         description: User found
     *       400:
     *         description: User not found
     */
    app.get('/api/users/loggedin', authenticate, UserController.getLoggedInUser);

    /**
     * @swagger
     * /api/users:
     *   get:
     *     tags:
     *       - Users
     *     summary: Get all users
     *     description: Get all users
     *     responses:
     *       200:
     *         description: All users
     *       400:
     *         description: No users found
     *       500:
     *         description: Server error
     */
    app.get('/api/users', UserController.getAll);
}
