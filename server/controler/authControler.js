// const auth = require("../models/autentication")
const emp = require("..//models/employee/empSchema")

module.exports = {


    // signup: (req, res, next) => {

    //     const email = req.body.email
    //     const password = req.body.password
    //     const name = req.body.name

    //     // res.send({ email: email, password: password, name: name })
    //     if (!email || !password) {
    //         res.send("you must provide email and password ")
    //     }


    //     auth.findOne({ email: email }, (err, found) => {
    //         if (err) {
    //             return next(err)
    //         }
    //         if (found) {
    //             return res.send({ error: "Email Is In Use" })
    //         }

    //         auth.create({ email: email, password: password, name: name })
    //             .then((data) => { res.send(data) })
    //     })
    // },


    login: (req, res, next) => {

        const email = req.body.email
        const password = req.body.password

        if (email && password) {

            emp.findOne({ email: email }, (err, found) => {

                if (err) {
                    return send({ success: false, message: "can't login user", returnObj: null })
                }

                if (found && found.password === password && found.email === email) {
                    var foundObj = found
                    foundObj.password = ''
                    return res.send({ success: true, message: "successfully login", returnObj: foundObj })

                }
                else{
                    res.send({ success: false, message: "Invalid email and password", returnObj: null })
                }

            })
        }
        else {
            res.send({ success: false, message: "provide username and password", returnObj: null })

        }
    }
}