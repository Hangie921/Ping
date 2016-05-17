// 1st controller of the edit mode with profile_edit_controller
app.controller('profile_edit_controller', ['$scope', '$http', 'percentage_service', function($scope, $http, percentage_service) {

    $scope.links = null;
    $scope.doc = null;
    $scope.test = 'test in profile_edit_controller';
    $scope.res = {};
    //data was called in the company_profile_edit.jade , line10

    $scope.init = function() {
        percentage_service.calculate(data, percentage_service.percentage);
        $scope.doc = data;
        var value = percentage_service.percentage.value.split(".");
        $scope.percentage = value[0].length == 4 ? value[0] : value[0] + '%';
        $scope.links = percentage_service.percentage.links;
    };





    // @Todo : Ajax upload using angular

    // $scope.upload = function(formName, btn) {
    //     var formData = new FormData(document.forms.namedItem(formName));

    //     formData.append("CustomField", "This is some extra data");

    //     var request = {
    //         method: 'POST',
    //         url: btn.getAttribute("data-router"),
    //         data: formData,
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     };

    //     $http(request).then(function(response){
    //         $scope.res = response;
    //         console.log(response);
    //         // location.reload();
    //     },function(response){
    //         $scope.res = response;
    //         console.log(response);
    //     });


    //     // var ajax = $http({
    //     //     headers: {
    //     //         'Content-type': 'multipart/form-data'
    //     //     },
    //     //     url: btn.getAttribute("data-router"),
    //     //     method: 'POST',
    //     //     data: formData

    //     // });
    //     // ajax.success(function(data, status) {
    //     //     res = data;
    //     // });

    //     // ajax.error(function(data, status) {
    //     //     res.code = 400;
    //     // });


    // };

    $scope.upload = function(formName, event) {
        var btn = event.currentTarget;
        var formData = new FormData(document.forms.namedItem(formName));
        formData.append("CustomField", "This is some extra data");
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function(resp_inside) {

            if (oReq.readyState == 4 && oReq.status == 200) {
                var res = JSON.parse(oReq.response);
                console.log(res.code);
                if (res.code == 200) {
                    console.log("by $scope.upload of the 1st controller", res);
                    $scope.res = res;
                    console.log($scope.res);
                    location.reload(); // To run the Unit test, you have to comment this line

                } else {
                    console.log(oReq.response);
                    // return res.errmsg;
                    $scope.res = res;
                }

            }

        };


        oReq.open("POST", btn.getAttribute("data-router"), true);
        oReq.send(formData);

    };


    $scope.click_the_file_input = function(input) {
        $(input).click();
        console.log("input clicked");
    };


    $scope.read_url = function(input, panel_selector) {
        console.log("read url");
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $(panel_selector).attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    };


}]); // end of the 1st controller


