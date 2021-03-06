var should = chai.should();
var expect = chai.expect;




describe('Profile_edit_app', function() {

    var $controller;
    var $httpBackend;
    var request_handler;


    beforeEach(function() {
        module('profile_edit_app');
    });

    beforeEach(inject(function(_$controller_, $injector) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        // $httpBackend = $injector.get('$httpBackend');
        // request_handler = $httpBackend.when('POST', "/companies/profile/edit")
        //     .respond();
    }));


    describe('Profile_edit_controller', function() {


        it('Should get the value from $scope.test to make sure mocha is running angular', function() {
            var $scope = {};
            var controller = $controller('profile_edit_controller', { $scope: $scope });
            expect($scope.test).to.contain("test in profile_edit_controller");
        });


        it('Should return 200 and should console 200 and res', function() {
            // request_handler.respond(200,{code:200,errmsg:""});

            var $scope = {};
            var controller = $controller('profile_edit_controller', { $scope: $scope });
            var btn = document.createElement('a');

            // $httpBackend.expectPOST("/companies/profile/edit");

            btn.setAttribute("data-router", "/companies/profile/edit");
            //remember to comment the line of the "location.reload()"
            $scope.upload('test',"/companies/profile/edit");
            
            console.log($scope.res);
            // expect($scope.res.code).to.equal(200);
        });


    });

    // descirbe('detail_controller',function(){
    //     it('Should get the value from $scope.test to make sure mocha is running angular',function(){

    //     })
    // });



    // it('Check the key of the data', function() {
    //     var formData = { username: "", tagline: "" };

    //     expect(formData).to.have.property('username');
    //     expect(formData).to.have.property('tagline');

    // });

    // it('Check the data type with specific key', function() {
    //     var formData = { username: "walter", tagline: "walterhahahahah" };

    //     expect(typeof formData.username).is.a("string");
    //     expect(typeof formData.tagline).is.a("string");
    // });

    // it.skip('Check the data with wrong data type', function() {
    //     var formData = { username: 123, tagline: [2, 3, 1] };

    //     expect(typeof formData.username).is.a("string");
    //     expect(typeof formData.tagline).is.a("string");
    // });


});
