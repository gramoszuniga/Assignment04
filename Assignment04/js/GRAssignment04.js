/*
 GRAssignment04.js
 Assignment04

 Revision History
 Gonzalo Ramos Zúñiga, 2017.03.29: Created
 */

function btnAdd_click() {
    $("#frmAdd").validate({
        rules: {
            txtSeller: {
                required: true
            },
            txtAddress: {
                required: true
            },
            txtCity: {
                required: true
            },
            txtPhone: {
                required: true,
                checkPhone: true
            },
            txtEmail: {
                required: true,
                checkEmail: true
            },
            txtMake: {
                required: true
            },
            txtModel: {
                required: true
            },
            txtYear: {
                required: true
            }
        },
        messages: {
            txtSeller: {
                required: "Seller name is required."
            },
            txtAddress: {
                required: "Address is required."
            },
            txtCity: {
                required: "City is required."
            },
            txtPhone: {
                required: "Phone number is required.",
                checkPhone: "Phone number must be in a valid format."
            },
            txtEmail: {
                required: "E-mail address is required.",
                checkEmail: "E-mail must be in a valid format."
            },
            txtMake: {
                required: "Car make is required."
            },
            txtModel: {
                required: "Car model is required."
            },
            txtYear: {
                required: "Car year is required."
            }
        }
    });

    jQuery.validator.addMethod("checkPhone", function (value, element) {
        if (/\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/.test(value)) {
            return true;
        }
        return false;
    }, "Please enter a valid phone number.");

    jQuery.validator.addMethod("checkEmail", function (value, element) {
        if (/^[a-z0-9._%+-]+\@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
            return true;
        }
        return false;
    }, "Please enter a valid e-mail address.");

    if ($("#frmAdd").valid()) {
        Car.Create([$("#txtSeller").val(),
            $("#txtAddress").val(),
            $("#txtCity").val(),
            $("#txtPhone").val(),
            $("#txtEmail").val(),
            $("#txtMake").val(),
            $("#txtModel").val(),
            $("#txtYear").val()], listCar);

        function listCar(tx, records) {
            localStorage.setItem("id", records.insertId);
            $(location).prop("href", "show.html");
        }
    }
}

function pageIndex_show() {
    Car.SelectAll(listCars);
    function listCars(tx, records) {
        var html = "<table class='table'><thead><tr><th>Seller</th><th>Address</th><th>City</th><th>Phone</th>" +
            "<th>E-mail</th><th>Make</th><th>Model</th><th>Year</th><th></th></tr></thead><tbody>";
        for (var i = 0; i < records.rows.length; i++) {
            html += "<tr><td>" + records.rows[i]["seller"] + "</td><td>" + records.rows[i]["address"] + "</td><td>" +
                records.rows[i]["city"] + "</td><td>" + records.rows[i]["phone"] + "</td><td>" +
                records.rows[i]["email"] + "</td><td>" + records.rows[i]["make"] + "</td><td>" +
                records.rows[i]["model"] + "</td><td>" + records.rows[i]["year"] + "</td><td>" +
                "<a href='http://www.jdpower.com/cars/" + records.rows[i]["make"] + "/" + records.rows[i]["model"] +
                "/" + records.rows[i]["year"] + "'>More...</a></td></tr>";
        }
        html += "</tbody></table>";
        $("#tblShowAll").html(html);
    }
}

function pageShow_show() {
    Car.Select([localStorage.getItem("id")], listCar);
    function listCar(tx, records) {
        $("#ddSeller").html(records.rows[0]["seller"]);
        $("#ddAddress").html(records.rows[0]["address"]);
        $("#ddCity").html(records.rows[0]["city"]);
        $("#ddPhone").html(records.rows[0]["phone"]);
        $("#ddEmail").html(records.rows[0]["email"]);
        $("#ddMake").html(records.rows[0]["make"]);
        $("#ddModel").html(records.rows[0]["model"]);
        $("#ddYear").html(records.rows[0]["year"]);
        $("#ddLink").html("<a href='http://www.jdpower.com/cars/" + records.rows[0]["make"] + "/" +
            records.rows[0]["model"] + "/" + records.rows[0]["year"] + "'>More...</a>");
    }
}

