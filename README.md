# Todo App

### Backend for ToDo.

- Here you can make your account and login
-  Assign task to yourself and others also with giving DueDate for the task
- You can see other users also
- You can see all Todos of other users and yours also
- You can filter todos data by `assignedTo`, `cityID`, `fromDueDate` and `toDueDate` url parameters.(if you want to filter data by due dates you have to give both `fromDueDate` and `toDueDate` parameters )
- You can filter todos data by `ageMoreThan`, `ageLessThan` and `cityId` url parameters.
- I implement pagination using `pageSize` and `pageNum` parameters. 

## Projet set-up
- Clone the repo `git clone https://github.com/SushantBagri/Todo-App.git`
- Change directory `cd Todo-App` and than Install dependencies by `npm install`
- Install nodemon gllobaly by `npm install -g nodemon`
- Make `.env` file and copy `sample.env` file to `.env` file and change the appropriate fields.
- Run `npm start` 