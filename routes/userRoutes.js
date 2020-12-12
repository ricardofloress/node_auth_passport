import express, { Router } from 'express';
const router = express.Router();
import { userRegister, adminRegister, superAdminRegister, userLogin, adminLogin, superAdminLogin } from '../controllers/userController.js';
import { checkRole, userAuth } from '../middleware/passport.js';
import { serializeUser } from '../utils/auth.js';


// Users Registeration Route
router.post('/register-user', userRegister);

// Admin Registration Route
router.post('/register-admin', adminRegister);

// Super Admin Registration Route
router.post('/register-super-admin', superAdminRegister);

// Users Login Route
router.post('/login-user', userLogin);

// Admin Login Route
router.post('/login-admin', adminLogin);

// Super Admin Login Route
router.post('/login-super-admin', superAdminLogin);

// Profile Route
router.get('/profile', userAuth, async (req, res) => {
    return res.json(serializeUser(req.user));
});


// Users Protected Route
router.get("/user-protectd", userAuth, checkRole(["user"]), async (req, res) => {
    return res.json("Hello User");
}
);

// Admin Protected Route
router.get("/admin-protectd", userAuth, checkRole(["admin"]), async (req, res) => {
    // return res.json("Hello Admin");
}
);

// Super Admin Protected Route
router.get("/super-admin-protectd", userAuth, checkRole(["superadmin"]), async (req, res) => {
    // return res.json("Hello Super Admin");
}
);

// Super Admin Protected Route
router.get("/super-admin-and-admin-protectd", userAuth, checkRole(["superadmin", "admin"]), async (req, res) => {
    //return res.json("Super admin and Admin");
}
);


export default router;