function btnSearch_click() {
    Car.Search([$("#txtSearch").val(), $("#txtSearch").val(), $("#txtSearch").val()], listCars);
    function listCars(tx, records) {
        if (records.rows.length > 0) {
            var html = "<div class='table-responsive'><table class='table'><thead><tr><th>Seller</th><th>Address</th>" +
                "<th>City</th><th>Phone</th>" +
                "<th>E-mail</th><th>Make</th><th>Model</th><th>Year</th><th></th></tr></thead><tbody>";
            for (var i = 0; i < records.rows.length; i++) {
                html += "<tr><td>" + records.rows[i]["seller"] + "</td><td>" + records.rows[i]["address"] + "</td>" +
                    "<td>" + records.rows[i]["city"] + "</td><td>" + records.rows[i]["phone"] + "</td><td>" +
                    records.rows[i]["email"] + "</td><td>" + records.rows[i]["make"] + "</td><td>" +
                    records.rows[i]["model"] + "</td><td>" + records.rows[i]["year"] + "</td><td>" +
                    "<a href='http://www.jdpower.com/cars/" + records.rows[i]["make"] + "/" + records.rows[i]["model"] +
                    "/" + records.rows[i]["year"] + "'>More...</a></td></tr>";
            }
            html += "</tbody></table></div>";
            $("#divSearch").html(html);
        } else {
            $("#divSearch").html("<h4>No results found...</h4>");
        }
    }
}

$(document).ready(function () {
    try {
        DB.CreateDB();
        if (db) {
            DB.CreateTable();
        }
    } catch (err) {
        console.error("Error creating DB.");
    }

    pageIndex_show();

    $("#btnAdd").on("click", btnAdd_click);
    $("#btnSearch").on("click", btnSearch_click);

    pageShow_show();
});

var db;
var DB_SIZE = 2 * 1024 * 1024;

var DB = {
    CreateDB: function () {
        db = openDatabase("Assignment04 Database", "1.0", "Assignment04 DB", DB_SIZE, function () {
            console.info("DB created successfully.");
        });
    },
    CreateTable: function () {
        function txFunction(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS car(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "seller VARCHAR(30) NOT NULL, address VARCHAR(30) NOT NULL, city VARCHAR(30) NOT NULL, " +
                "phone VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL, make VARCHAR(30) NOT NULL, " +
                "model VARCHAR(30) NOT NULL, year VARCHAR(30));",
                [], function () {
                    console.info("Car table created successfully.");
                }, dbError);
        }

        db.transaction(txFunction, dbError, function () {
            console.info("Transaction successful.");
        });
    }
};

var Car = {
    Create: function (options, listCar) {
        function txFunction(tx) {
            tx.executeSql("INSERT INTO car(seller, address, city, phone, email, make, model, year) " +
                "VALUES(?, ?, ?, ?, ?, ?, ?, ?);",
                options, listCar, dbError);
        }

        db.transaction(txFunction, dbError, function () {
            console.info("Transaction successful.");
        });
    },
    Select: function (options, listCar) {
        function txFunction(tx) {
            tx.executeSql("SELECT * FROM car WHERE id = ?;", options, listCar, dbError);
        }

        db.transaction(txFunction, dbError, function () {
            console.info("Transaction successful.");
        });
    },
    SelectAll: function (listCars) {
        function txFunction(tx) {
            tx.executeSql("SELECT * FROM car;", [], listCars, dbError);
        }

        db.transaction(txFunction, dbError, function () {
            console.info("Transaction successful.");
        });
    },
    Search: function (options, listCars) {
        function txFunction(tx) {
            tx.executeSql("SELECT * FROM car WHERE make = ? OR model = ? OR year = ?;",
                options, listCars, dbError);
        }

        db.transaction(txFunction, dbError, function () {
            console.info("Transaction successful.");
        });
    }
};

function dbError(tx, error) {
    console.error("DB Error: " + tx + " " + error.code + " " + error.message);
}