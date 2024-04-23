<?php

use App\Http\Controllers\Admin\ComodityController as AdminComodityController;
use App\Http\Controllers\Admin\ComodityPriceController;
use App\Http\Controllers\Admin\WarehouseController as AdminWarehouseController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComodityCategoryController;
use App\Http\Controllers\ComodityController;
use App\Http\Controllers\MarketController;
use App\Http\Controllers\RecieptController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\WarehouseController;
use App\Http\Resources\AdminComodityResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


$router->post('login', [AuthController::class, 'login']);
$router->post('register',[RegisterController::class,'register']);
$router->get('/warehouse/total', [WarehouseController::class, 'countWarehouse']);
$router->get('/warehouse/{id}', [WarehouseController::class, 'show']);
$router->get('/warehouse', [WarehouseController::class, 'index']);
$router->get('category', [ComodityCategoryController::class, 'index']);

$router->get('comodity/prices/{id}', [ComodityPriceController::class, 'price']);
$router->get('/comodity/category', [ComodityController::class, 'list']);

$router->group(['middleware' => 'jwt:api'], function () use ($router) {

    $router->group(['prefix' => 'admin'], function () use ($router) {
        $router->group(['middleware' => 'admin', 'prefix' => 'warehouse'], function () use ($router) {
            $router->get('/', [AdminWarehouseController::class, 'index']);
            $router->get('/{id}', [AdminWarehouseController::class, 'show']);
            $router->post('', [AdminWarehouseController::class, 'store']);
            $router->put('/{warehouse}', [AdminWarehouseController::class, 'update']);
            $router->delete('/{warehouse}',[AdminWarehouseController::class,'remove']);
        });

        $router->get('/regions', [AdminWarehouseController::class, 'region'])->middleware('admin');

        $router->group(['middleware' => 'supervisor',  'prefix' => 'comodity'], function () use ($router) {
            $router->get('/price', [ComodityPriceController::class, 'index']);
            $router->post('/price', [ComodityPriceController::class, 'store']);

            $router->get('', [AdminComodityController::class, 'index']);
            $router->get('/count', [AdminComodityController::class, 'count']);
            $router->get('/{comodity}', [AdminComodityController::class, 'show']);
            $router->put('/{comodity}', [AdminComodityController::class, 'update']);
            $router->delete('/{comodity}', [AdminComodityController::class, 'delete']);
        });
    });

    $router->group(['prefix' => 'comodity'], function () use ($router) {

        $router->group(['prefix' => 'market'], function () use ($router) {
            $router->get('', [MarketController::class, 'index']);
            $router->get('{id}', [MarketController::class, 'show']);
        });
        $router->get('/buy',[MarketController::class,'buyComodity']);
        // $router->get('/reciept/pdf/{id}',[RecieptController::class,'printPdf']);
        $router->post('/checkout', [MarketController::class, 'checkout']);
        $router->get('/reciept', [RecieptController::class, 'index']);
        $router->get('/transactions', [ComodityController::class, 'transactions']);
        $router->get('/list',[ComodityController::class,'listComodity']);
        $router->post('', [ComodityController::class, 'store']);
        $router->put('/{comodity}', [ComodityController::class, 'update']);
        $router->get('count', [ComodityController::class, 'count']);
        $router->get('/all', [ComodityController::class, 'index']);
        $router->get('/{comodity}', [ComodityController::class, 'show']);
    });
    $router->get('user/current', [AuthController::class, 'index']);
    $router->post('/logout', [AuthController::class, 'logout']);
    $router->post('/warehouse', [WarehouseController::class, 'store']);
});
