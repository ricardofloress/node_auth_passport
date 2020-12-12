import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


/**
 * @DESC To register the user (ADMIN, SUEPR_ADMIN, USER)
 */
const userRegisterService = async (userDets, role, res) => {
    try {
        //validate email
        let emailExists = await (validateEmail(userDets.email));
        console.log(!emailExists)
        if (emailExists == true) {
            return res.status(400).json({
                message: 'Email already exists!',
                success: false
            });
        }

        //validate phone
        let phoneExists = await (validatePhone(userDets.phone));
        if (phoneExists == true) {
            return res.status(400).json({
                message: 'Phone already exists!',
                success: false
            });
        }

        const newUser = new User({ ...userDets, role });
        const createdUser = await newUser.save();
        return res.status(201).json({
            message: 'Successfully Registered!',
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to register!',
            success: false
        });
    }
};


/**
 * @DESC To LOGIN the user (ADMIN, SUEPR_ADMIN, USER)
 */
const userLoginService = async (userCreds, role, res) => {
    let { email, password } = userCreds;
    console.log(userCreds)
    let user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: 'Email not found! Invalid login credentials!',
            success: false
        });
    }

    if (user.role !== role) {
        return res.status(403).json({
            message: 'Please make sure you are logging in in the right portal!',
            success: false
        });
    }

    let isMatch = await user.matchPassword(password);

    if (isMatch) {
        let token = await generateToken(user);
        let result = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token: `Bearer ${token}`
        };
        return res.status(200).json({
            ...result,
            message: 'Successfully Logged In!',
            success: true
        });
    } else {
        return res.status(403).json({
            message: 'Incorrect password!',
            success: false
        });
    }

};

const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

const validatePhone = async (phone) => {
    let user = await User.findOne({ phone });
    return user ? false : true;
};

const generateToken = (user) => {
    return jwt.sign({ user_id: user._id, role: user.role, email: user.email, phone: user.phone }, process.env.APP_SECRET, { expiresIn: '5d' });
}

const serializeUser = (user) => {
    return {
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        _id: user._id,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    };
};

export { userRegisterService, userLoginService, serializeUser };


