var authControler = require("../controler/authControler")


module.exports = (app) => {


    // authentication
    app.post('/api/signup', authControler.signup)
    app.post('/api/login', authControler.login)


}