import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
//import generateToken from '../utils/generateToken.js';
import { userLoginService, userRegisterService } from '../utils/auth.js';


//@desc Create user with user role
//@route POST /api/users/login
//@access Public
const userRegister = asyncHandler(async (req, res) => {
    await userRegisterService(req.body, 'user', res);
});

//@desc
//@route POST /api/users/login
//@access Public
const adminRegister = asyncHandler(async (req, res) => {
    await userRegisterService(req.body, 'admin', res);
});

//@desc
//@route POST /api/users/login
//@access Public
const superAdminRegister = asyncHandler(async (req, res) => {
    await userRegisterService(req.body, 'superadmin', res);
});

//@desc
//@route POST /api/users/login
//@access Public
const userLogin = asyncHandler(async (req, res) => {
    await userLoginService(req.body, 'user', res);
});

//@desc
//@route POST /api/users/login
//@access Public
const adminLogin = asyncHandler(async (req, res) => {
    await userLoginService(req.body, 'admin', res);
});


//@desc
//@route POST /api/users/login
//@access Public
const superAdminLogin = asyncHandler(async (req, res) => {
    await userLoginService(req.body, 'superadmin', res);
});


export { userRegister, adminRegister, superAdminRegister, adminLogin, superAdminLogin, userLogin };
