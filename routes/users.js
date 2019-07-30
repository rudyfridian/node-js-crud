'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/usersController');

    // todoList Routes
    app.route('/users')
        .get(todoList.list_all_users)
        .post(todoList.create_a_user);


    app.route('/users')
        .get(todoList.read_a_user_by_account_number)
        .put(todoList.update_a_user_by_account_number)
        .delete(todoList.delete_a_user_by_account_number);

    app.route('/users')
        .get(todoList.read_a_user_by_account_number)
        .put(todoList.update_a_user_by_account_number)
        .delete(todoList.delete_a_user_by_account_number);
};
