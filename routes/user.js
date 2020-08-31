
module.exports = (user, knex, isUserAuthenticated) => {
    user.use(isUserAuthenticated); // use middleware for checking whether user is logged in or not
    user.get('/users', (req, res) => {
        let ageMoreThan = req.query.ageMoreThan || 0;
        let ageLessThan = req.query.ageLessThan || 999;
        let pageSize = req.query.pageSize;
        let pageNum = req.query.pageNum;
        knex('user')
            .select()
            .join('city', function () {
                this.on('user.cityId', 'city.cityId')
            })
            .where('age', '>=', ageMoreThan)
            .andWhere('age', '<=', ageLessThan)
            .modify(queryBuilder => {
                if (req.query.cityId) {
                    queryBuilder.andWhere('user.cityId', req.query.cityId);
                }
            })
            .limit(pageSize)
            .offset(pageSize * (pageNum - 1))
            .then(data => {
                let users = [];
                for (let i = 0; i < data.length; i++) {
                    users.push({
                        "id": data[i].id,
                        "name": data[i].name,
                        "eMail": data[i].eMail,
                        "age": data[i].age,
                        "city": {
                            "name": data[i].city_name,
                            "id": data[i].cityId
                        }
                    })
                }
                res.send({
                    "users": users
                })
            })
            .catch(err => {
                console.log(err);
            })
    })

    //get user by its ID
    user.get('/users/:userId', (req, res) => {
        knex('user')
            .select()
            .join('city', function () {
                this.on('user.cityId', 'city.cityId')
            })
            .where('user.id', req.params.userId)
            .then(data => {
                if (data.length > 0) {
                    let user = {
                        "id": data[0].id,
                        "name": data[0].name,
                        "eMail": data[0].eMail,
                        "age": data[0].age,
                        "city": {
                            "name": data[0].city_name,
                            "id": data[0].cityId
                        }
                    }
                    res.send({ "user": user })
                }
                else {
                    res.send(data)
                }

            })
            .catch(err => {
                console.log(err);
            })
    })
}