app.service('percentage_service', function() {
    var out_this = this;
    var links = {};
    var key_list_to_cal = [
        "username",
        "establish_year",
        "type",
        "time",
        "pic",
        "cover_pic",
        "footer_pic",
        "links",
        "technology",
        "culture",
        "location",
        "industry",
        "size",
        "tagline",
        "what_u_do",
        "who_u_r"
    ];
    // The object contains the url of five sections of all the edit_profile page

    //1.先判斷doc 裡面哪些key 是跟 edit mode 相關的,listed
    //2.這些key有沒有值？
    //3.沒值的話就列印出相關section的url


    var section_links_temp = {

        profile_setting: [{
                url: "/companies/profile/edit#profile_setting",
                url_exist: false
            },
            "tagline"
        ],
        company_info: [{
                url: "/companies/profile/edit?section=detail#company_info",
                url_exist: false
            },
            "location",
            "industry",
            "size",
            "establish_year"
        ],
        company_tags: [{
                url: "/companies/profile/edit?section=detail#company_tags",
                url_exist: false
            },
            "culture",
            "technology",
        ],
        company_instro: [{
                url: "/companies/profile/edit?section=detail#company_instro",
                url_exist: false
            },
            "what_u_do",
            "who_u_r",
        ],
        social_network: [{
                url: "/companies/profile/edit?section=social#social_network",
                url_exist: false
            },
            "links",
        ]
    };

    out_this.calculate = function(doc, percentage) {
        var counter = -4; //扣掉 username, type, length,time這四個key
        var doc2 = { length: 0 };

        //1.把要用的key篩選出來變成doc2，因為以後可能profile裡面會加更多的keys
        for (var key in doc) {
            for (var i = 0; i < key_list_to_cal.length; i++) {
                if (key == key_list_to_cal[i]) {
                    doc2[key] = doc[key];
                    doc2.length++;
                }
            }
        }


        for (var key in doc2) {
            //2. 判斷值是否存在，如果存在就counter++

            if (doc2[key] && doc2[key].length !== 0) {
                counter++;
            } else {
                //3. 如果不存在，找出它屬於哪個section,把那個section的url記錄下來
                console.log("type of ", key, "= ", typeof doc2[key]);
                for (var inner_key in section_links_temp) {
                    for (var j = 1; j < section_links_temp[inner_key].length; j++) {
                        if (key == section_links_temp[inner_key][j]) {
                            section_links_temp[inner_key][0].url_exist = true;
                        }
                    }
                }
            }
        }

        console.log("counter", counter);
        console.log("doc2 = ", doc2);
        var temp_percentage = ((counter) / 13 * 100).toString() + '%';
        console.log("percentage:", temp_percentage);
        percentage.counter = counter;
        percentage.value = temp_percentage;


        //@To do: return percentage and print it on the page
        // return percentage ;


        //Set the section anchor links to the links[] to following the data from DB 
        out_this.section_links_to_show(section_links_temp, percentage);
    };

    out_this.percentage = function() {
        return {
            counter: "",
            value: ""
        };
    };


    out_this.section_links_to_show = function(section_links_temp, percentage) {

        for (var key in section_links_temp) {
            if (section_links_temp[key][0].url_exist) {
                links[key] = section_links_temp[key][0].url;
            }
        }
        console.log("links= ", links);
        percentage.links = links;
    };

});
