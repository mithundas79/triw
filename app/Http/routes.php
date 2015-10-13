<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'WelcomeController@index');
Route::get('category-list', 'WelcomeController@getCategoryList');

Route::group(['prefix' => 'pages'], function()
{
    Route::get('booking-form', [
        'as' => 'booking_form', 'uses' => 'WelcomeController@getBookingForm'
    ]);
});
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
