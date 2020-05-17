const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/user/register',userController.userRegister);
router.post('/user/login', userController.userLogin);
router.get('/user/me', auth, userController.userProfile);
router.post('/user/logout', auth, userController.userLogout);




module.exports = router;