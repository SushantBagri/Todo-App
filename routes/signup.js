
module.exports = (knex, bcrypt, signup) => {
    signup.post('/signup', (req, res) => {
        knex('user')
            .select()
            .where('eMail', req.body.eMail)
            .then(async (data) => {
                if (data.length == 0) {
                    req.body.password = await bcrypt.hash(req.body.password, 10);
                    knex('user')
                        .insert(req.body)
                        .then(result => {
                            knex('city')
                                .select()
                                .where('cityId', req.body.cityId)
                                .then(data => {
                                    res.send({
                                        "id": result[0],
                                        "name": req.body.name,
                                        "eMail": req.body.eMail,
                                        "age": req.body.age,
                                        "city": {
                                            "name": data[0].city_name,
                                            "id": data[0].cityId
                                        }
                                    })
                                })
                                .catch(err => {
                                    res.send('there is an error check your inputs')
                                    console.log(err)
                                })

                        })
                        .catch(err => {
                            console.log(err)
                            res.send('there is an error check your inputs')
                        })
                }
                else {
                    res.send('user with this email is already exists!!!')
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
}