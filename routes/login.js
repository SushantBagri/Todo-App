module.exports = (login, knex, bcrypt) => {
    login.post('/login', (req, res) => {
        knex('user')
            .select()
            .where('eMail', req.body.eMail)
            .then(async (data) => {
                if (data.length > 0) {
                    if (await bcrypt.compare(req.body.password, data[0].password)) {
                        res.cookie('userId', data[0].id).send('login successfully')
                    }
                    else {
                        res.send('password is incorrect')
                    }
                }
                else {
                    res.send('user is not exist please sign up')
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
}