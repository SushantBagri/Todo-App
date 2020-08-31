module.exports = (todo, knex, moment, isUserAuthenticated) => {
    todo.use(isUserAuthenticated); // use middleware for checking whether user is logged in or not
    //assign todo to yourself or other users
    todo.post('/todos', (req, res) => {

        if (moment(req.body.dueDate).format('YYYY-MM-DD') !== 'Invalid date') {
            req.body.dueDate = moment(req.body.dueDate).format('YYYY-MM-DD');
            knex('todos')
                .insert(req.body)
                .then((result) => {
                    knex('todos')
                        .select()
                        .join('user', function () {
                            this.on('user.id', 'todos.assignedTo')
                        })
                        .join('city', function () {
                            this.on('user.cityId', 'city.cityId')
                        })
                        .where('todos.id', result[0])
                        .then(data => {
                            let todo = {
                                "text": data[0].text,
                                "assignedTo": {
                                    "id": data[0].id,
                                    "name": data[0].name,
                                    "eMail": data[0].eMail,
                                    "city": {
                                        "name": data[0].city_name,
                                        "id": data[0].cityId
                                    }
                                },
                                "dueDate": moment(data[0].dueDate).format('YYYY-MM-DD')
                            }
                            res.send({
                                "todo": todo
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            res.send('there is an error please check your inputs fields');
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.send('there is an error please check your inputs fields')
                })
        }
        else {
            res.send('you give wrong date format');
        }
    })

    //get logged in user todos only
    todo.get('/mytodos', (req, res) => {
        let pageSize = req.query.pageSize;
        let pageNum = req.query.pageNum;
        let userId = (req.headers.cookie).slice(7);
        knex('todos')
            .select()
            .join('user', function () {
                this.on('todos.assignedTo', 'user.id')
            })
            .join('city', function () {
                this.on('user.cityId', 'city.cityId')
            })
            .where('assignedTo', userId)
            .limit(pageSize)
            .offset(pageSize * (pageNum - 1))
            .then(data => {
                let todos = [];
                for (let i = 0; i < data.length; i++) {
                    todos.push({
                        "text": data[i].text,
                        "assignedTo": {
                            "id": data[i].id,
                            "name": data[i].name,
                            "eMail": data[i].eMail,
                            "city": {
                                "name": data[i].city_name,
                                "id": data[i].cityId
                            }
                        },
                        "dueDate": moment(data[i].dueDate).format('YYYY-MM-DD')
                    })
                }
                res.send({
                    "todos": todos
                })
            })
            .catch(err => {
                console.log(err);
            })
    })

    //get todods with some more url parameter
    todo.get('/todos', (req, res) => {
        let pageSize = req.query.pageSize;
        let pageNum = req.query.pageNum;
        knex('todos')
            .select()
            .join('user', function () {
                this.on('todos.assignedTo', 'user.id')
            })
            .join('city', function () {
                this.on('user.cityId', 'city.cityId')
            })
            .where('todos.assignedTo', 'like', req.query.assignedTo || '%')
            .andWhere('city.cityId', 'like', req.query.cityID || '%')
            .modify(queryBuilder => {
                if (req.query.fromDueDate && req.query.toDueDate) {
                    queryBuilder.andWhereBetween('dueDate', [req.query.fromDueDate, req.query.toDueDate]);
                }
            })
            .limit(pageSize)
            .offset(pageSize * (pageNum - 1))
            .then(data => {
                let todos = [];
                for (let i = 0; i < data.length; i++) {
                    todos.push({
                        "text": data[i].text,
                        "assignedTo": {
                            "id": data[i].id,
                            "name": data[i].name,
                            "eMail": data[i].eMail,
                            "city": {
                                "name": data[i].city_name,
                                "id": data[i].cityId
                            }
                        },
                        "dueDate": moment(data[i].dueDate).format('YYYY-MM-DD')
                    })
                }
                res.send({
                    "todos": todos
                })
            })
            .catch(err => {
                console.log(err);
            })
    })
}