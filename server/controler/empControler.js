const auth = require("../models/employee/empSchema")


module.exports = {


    createEmp: (req, res, next) => {

        const email = req.body.email
        const password = req.body.password
        const name = req.body.name

        if (!email || !password) {
            res.send("you must provide email and password ")
        }

        auth.findOne({ email: email }, (err, found) => {
            if (err) {
                return next(err)
            }
            if (found) {
                return res.send({ error: "Email Is In Use" })
            }

            auth.create({ email: email, password: password, name: name })
                .then((data) => { res.send(data) })
        })
    },
    signup: (req, res, next) => {

        const email = req.body.email
        const password = req.body.password
        const name = req.body.name

        if (!email || !password) {
            res.send("you must provide email and password ")
        }

        auth.findOne({ email: email }, (err, found) => {
            if (err) {
                return next(err)
            }
            if (found) {
                return res.send({ error: "Email Is In Use" })
            }

            auth.create({ email: email, password: password, name: name })
                .then((data) => { res.send(data) })
        })
    },


    login: (req, res, next) => {

        const email = req.body.email
        const password = req.body.password

        auth.findOne({ email: email }, (err, found) => {

            if (err) {
                return next(err)
            }

            if (found && found.password === password && found.email === email) {

                return res.send(found)

            }

            res.send({ error: "Invalid Username, Email And Password" })

        })

    }

}


// error
// return res.status(400).send({success: false, msg: err});

// failed
//   return res.status(500).send({success: false, msg: err + ' Failed to update'})

// success
//   res.json({success: true, msg: 'Successfully updated'});