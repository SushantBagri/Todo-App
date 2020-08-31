require('dotenv').config()

var knex = require('knex')({
    client: "mysql",
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
})

// Create users table
knex.schema.createTable('user', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('eMail').notNullable();
    table.string('password').notNullable();
    table.integer('age').notNullable();
    table.integer('cityId').unsigned().notNullable();
    table.foreign('cityId').references('city.cityId')
}).then(() => {
    console.log("User table created successfully....")
}).catch(() => {
    console.log("user table is already exists! or There is an error");
})

// Create Table city;
knex.schema.createTable('city', function (table) {
    table.increments('cityId').primary();
    table.string('city_name').notNullable();
}).then(() => {
    console.log("city table created successfully....")
}).catch(() => {
    console.log("city table is already exists! or There is an error");
})

// Create Table todos;
knex.schema.createTable('todos', function (table) {
    table.increments('id').primary();
    table.integer('assignedTo').notNullable();
    table.date('dueDate').notNullable();
    table.varchar('text').notNullable();
}).then(() => {
    console.log("todos table created successfully....")
}).catch(() => {
    console.log("todos table is already exists! or There is an error");
})

module.exports = knex;