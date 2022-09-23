'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() =>{
    Route.resource('/blogs', 'BlogController').apiOnly()
    Route.resource('/categories', 'CategoryController').apiOnly()
}).middleware('auth').prefix('admin')

Route.get('/', 'AppController.index')

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')
