module.exports = function(app, UserModel) {
    app.get("/lectures/ejs/mongo", index);
    app.post("/lectures/ejs/mongo/register", register);
    app.get("/lectures/ejs/mongo/randomize", randomize);
    app.get("/lectures/ejs/mongo/remove/:id", remove);

    function remove(req, res) {
        var id = req.params.id;
        UserModel
            .remove(id)
            .then(
                function() {
                    res.redirect("/lectures/ejs/mongo");
                },
                function(err) {
                    var data = {
                        error: err
                    };
                    res.render("lecture/mongo/error.ejs", data);
                }
        );
    }

    function randomize(req, res) {
        var secret = req.query.secret;
        if(secret != "321") {
            res.redirect("/lectures/ejs/mongo");
            return;
        }
        UserModel
            .randomize()
            .then(
                function() {
                    res.redirect("/lectures/ejs/mongo");
                },
                function(err) {
                    var data = {
                        error: err
                    };
                    res.render("lecture/mongo/error.ejs", data);
                }
        );
    }

    function register(req, res) {
        UserModel
            .createStudent(req.body)
            .then(
                function() {
                    res.redirect("/lectures/ejs/mongo");
                },
                function(err) {
                    console.log(err);
                    var data = {
                        error: err
                    };
                    res.render("lecture/mongo/error.ejs", data);
                }
        )
    }

    function index(req, res) {
        UserModel
            .getAllStudents()
            .then(
                function(students) {
                    //console.log(students);
                    var data = {
                        students: students
                    };
                    res.render("lecture/mongo/index.ejs", data);
                },
                function(err) {
                    console.log(err);
                    var data = {
                        error: err
                    };
                    res.render("lecture/mongo/error.ejs", data);
                }
        )
    }
}