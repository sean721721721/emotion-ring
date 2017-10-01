async = require('async'),
    fs = require("fs"),
    graph = require("fbgraph");
graph.setVersion("2.8");
var savejson = function savejson(name, jsondata) {
    var Today = new Date();
    var string = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate()
    fs.writeFile("./textdata/" + "tsai.json", JSON.stringify(jsondata));
};

var save_photo_id = function save_photo_id(id) {
    photo_id = id;
    console.log("photo_id = " + photo_id);
};

var callback = function callback(req, res) {

    var postid = req.query.postid;
    var token = req.query.token;

    console.log(req.query.postid);
    console.log(req.query.token);

    var photo_id = 0;


    //query setting
    graph.setAccessToken(token)
    var field_query = "?fields=from,created_time,message,comments{created_time,message,from,like_count}";

    get_recursive(postid, "comments", field_query, 12, function(err, res_posts) {
        if (err || !res_posts) {
            if (!res_posts) {
                console.log("Err res_posts === null: ");
                console.dir(res_posts);
                //callback({"error": {"message": "No feed."}}, res_posts);
            }
            console.dir(err);
            res.send({
                "error": {
                    "message": JSON.stringify(err)
                }
            });
        } else {
//res_posts.data = filter_information(res_posts.data);
/*            var p = res_posts.data.length;
            for (var i = 0; i < res_posts.data.length; i++) {

                get_reactions(res_posts.data[i].id, "?fields=reactions.type(LIKE).limit(0).summary(true).as(like),reactions.type(LOVE).limit(0).summary(true).as(love),reactions.type(WOW).limit(0).summary(true).as(wow),reactions.type(HAHA).limit(0).summary(true).as(haha),reactions.type(SAD).limit(0).summary(true).as(sad),reactions.type(ANGRY).limit(0).summary(true).as(angry)", res_posts.data[i], function(err, result) {
                    //reactions.push(res_reaction);
                    //res_posts.data[i].reactions = res_reaction;
                    //console.log(i + ": reactions");
                    res_posts.data[i] = result;
                    next();
                });
            }*/
            console.log(res_posts.data.comments.length);
            savejson(postid, res_posts.data);
            res.send(res_posts.data);

        }

        function next() {
            p--;
            if (p === 0) final();
        }

        function final() {
            savejson(postid, res_posts);
            res.send(res_posts);
        }
    });
}
var get_recursive = function get_recursive(postid, field_query, subfield_query, MAX_DEPTH, callback) {

    graph.get(postid +  '/' + subfield_query, function(err, res) {
        console.log(postid+'/'+subfield_query);
        if (err || !res) {
            if (!res) {
                console.log("Error %s===null.", field_query);
                callback({
                    "error": {
                        "message": "No sharedpost."
                    }
                }, res);
            }
            callback(err, res);
            return res;
        }

        var recurpaging = function recurpaging(res, depth, MAX_DEPTH, callback) {

            if (depth >= MAX_DEPTH) {
                console.log("[resursive paging: MAX_DEPTH");
                console.log(field_query + ".length: " + data_query.data.comments.data.length);
                //savejson("data_query", data_query);
                //console.log("data_query: " + data_query.data);
                callback(null, data_query);
                return;
            }

            if (res.data && res.paging && res.paging.next) {
                graph.get(res.paging.next, function(err, res) {
                    if (err) {
                        callback(err, res);
                    }
                    // page depth
                    depth++;
                    //console.log(res);
                    console.log("page " + depth + " " + field_query + ".length: " + res.data.length);

                    //data_query.data = data_query.data.concat(res.data);
                    data_query.data.comments.data.push.apply(data_query.data.comments.data, res.data);

                    //console.log("data_query: " + data_query.data );
                    //savejson("data_query", data_query);

                    setTimeout(function() {
                        recurpaging(res, depth, MAX_DEPTH, callback);
                    }, 2000);
                });
            } else {
                console.log("[resursive paging: end --------------]");
                console.log(field_query + ".length: " + data_query.data.comments.data.length);
                //savejson("data_query", data_query);
                //console.log("data_query: " + data_query.data.length);
                console.log(data_query.data.comments);
                //var winop = window.open('180.176.52.202:4000/textdata/Result.html', 'Yahoo', config='height=500,width=500');
                callback(null, data_query);
                return;
            }
        };

        //console.log(res);
        //console.log(res.data);
        //console.log("res.data.length: " + res.data.length );
        var data_query = {
            "data": []
        };
       // console.log(res.comments.paging.next+ "page");
        data_query.data = res; //data_query.data.concat(res.data);
        console.log("page " + 1 + " " + field_query + ".length: " + data_query.data.comments.data.length);
        recurpaging(res.comments, 1,12, callback);

        return;
    });
}; 

/*function get_reactions(postid, subfield_query, post, callback) {
    graph.get(postid + '/' + subfield_query, function(err, res) {
        if (err || !res) {
            if (!res) {
                console.log("Error %s===null.", field_query);
                callback({
                    "error": {
                        "message": "No sharedpost."
                    }
                }, res);
            }
            callback(err, res);
            return res;
        }
        //console.log(res);
        //console.log(post.likes);
        post.reactions = {
            "like": res.like.summary.total_count,
            "love": res.love.summary.total_count,
            "haha": res.haha.summary.total_count,
            "wow": res.wow.summary.total_count,
            "angry": res.angry.summary.total_count,
            "sad": res.sad.summary.total_count
        };
        callback(null, post);
        return;
    });
}*/

/*function filter_information(postdata) {
    console.log("posts length : " + postdata.length);

    var data, result = [];

    for (var i = 0; i < postdata.length; i++) {
        if (postdata[i].created_time) {
            if (postdata[i].shares) {
                data = {
                    "id": postdata[i].id,
                    "object_id": postdata[i].object_id,
                    "created_time": postdata[i].created_time,
                    "type": postdata[i].type,
                    "from": postdata[i].from,
                    "shares": postdata[i].shares.count,
                    "likes": postdata[i].reactions.summary.total_count,
                    "reactions": null,
                    "comments": postdata[i].comments.summary.total_count
                };
            } else {
                data = {
                    "id": postdata[i].id,
                    "object_id": postdata[i].object_id,
                    "created_time": postdata[i].created_time,
                    "type": postdata[i].type,
                    "from": postdata[i].from,
                    "shares": 0,
                    "likes": postdata[i].reactions.summary.total_count,
                    "reactions": null,
                    "comments": postdata[i].comments.summary.total_count
                };
            }

        } else {
            if (postdata[i].shares) {
                data = {
                    "id": postdata[i].id,
                    "object_id": postdata[i].object_id,
                    "created_time": postdata[i].updated_time,
                    "type": postdata[i].type,
                    "from": postdata[i].from,
                    "shares": postdata[i].shares.count,
                    "likes": postdata[i].reactions.summary.total_count,
                    "reactions": null,
                    "comments": postdata[i].comments.summary.total_count
                };
            } else {
                data = {
                    "id": postdata[i].id,
                    "object_id": postdata[i].object_id,
                    "created_time": postdata[i].updated_time,
                    "type": postdata[i].type,
                    "from": postdata[i].from,
                    "shares": 0,
                    "likes": postdata[i].reactions.summary.total_count,
                    "reactions": null,
                    "comments": postdata[i].comments.summary.total_count
                };
            }
        }
        result.push(data);
    }

    return result;
}
*/

var exports = module.exports = {};
exports.callback = callback;
