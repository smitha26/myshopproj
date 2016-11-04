namespace myshopproj {

    angular.module('myshopproj', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: myshopproj.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: '/ngApp/views/signup.html',
                controller: myshopproj.Controllers.SignupController,
                controllerAs: 'controller'
            })
            .state('aftersignuplogin', {
                url: '/aftersignuplogin',
                templateUrl: '/ngApp/views/aftersignuplogin.ejs',
                controller: myshopproj.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: myshopproj.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: '/ngApp/views/logout.html',
                controller: myshopproj.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: '/ngApp/views/profile.html',
                controller: myshopproj.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('search', {
                url: '/search',
                templateUrl: '/ngApp/views/search.html',
                controller: myshopproj.Controllers.SearchController,
                controllerAs: 'controller'
            })
            // .state('products', {
            //     url: '/products',
            //     templateUrl: '/ngApp/views/product.html',
            //     controller: myshopproj.Controllers.HomeController,
            //     controllerAs: 'controller'
            // })
            .state('cart', {
                url: '/cart',
                templateUrl: '/ngApp/views/cart.html',
                controller: myshopproj.Controllers.CartController,
                controllerAs: 'controller'
            })
            .state('clearcart', {
                url: '/clearcart',
                templateUrl: '/ngApp/views/clearcart.html',
                controller: myshopproj.Controllers.CartController,
                controllerAs: 'controller'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: '/ngApp/views/admin.ejs',
                controller: myshopproj.Controllers.AdminController,
                controllerAs: 'controller'
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: '/ngApp/views/edit.html',
                controller: myshopproj.Controllers.EditController,
                controllerAs: 'controller'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: myshopproj.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('error', {
                url: '/error',
                templateUrl: '/ngApp/views/error.ejs',
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
