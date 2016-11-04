namespace myshopproj.Controllers {
    //this is the Home Controller for states home page
    //and Profile page to display the products on to the browser
    export class HomeController {
        public message = 'Hello from the home page!';
        public products;
        public product;

        //This adds product to the cart when "additemstthecart"
        //button is pressed by user
        public addToCart(product){
            this.cartService.save(product).then(() => {
                console.log("going to CART");
                this.$state.go ('cart');
            });
        };

        public filterByCategory (categoryId) {
            console.log("Product in home controller = ", categoryId)
            this.productService.listByCategoryId (categoryId).then ((response) => {
                this.products = response;
                console.log ('*** products: ', response);
            //   this.$state.go('home');
            });
          }

        public save() {
            this.productService.save(this.product).then(() => {
                //this.todolisting.push(this.todolist);
                this.products = this.productService.list();
                this.product = null;
            });
        }
        public remove(id) {
            this.productService.remove(id).then(() => {
                this.products = this.productService.list(); // redisplay list
            }).catch((err) => {
                console.error(err);
            });
        }


        constructor(private productService:myshopproj.Services.ProductService,
            private cartService:myshopproj.Services.CartService,
            private $state:ng.ui.IStateService,
            private $stateParams:ng.ui.IStateParamsService)
            {
                if (window.session) {
                    this.user = window.session.user;
                }
                else {
                    this.user = {}
                }

                this.products = productService.list();
                // let productId = $stateParams['id'];
                // console.log(productId);
                // this.product = productService.get(productId);
                // console.log(this.product);
            }
        }

        export class SignupController {
            public message = 'Hello from the signup page!';
            public products;
            public product;

            public save() {
                // var result = ;
                // console.log ('result: ', this.signinService.save (this.product).$promise.then () {
                //
                // });
                // console.log ('test: ', this.signinService.save (this.product));
                this.signinService.save(this.product).then(() => {
                    // this.products = this.signinService.list();
                    // this.product = null;
                    this.$state.go ('aftersignuplogin');
                });
            }
            public remove(id) {
                this.signinService.remove(id).then(() => {
                    this.products = this.signinService.list(); // redisplay list
                }).catch((err) => {
                    console.error(err);
                });
            }

            constructor(private signinService:myshopproj.Services.SigninService,
                private $state:ng.ui.IStateService,
                private $stateParams:ng.ui.IStateParamsService)
                {

                    //  let productId = $stateParams['id'];
                    // // console.log(productId);
                    //     this.product = signinService.get(productId);
                    // // console.log(this.product);
                     this.products = signinService.list();
                }
            }


            //Controller for User Login
            export class LoginController {
                public message = 'Hello from the login page!';
                public products;
                public product;

                public save() {
                    this.loginService.save(this.product).then((response) => {
                        // this.products = this.loginService.list();
                        // this.product = null;
                        // this.$state.go ('profile');

                        // In the response pull out the data that has the redirectTo route.
                        console.log ('response: ', response);
                        console.log ('response data: ', response.data);

                        // Create the app data object.
                        if (window.session == null) {
                            window.session = {};
                        }
                        window.session.user = response.data.user;
                        console.log ('app data: ', window.session);

                        this.$state.go (response.data.redirect);

                        // this.$state.go (data.redirect);
                    });
                }

                constructor(private loginService:myshopproj.Services.LoginService,
                    private $state:ng.ui.IStateService,
                    private $stateParams:ng.ui.IStateParamsService)
                    {
                        //  this.products = loginService.list();
                    }
                }

        //Controller for Cart
        export class CartController {
            public products;
            public product;
            public cart;
            public itemlist;
            public total;

            public getcart() {
                this.cartService.list().then((response) => {
                    console.log('response: ', response)

                });
            }

            public clearCart(){
                //Clear the browser cart info
                this.products = {};
                this.total = '0';
                // this.cartService.list(); // redisplay list
                // this.cartService.remove(id).then((response) => {
                //     this.products = this.cartService.list(); // redisplay list
                //     this.$state.go ('cart');
                // }).catch((err) => {
                //     console.error(err);
                // });
            }

            public remove(id) {
                console.log('test ', id)
                this.cartService.remove(id).then((response) => {
                    console.log("this is cart controller remove ", response);
                        this.products = response.itemList;
                        this.total = response.total;
                    //this.cartService.list(); // redisplay list
                     this.$state.go ('cart');
                }).catch((err) => {
                    console.error(err);
                });
            }

            constructor (
                private cartService:myshopproj.Services.CartService,
                private $state:ng.ui.IStateService,
                private $stateParams:ng.ui.IStateParamsService
            ) {

                // Grab the items in the cart.

                // this.itemlist = response.itemlist;
                // this.total = response.total;
                // this.products = this.itemlist;

                // Make the call to the endpoint and grab the promise
                // so we know when the call is completed.
                let promise = cartService.list().$promise;

                // When the request is completed (we got a message back from server)
                // "then" do some action.
                promise.then ((response) => {
                    // this.itemlist = cartService.list();

                    let cart = response [0];
                    this.products = cart.itemList;
                    this.total = cart.total;

                    // // this.products = cartService.list();
                   // // this.total = cartService.list();
                   console.log("this is  itemlist in cartcontroller ", response);
                //    console.log("this is  itemlist in cartcontroller ", this.itemlist);
                //    console.log("this is  itemlist in cartcontroller ", this.itemlist [0]);
                });

            }
        }


            // public addItemtoCart() {
            //     console.log ('- Adding cart to item.');

                // let newitem = {
                //     name: 'Blue Dress',
                //     description: 'Some description',
                //     price: 200
                // };

                // this.cartService.save(newitem).then((response) => {
                //     console.log ('Newitem ', response);
                    // this.items.push(this.newitem);
                    // this.newitem = null;
                    // for (i = 0; i<cart.itemList.length; i++){
                    //     name[i] = cart.itemList[i].name;
                    //     price[i] = cart.itemList[i].price;
                    //     console.log("this is inside for loop ", name[i], price[i]);
            //         // }
            //     });
            // }

            //Admin Controller
        export class AdminController {
            public products;
            public product;

            public save() {
                this.adminService.save(this.product).then(() => {
                this.products = this.adminService.list();
                this.product = null;
          });
        }
            public remove(id) {
                this.adminService.remove(id).then(() => {
                    this.products = this.adminService.list();
                });
            }

            constructor(private adminService:myshopproj.Services.AdminService,
                        private $state:ng.ui.IStateService,
                        private $stateParams:ng.ui.IStateParamsService
                      )
                      {
                          this.products = adminService.list();
                          let productId = $stateParams['id'];
                          this.product = adminService.get(productId);

    }
}

            export class EditController {
            public product;

            public save() {
            this.productService.save(this.product).then(() => {
              this.$state.go('admin');
            });
            }

            constructor(
            private productService:myshopproj.Services.ProductService,
            private $state:ng.ui.IStateService,
            private $stateParams:ng.ui.IStateParamsService
            ) {
            let productId = $stateParams['id'];
            this.product = productService.get(productId);
            }

            }

            export class SearchController {
                public product;

                public search () {
                    console.log("Product in search controller = ", this.product)
                    this.searchService.listByCategoryId ('#1234').then (() => {
                      this.$state.go('home');
                    });
                  }

                  constructor(
                    private searchService:myshopproj.Services.SearchService,
                    private $state:ng.ui.IStateService,
                    private $stateParams:ng.ui.IStateParamsService
                  ) {
                    // let productId = $stateParams['id'];
                    // this.product = productService.get();
                  }


            }


            //Controller for About Page
            export class AboutController {
                public message = 'Hello from the about page!';
            }

            //Controller for Logout Page
            export class LogoutController {
                public message = 'You have Logged out!';
            }
        }
