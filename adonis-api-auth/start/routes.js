'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')



Route.on('/').render('index');
Route.on('/api/signup').render('auth.signup');
Route.post('/api/signup', 'UserController.create').validator('CreateUser');
Route.post('/api/login', 'UserController.login').validator('LoginUser');
Route.on('/api/login').render('auth.login');
//users routes
Route.get('/api/users', 'UserController.index')
Route.delete('/api/user/:id', 'UserController.destroy')
Route.put('/api/user/:id', 'UserController.update')
Route.get('/api/user/show/:id', 'UserController.show')


Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});

