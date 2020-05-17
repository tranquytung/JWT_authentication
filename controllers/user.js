const User = require('../models/user');

module.exports = {
    async userRegister(req, res, next){
        try{
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        }catch(error){
            res.status(400).send(error)
        }
    },
    async userLogin(req, res, next){
        try {
            const { email, password } = req.body;
            const user = await User.findByCredentials(email, password);
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async userProfile(req, res, next){
        res.send(req.user);
    },
    async userLogout(req, res, next){
        // Log user out of the application
        console.log(res.user);
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }
}