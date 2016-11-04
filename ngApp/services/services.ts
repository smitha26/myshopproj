namespace myshopproj.Services {
    export class ProductService {
        private ProductResource;

        public list() {
            return this.ProductResource.query();
        }

        public listByCategoryId(categoryId){
            return this.ProductResource.query ({categoryId: categoryId}).$promise;
        }

        public save(newitem){
            return this.ProductResource.save(newitem).$promise;
        }
        public remove(productId) {
          return this.ProductResource.remove({id: productId}).$promise;
        }
        public get(id) {
          return this.ProductResource.get({id:id});
   }
        constructor($resource: ng.resource.IResourceService) {
            // this.ProductResource = $resource('/api/shopproducts/);
            this.ProductResource = $resource('/api/shopproducts/:id');
            // this.ProductResource = $resource('/api/products/:id');
        }
    }
    angular.module('myshopproj').service('productService', ProductService);

    export class SigninService {
        private SigninResource;

        public list() {
            return this.SigninResource.query();
        }
        public save(product){
            return this.SigninResource.save(product).$promise;
        }
        public get(productId) {
            return this.SigninResource.get({id: productId});
        }
        public remove(productId) {
            return this.SigninResource.remove({id: productId}).$promise;
        }
        constructor($resource: ng.resource.IResourceService) {
            this.SigninResource = $resource('/api/signup/:id');
        }
    }
    angular.module('myshopproj').service('signinService',SigninService);



    //Login service
    export class LoginService {
        private LoginResource;

        public list() {
            return this.LoginResource.query();
        }
        public save(product){
            return this.LoginResource.save(product).$promise;
        }
        public get(productId) {
            return this.LoginResource.get({id: productId});
        }
        public remove(productId) {
            return this.LoginResource.remove({id: productId}).$promise;
        }
        constructor($resource: ng.resource.IResourceService) {
            this.LoginResource = $resource('/api/login');
        }
    }
    angular.module('myshopproj').service('loginService',LoginService);



    //Login service
    export class CartService {
        private CartResource;


        public list() {
            return this.CartResource.query();
        }
        public save(product){
            console.log("This is the cart product in service ", product)
            return this.CartResource.save(product).$promise;
        }
        public savecart(cart){
            return this.CartResource.save(cart).$promise;
        }
        public get(productId) {
            return this.CartResource.get({id: productId});
        }
        public remove(productId) {
            return this.CartResource.remove({id: productId}).$promise;
        }
        constructor($resource: ng.resource.IResourceService) {
            this.CartResource = $resource('/api/cart/:id');
        }
    }
    angular.module('myshopproj').service('cartService',CartService);





  export class AdminService {
      private AdminResource;

      public list() {
        return this.AdminResource.query()
      }
      public save(product) {
        return this.AdminResource.save(product).$promise;
      }
      public get(productId) {
          return this.AdminResource.get({id: productId});
      }
      public remove(id) {
        return this.AdminResource.remove({id:id}).$promise;
      }
      constructor($resource:ng.resource.IResourceService) {
        this.AdminResource = $resource('/api/admin/:id');
      }

  }

  angular.module('myshopproj').service('adminService', AdminService);

  export class SearchService {
    private SearchResource;

    public list() {
      return this.SearchResource.query()
    }

    public save(product) {
      return this.SearchResource.save(product).$promise;
    }
    public get(product) {
        return this.SearchResource.get({id:product}).$promise;
    }
    constructor($resource:ng.resource.IResourceService) {
      this.SearchResource = $resource('/api/search');
    }

}

angular.module('myshopproj').service('searchService', SearchService);


}
