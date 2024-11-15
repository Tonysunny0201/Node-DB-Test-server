const express = require('express')
const userController = require('../controller/userController')
const jtwMiddlware = require('../middlewares/jwtMiddleware')
const router = new express.Router()

// register : http://localhost:3000/reg
router.post('/reg',userController.registerController)
// login : http://localhost:3000/login
router.post('/login',userController.loginController)
// view-user : http://localhost:3000/view-user
router.get('/view-user',userController.userViewController)
// view-user-details : http://localhost:3000/view-user-details
router.get('/view-user-details',jtwMiddlware,userController.viewUserDetailsController)


module.exports = router;