module.exports = (city, knex) => {
    city.post('/cities', (req, res) => {
        knex('city')
            .select()
            .where('city_name', req.body.name)
            .then(data => {
                if (data.length == 0) {
                    knex('city')
                        .insert({
                            'city_name': req.body.name
                        })
                        .then(result => {
                           res.send({
                               "id":result[0],
                               "name":req.body.name
                           })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else {
                    res.send({
                        "id":data[0].cityId,
                        "name": req.body.name
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
}