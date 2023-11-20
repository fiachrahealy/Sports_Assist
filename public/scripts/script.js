var manager = false;
var passSwitch = 0;

(function($) {
    "use strict";
  
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 48)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    $('body').scrollspy({
        target: '#mainNav',
        offset: 54
    });

})(jQuery);

$(document).ready(function() {
    $("#oneDiv").click(function() {
        $(location).attr('href', '/login');
    });
});

$(document).ready(function() {
    $("#twoDiv").click(function() {
        $(location).attr('href', '/signup')
    });
});

$(document).ready(function() {
    $("#oneDivTrain").click(function() {
        $(location).attr('href', '/dashboard/training/team');
    });
});

$(document).ready(function() {
    $("#twoDivTrain").click(function() {
        $(location).attr('href', '/dashboard/training/individual')
    });
});

function handleClick() {
    $.ajax({
        url: 'addContact',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "firstName": $('#firstname').val(),
            "lastName": $('#lastname').val(),
            "position": $('#position').val(),
            "email": $('#email').val(),
            "phNum": $('#phNum').val(),
            "subject": $('#subject').val(),
            "message": $('#message').val()
        }),
        processData: false,
        success: function(data, textStatus, jQxhr) {
            alert("Success!");
        },
        error: function(jqXhr, textStatus, errorThrown) {
            throw errorThrown;
        }
    });
}

$(document).ready(function() {
    $('#jerseyType, #col_1, #col_2').on('change', function() {
        switch (parseInt($("#jerseyType").val())) {
            case 1:
                $("#col_2").show();
                $("#preJer").css("background", "repeating-linear-gradient(to right," + $("#col_1").val() + "," + $("#col_1").val() + " " + (10) + "px," + $("#col_2").val() + " " + (10) + "px," + $("#col_2").val() + " " + (20) + "px)");
                break;
            case 2:
                $("#col_2").show();
                $("#preJer").css("background", "linear-gradient(to bottom right, " + $("#col_1").val() + ", " + $("#col_2").val() + ")");
                break;
            case 3:
                $("#col_2").show();
                $("#preJer").css("background", "linear-gradient(-90deg," + $("#col_1").val() + ", " + $("#col_2").val() + ")");
                break;
            case 4:
                $("#col_2").hide();
                $("#preJer").css("background", $("#col_1").val());
                break;
            case 5:
                $("#col_2").show();
                $("#preJer").css("background", "repeating-linear-gradient(to bottom," + $("#col_1").val() + "," + $("#col_1").val() + " " + (10) + "px," + $("#col_2").val() + " " + (10) + "px," + $("#col_2").val() + " " + (20) + "px)");
                break;
            case 6:
                $("#col_2").show();
                $("#preJer").css("background", " linear-gradient(to bottom, " + $("#col_1").val() + " 0%, " + $("#col_1").val() + " 50%, " + $("#col_2").val() + " 50%, " + $("#col_2").val() + " 100%)");
                break;
            case 7:
                $("#col_2").show();
                $("#preJer").css("background", "linear-gradient(to right, " + $("#col_1").val() + " 0%, " + $("#col_1").val() + " 50%, " + $("#col_2").val() + " 50%, " + $("#col_2").val() + " 100%)");
                break;
            case 8:
                $("#col_2").show();
                $("#preJer").css("background", "linear-gradient(to bottom, " + $("#col_1").val() + " 0%, " + $("#col_1").val() + " 45%, " + $("#col_2").val() + " 45%, " + $("#col_2").val() + " 60%, " + $("#col_1").val() + " 60%, " + $("#col_1").val() + " 100%)");
                break;
            case 9:
                $("#col_2").show();
                $("#preJer").css("background", "linear-gradient(to right, " + $("#col_1").val() + " 0%, " + $("#col_1").val() + " 27%, " + $("#col_2").val() + " 27%, " + $("#col_2").val() + " 73%, " + $("#col_1").val() + " 73%, " + $("#col_1").val() + " 100%)");
                break;
            default:
                $("#col_2").show();
                $("#preJer").css("background", "black");
        }
    });
});

$(document).ready(function() {

    if ($.cookie("team") != undefined) {

        let teamx = JSON.parse($.cookie("team").slice(2));
        const col1 = teamx.col1;
        const col2 = teamx.col2;
        const jerseyT = teamx.jerseyType;
        switch (parseInt(jerseyT)) {
            case 1:
                $("#iconJer").css("background", "repeating-linear-gradient(to right," + col1 + "," + col1 + " " + (5) + "px," + col2 + " " + (5) + "px," + col2 + " " + (10) + "px)");
                break;
            case 2:
                $("#iconJer").css("background", "linear-gradient(to bottom right, " + col1 + ", " + col2 + ")");
                break;
            case 3:
                $("#iconJer").css("background", "linear-gradient(-90deg," + col1 + ", " + col2 + ")");
                break;
            case 4:
                $("#iconJer").css("background", col1);
                break;
            case 5:
                $("#iconJer").css("background", "repeating-linear-gradient(to bottom," + col1 + "," + col1 + " " + (5) + "px," + col2 + " " + (5) + "px," + col2 + " " + (10) + "px)");
                break;
            case 6:
                $("#iconJer").css("background", " linear-gradient(to bottom, " + col1 + " 0%, " + col1 + " 50%, " + col2 + " 50%, " + col2 + " 100%)");
                break;
            case 7:
                $("#iconJer").css("background", "linear-gradient(to right, " + col1 + " 0%, " + col1 + " 50%, " + col2 + " 50%, " + col2 + " 100%)");
                break;
            case 8:
                $("#iconJer").css("background", "linear-gradient(to bottom, " + col1 + " 0%, " + col1 + " 45%, " + col2 + " 45%, " + col2 + " 60%, " + col1 + " 60%, " + col1 + " 100%)");
                break;
            case 9:
                $("#iconJer").css("background", "linear-gradient(to right, " + col1 + " 0%, " + col1 + " 27%, " + col2 + " 27%, " + col2 + " 73%, " + col1 + " 73%, " + col1 + " 100%)");
                break;
            default:
                $("#iconJer").css("background", "black");
        }
    }
});

$(document).ready(function() {
    $("#teamDiv2").click(function() {
        if ($.cookie("teamArr") != undefined) {
            let teamArray = JSON.parse($.cookie("teamArr").slice(2))[(parseInt($("#teamDiv2").find("img").attr("id").slice(1)) - 1)]._id;
            let tok = document.getElementsByTagName('meta').thecsrf.getAttribute('content');
            let str = "<form method='POST' action='/dashboard'><input type= 'text' name='teamId' value = '" + teamArray + "'/>" + "<input type='hidden' name='_csrf' value='" + tok + "'/></form>";
            $(str).appendTo("body").submit();
        }
    });
});

$(document).ready(function() {
    $("span").on("click", function() {
        if ($.cookie("teamArr") != undefined) {
            let teamArray = JSON.parse($.cookie("teamArr").slice(2))[parseInt(($(this).find("img").attr("id").slice(1))) - 1]._id;
            let tok = document.getElementsByTagName('meta').thecsrf.getAttribute('content');
            let str = "<form method='POST' action='/dashboard'><input type= 'text' name='teamId' value = '" + teamArray + "'/>" + "<input type='hidden' name='_csrf' value='" + tok + "'/></form>";
            $(str).appendTo("body").submit();
        }
    });
});

$(document).ready(function() {

    if ($.cookie("teamArr") != undefined) {

        let res = JSON.parse($.cookie("teamArr").slice(2));
        let numJerseys = res.length;

        if (numJerseys <= 12) {
            $("#slide3").hide();
            $("#slide3").removeClass();
        }
        if (numJerseys <= 6) {

            $("#slide2").hide();
            $("#slide2").removeClass();
            $("#prev").hide();
            $("#next").hide();

        }

        for (let j = 1; j < 19; j++) {
            if (j > numJerseys) {

                $("#j" + j + "").hide();
                $("#o" + j + "").hide();
            }
        }
        for (let i = 0; i < numJerseys; i++) {

            let col1 = res[i].col1;
            let col2 = res[i].col2;
            let k = i + 1;
            $("#j" + k + "txt").html(res[i].teamName);
            switch (parseInt(res[i].jerseyType)) {
                case 1:
                    $("#j" + (k) + "").css("background", "repeating-linear-gradient(to right," + col1 + "," + col1 + " " + (10) + "px," + col2 + " " + (10) + "px," + col2 + " " + (20) + "px)");
                    break;
                case 2:
                    $("#j" + (k) + "").css("background", "linear-gradient(to bottom right, " + col1 + ", " + col2 + ")");
                    break;
                case 3:
                    $("#j" + (k) + "").css("background", "linear-gradient(-90deg," + col1 + ", " + col2 + ")");
                    break;
                case 4:
                    $("#j" + (k) + "").css("background", col1);
                    break;
                case 5:
                    $("#j" + (k) + "").css("background", "repeating-linear-gradient(to bottom," + col1 + "," + col1 + " " + (10) + "px," + col2 + " " + (10) + "px," + col2 + " " + (20) + "px)");
                    break;
                case 6:
                    $("#j" + (k) + "").css("background", " linear-gradient(to bottom, " + col1 + " 0%, " + col1 + " 50%, " + col2 + " 50%, " + col2 + " 100%)");
                    break;
                case 7:
                    $("#j" + (k) + "").css("background", "linear-gradient(to right, " + col1 + " 0%, " + col1 + " 50%, " + col2 + " 50%, " + col2 + " 100%)");
                    break;
                case 8:
                    $("#j" + (k) + "").css("background", "linear-gradient(to bottom, " + col1 + " 0%, " + col1 + " 45%, " + col2 + " 45%, " + col2 + " 60%, " + col1 + " 60%, " + col1 + " 100%)");
                    break;
                case 9:
                    $("#j" + (k) + "").css("background", "linear-gradient(to right, " + col1 + " 0%, " + col1 + " 27%, " + col2 + " 27%, " + col2 + " 73%, " + col1 + " 73%, " + col1 + " 100%)");
                    break;
                default:
                    $("#j" + (k) + "").css("background", col1);
            }
        }
    }
});

$(document).ready(function() {
    $("#passLab").click(function() {
        if (passSwitch == 0) {
            $("#pass1").show();
            $("#pass2").show();
            passSwitch = 1;
            $("#passLab").html("Change Password <i class=\"fas fa-caret-up\"></i>");
        } else {
            $("#pass1").hide();
            $("#pass2").hide();
            passSwitch = 0;
            $("#passLab").html("Change Password <i class=\"fas fa-caret-down\"></i>");
        }
    });
});

function setUpVideo(vidsAvailable) {

    if (vidsAvailable) {

        $("#vidTd").show();
        $("#vidListTd").show();
        $("#commentsTd").show();
        $("#infoTd").show();

    } else {

        $("#noVidMessage").show();

    }


}

function validateYT() {

    if ($("#vidName").val().length < 1) {

        alert("You must enter a Video Title");
        return;

    }

    if ($("#vidCode").val().length != 11) {

        alert("Not a valid YouTube Video ID");
        return;

    }

    var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_"

    for (var i = 0; i < $("#vidCode").val().length; i++) {

        for (var j = 0; j < alphabet.length; j++) {

            if ($("#vidCode").val().charAt(i) == alphabet.charAt(j)) {

                break;

            } else if (j == (alphabet.length - 1)) {

                alert("Not a valid YouTube Video ID");
                return;

            }
        }

    }

    $("#vidForm").submit();

}

$(document).ready(function() {
    $('#proType, #procol_1, #procol_2').on('change', function() {
        switch (parseInt($("#proType").val())) {
            case 1:
                $("#prePro1").attr("src", "../images/male1.png");
                $("#prePro2").attr("src", "../images/male2.png");
                $("#prePro1").css("background", "" + $("#procol_1").val() + "");
                $("#prePro2").css("background", "" + $("#procol_2").val() + "");
                break;
            case 2:
                $("#prePro1").attr("src", "../images/female1.png");
                $("#prePro2").attr("src", "../images/female2.png");
                $("#prePro1").css("background", "" + $("#procol_1").val() + "");
                $("#prePro2").css("background", "" + $("#procol_2").val() + "");
                break;
            default:
                $("#prePro1").css("background", "black");
                $("#prePro2").css("background", "white");
        }
    });
});

$(document).ready(function() {
    $("#vidCode1").keyup(function() {

        if ($("#vidCode1").val().length != 11) {

            $("#vidCode1").css("color", "red");


        } else {

            $("#vidCode1").css("color", "green");

        }




    });
});

function setAvatar(col1, col2, proT) {

    switch (parseInt(proT)) {
        case 1:
            $("#iconPro1").attr("src", "../images/male1.png");
            $("#iconPro2").attr("src", "../images/male2.png");
            $("#iconPro1").css("background", "" + col1 + "");
            $("#iconPro2").css("background", "" + col2 + "");
            break;
        case 2:
            $("#iconPro1").attr("src", "../images/female1.png");
            $("#iconPro2").attr("src", "../images/female2.png");
            $("#iconPro1").css("background", "" + col1 + "");
            $("#iconPro2").css("background", "" + col2 + "");
            break;
        default:
            $("#iconPro1").attr("src", "../images/male1.png");
            $("#iconPro2").attr("src", "../images/male2.png");
            $("#iconPro1").css("background", "white");
            $("#iconPro2").css("background", "black");

    }
}

function setSettingsJersey(col1, col2, jerseyT) {

    $("#jerseyType").val(jerseyT);

    switch (parseInt(jerseyT)) {
        case 1:
            $("#preJer").css("background", "repeating-linear-gradient(to right," + col1 + "," + col1 + " " + (10) + "px," + col2 + " " + (10) + "px," + col2 + " " + (20) + "px)");
            break;
        case 2:
            $("#preJer").css("background", "linear-gradient(to bottom right, " + col1 + ", " + col2 + ")");
            break;
        case 3:
            $("#preJer").css("background", "linear-gradient(-90deg," + col1 + ", " + col2 + ")");
            break;
        case 4:
            $("#preJer").css("background", col1);
            break;
        case 5:
            $("#preJer").css("background", "repeating-linear-gradient(to bottom," + col1 + "," + col1 + " " + (10) + "px," + col2 + " " + (10) + "px," + col2 + " " + (20) + "px)");
            break;
        case 6:
            $("#preJer").css("background", " linear-gradient(to bottom, " + col1 + " 0%, " + col1 + " 50%, " + col2 + " 50%, " + col2 + " 100%)");
            break;
        case 7:
            $("#preJer").css("background", "linear-gradient(to right, " + col1 + " 0%, " + col1 + " 50%, " + col2 + " 50%, " + col2 + " 100%)");
            break;
        case 8:
            $("#preJer").css("background", "linear-gradient(to bottom, " + col1 + " 0%, " + col1 + " 45%, " + col2 + " 45%, " + col2 + " 60%, " + col1 + " 60%, " + col1 + " 100%)");
            break;
        case 9:
            $("#preJer").css("background", "linear-gradient(to right, " + col1 + " 0%, " + col1 + " 27%, " + col2 + " 27%, " + col2 + " 73%, " + col1 + " 73%, " + col1 + " 100%)");
            break;
        default:
            $("#preJer").css("background", "black");
    }
}


function setAvatarSettings(col1, col2, type) {

    $("#proType").val(type);


    switch (parseInt(type)) {
        case 1:
            $("#prePro1").attr("src", "../images/male1.png");
            $("#prePro2").attr("src", "../images/male2.png");
            $("#prePro1").css("background", "" + col1 + "");
            $("#prePro2").css("background", "" + col2 + "");
            break;
        case 2:
            $("#prePro1").attr("src", "../images/female1.png");
            $("#prePro2").attr("src", "../images/female2.png");
            $("#prePro1").css("background", "" + col1 + "");
            $("#prePro2").css("background", "" + col2 + "");
            break;
        default:
            $("#prePro1").attr("src", "../images/male1.png");
            $("#prePro2").attr("src", "../images/male2.png");
            $("#prePro1").css("background", "white");
            $("#prePro2").css("background", "black");

    }
}

function linkVideo(id) {

    var url = "/dashboard/video/" + id + "";

    $(location).attr('href', url);

}

$(document).ready(function() {
    $("#notLink").click(function() {
        $("#form").submit();
    });
});

$(document).ready(function() {
    $("#appendexercise").click(function() {
        $('#exercises tr:last').after('<tr><td><input id="exerciseName' + exerciseCount + '" type="text" name="name" placeholder="Exercise" value=""></td><td><input id="exerciseSets' + exerciseCount + '"type="text" name="sets" placeholder="Sets" value=""></td><td><input id="exerciseReps' + exerciseCount + '" type="text"  name="reps" placeholder="Reps" value=""><td><input id="exerciseWeight' + exerciseCount + '" type="text"  name="weight" placeholder="Weight" value=""></td></td><tr>');

        exerciseCount++;
    });
});

$(document).ready(function() {

    $("#submitworkout").click(function() {
        for (i = 1; i < exerciseCount; i++) {

            let exerciseName = $("#exerciseName" + i).val();
            let exerciseSets = $("#exerciseSets" + i).val();
            let exerciseReps = $("#exerciseReps" + i).val();
            let exerciseWeight = $("#exerciseWeight" + i).val();
            let tempObject = {
                name: exerciseName,
                sets: exerciseSets,
                reps: exerciseReps,
                weight: exerciseWeight
            };

            tempArray.push(tempObject);

        }

        arrayProtoType = JSON.stringify(tempArray);

        $("#reqcontent").val(arrayProtoType);

        $("#exerciseForm").submit();
    });
});

function updateDots(t) {
    for (let e = 0; e < dots.length; e++)
        if (dots[e].id == t.id)
            for (let a in t) dots[e][a] = t[a]
}


$(document).ready(() => {
    const [t, e] = [99, 0], [a, o, d, n] = [525, 0, 680, 0], [l, i, s, r] = [1e3, 526, 680, 0];
    const protoCSRF = $("#cyberDiv").val();
    const protoTeamId = $("#teamDiv").val();

    $("#savebutton").on("click", () => {
            let t = {
                dots: JSON.stringify(dots),
                _csrf: protoCSRF
            };
            $.ajax({
                url: "",
                type: "PUT",
                data: t
            }), alert("Formation Saved!"), modified = !1
            location.reload();
        }),

        $("#savebuttonformation").on("click", () => {
            let t = {
                dots: JSON.stringify(dots),
                _csrf: protoCSRF,
                team_id: protoTeamId
            };
            $.ajax({
                url: "",
                type: "PUT",
                data: t
            }), alert("Formation Saved to Team Board: Further Changes will not be added to team Board"), modified = !1
        }),


        $("#copybutton").on("click", () => {
            let t = {
                    dots: JSON.stringify(dots),
                    _csrf: protoCSRF
                },
                askForName = prompt("Enter a name for your new tactics Board", $("#formName").text());

            null != askForName && (t.name = askForName, $.post("/copyFormation", t, () => {}))
            alert("Successful Copying of the tactics Board: Return to your profile in order to start working ")
        }),


        $("#deletebutton").on("click", () => {
            $.ajax({
                url: "",
                data: {
                    _csrf: protoCSRF
                },
                type: "DELETE",
                success: t => {
                    window.location.replace("/dashboard/formations")
                }
            })
        }),


        $("#addPlayer1").on("click", () => {
            let l = Math.floor(Math.random() * (t - e + 1)) + e,
                i = Math.floor(Math.random() * (a - o + 1)) + o,
                s = Math.floor(Math.random() * (d - n + 1)) + n,
                r = "",
                c = Date.now(),
                h = "Assign Position";
            dots.push({
                id: c,
                x: i,
                y: s,
                player: l,
                name: h,
                team: "Team 1"
            }), addDot()
        }),




        $("#addPlayer2").on("click", () => {
            let a = Math.floor(Math.random() * (t - e + 1)) + e,
                o = Math.floor(Math.random() * (l - i + 1)) + i,
                d = Math.floor(Math.random() * (s - r + 1)) + r,
                n = "",
                c = Date.now(),
                h = "Assign Position";
            dots.push({
                id: c,
                x: o,
                y: d,
                player: a,
                name: h,
                team: "Team 2"
            }), addDot()
        })

});

$(document).ready(function() {
    let i = 0
    let tempArray = [];
    let arrayProtoType;
    $("#editWorkoutInterface").hide();
    $("#pastWorkoutsInterface").hide();

    $("#createWorkoutButton").click(function() {
        $("#controls").hide();
        $("#editWorkoutInterface").show();
    });



    $("#prevWorkout").click(function() {
        $("#controls").hide();
        $("#pastWorkoutsInterface").show();

    });

    $("#appendexercise").click(function() {
        let exerciseName = $("#exerciseName").val();
        let exerciseSets = $("#exerciseSets").val();
        let exerciseReps = $("#exerciseReps").val();
        let exerciseWeight = $("#exerciseWeight").val();
        let tempObject = {
            name: exerciseName,
            sets: exerciseSets,
            reps: exerciseReps,
            weight: exerciseWeight
        };
        tempArray.push(tempObject);
        arrayProtoType = JSON.stringify(tempArray);

        let str = "<tr><td>" + exerciseName + "</td>" + "<td>" + exerciseSets + "</td>" + "<td>" + exerciseReps + "</td>" + "<td>" + exerciseWeight + "</td></tr>";
        i++;
        $("#exerciseTableBody").append(str);
    });



    $("#postExercise").click(function() {
        let csrf = $("#csrfTokendiv").val();
        let str = "<form method='POST' action='addexercise'>" + "<input type='text' value='" + csrf + "' name='_csrf'>" + "<input type='text'  name='reqcontent' + value='" + arrayProtoType + "'></form>";
        $(str).appendTo("body").submit();
    });


});


var goal, isMetric;
var age, height, weight, calories, protein, carbohydrates, fats;


$(document).ready(function() {
    $("#systemMeasure").change(function() {
        isMetric = $("#systemMeasure").val();
        if (isMetric == 1) {
            $("#metricHeight").replaceWith("<input class='form-control-lg' id='feet' placeholder='Height(feet)'><input id='inches'class='form-control-lg' placeholder='(inches)'>")
            $("#metricWeight").replaceWith("<input id='imperialWeight' class='form-control-lg' placeholder='Weight (lbs)'>")
            return isMetric;
        } else if (isMetric == 0) {
            $("#feet").replaceWith("<input id='metricHeight' class='form-control-lg' placeholder='Height (cm)'>");
            $("#inches").remove();
            $("#imperialWeight").replaceWith("<input id='metricWeight' class='form-control-lg' placeholder='Weight (kg)'>")
            return isMetric;
        }

    });

});
$(document).ready(function() {
    $("#nutritionSubmitButton").click(function() {
        isMetric = $('#systemMeasure').val();

        if (isMetric == 0) {
            age = $("#age").text();
            height = $("#metricHeight").val();
            weight = $("#metricWeight").val();

        } else if (isMetric == 1) {
            age = $("#age").text();
            height = ($("#feet").val() * 30.48) + ($("#inches").val() * 2.54);
            weight = ($("#imperialWeight").val() / 2.2046);

        }
        calories = Math.ceil((10 * weight + 6.25 * height - 5 * age + 5) * 1.55);
        protein = Math.ceil(weight * 1.6);
        fats = Math.ceil((calories * 0.3) / 9);
        carbohydrates = Math.ceil((calories - ((fats * 9) + (protein * 4))) / 4);
        let tok = $("#token").val();
        var str = '<form method="POST" action="/dashboard/nutrition/" id="nutritionFormSubmit" >      <input id="metricHeight" name="height" value="' + height + '" placeholder="Height (cm)"><br>      <input id="metricWeight" placeholder="Weight (kg)" name="weight" value="' + weight + '"><br>      <input type="hidden" name="_csrf" value="' + tok + '">    </form>'
        $("#nutritionSubmitDiv").replaceWith(str);
        $("#nutritionFormSubmit").submit();


        $("#caloriesValue").html(calories);
        $("#macroPro").html(protein + "g");
        $("#macroFat").html(fats + "g");
        $("#macroCarb").html(carbohydrates + "g");
    });

});
$(document).ready(function() {
    age = $("#age").text();
    weight = $("#weight").text();
    height = $("#height").text();
    calories = Math.ceil((10 * weight + 6.25 * height - 5 * age + 5) * 1.55);
    protein = Math.ceil(weight * 1.6);
    fats = Math.ceil((calories * 0.3) / 9);
    carbohydrates = Math.ceil((calories - ((fats * 9) + (protein * 4))) / 4);
    $("#caloriesValue").html(calories);
    $("#macroPro").html(protein + "g");
    $("#macroFat").html(fats + "g");
    $("#macroCarb").html(carbohydrates + "g");




    $("#weightGoal").change(function() {
        calories = Math.ceil((10 * weight + 6.25 * height - 5 * age + 5) * 1.55);
        if ($("weightGoal").val() == 0) {
            calories = calories;
        }
        if ($("#weightGoal").val() == 1) {
            calories = calories - 500;
        }
        if ($("#weightGoal").val() == 2) {
            calories = calories + 500;
        }
        protein = Math.ceil(weight * 1.6);
        fats = Math.ceil((calories * 0.3) / 9);
        carbohydrates = Math.ceil((calories - ((fats * 9) + (protein * 4))) / 4);
        $("#caloriesValue").html(calories);
        $("#macroPro").html(protein + "g");
        $("#macroFat").html(fats + "g");
        $("#macroCarb").html(carbohydrates + "g");
    });
});




function dottype(d) {
    d.x = +d.x;
    d.y = +d.y;
    return d;
}


function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this)

}

function dragged(d) {
    d3.select(this)
        .attr("cx", d.x = d3.event.x)
        .attr("cy", d.y = d3.event.y)
        .style("opacity", .5);
}

function dragended(d) {
    updateDots(d);
    d3.select(this)
        .style("opacity", 1);
    modified = true;
}

function addDot() {
    dot = tacticsModel.append("g")
        .attr("class", "dot")
        .selectAll("circle")
        .data(dots)
        .enter().append("circle")
        .attr("r", d => size(d.team))
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .style("fill", d => color(d.team))
        .style("stroke", d => color1(d.team))
        .style("stroke-width", 3)
        .call(drag);
    modified = true;
}

$(document).ready(function() {
    $(".optionTraining").click(function() {
        let selection = $(this).attr("id");
        let csrf = $("#csrfTokendiv").val();
        let decision;
        switch (selection) {

            case "personal":
                decision = 1;
                break;

            case "public":
                decision = 2;
                break;

            case "teamOnly":
                decision = 3;
                break;
        }

        let str = "<form method='POST' action='/dashboard/training/individual/sessions'>" + "<input type='text' value='" + csrf + "' name='_csrf'>" + "<input type='text'  name='decision' + value='" + decision + "'></form>";
        $(str).appendTo("body").submit();
    });
});

$(document).ready(function() {


    $(".saveChangeDiv").on("click", function() {
        let protoPlayer = $(this).attr("id").slice(1);
        let tok = $("#csrfTokenProtocol").val();
        let goalsId = "#G" + protoPlayer;
        let momId = "#M" + protoPlayer;
        let cardId = "#C" + protoPlayer;
        let cleanSheetId = "#X" + protoPlayer;
        let assistId = "#A" + protoPlayer;
        protoPlayer = protoPlayer.slice(1);
        let goals = ($(goalsId)).html();
        let mom = ($(momId)).html();
        let cards = ($(cardId)).html();
        let cleanSheet = ($(cleanSheetId)).html();
        let assist = ($(assistId)).html();
        const str = `${"<form method='POST' action='/dashboard/squad'> " + "<input type='text' name='player' value='"}${protoPlayer}'>` + `<input type= 'text' name='goals' value ='${goals}'>` + `<input type='text' name='mom' value='${mom}'><input type='text' name='cards' value ='${cards}'>` + `<input type='text' name='cleanSheet' value='${cleanSheet}'><input type='text' name ='assist' value='${assist}'>` + `<input type='hidden' name='_csrf' value='${tok}'></form>`;
        $(str).appendTo("body").submit();
    });

    $("a").on("click", function() {
        let fieldToChange = ($(this).attr("name"));
        let userSelected = ($(this).attr("id"));
        let original;
        switch (fieldToChange) {

            case "GoalUp":

                original = parseInt(($("#G-" + userSelected)).text());
                original++
                ($("#G-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;

            case "GoalDown":
                original = parseInt(($("#G-" + userSelected)).text());
                original--;
                ($("#G-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;

            case "MomUp":
                original = parseInt(($("#M-" + userSelected)).text());
                original++
                ($("#M-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;


            case "MomDown":
                original = parseInt(($("#M-" + userSelected)).text());
                original--;
                ($("#M-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;



            case "CardUp":
                original = parseInt(($("#C-" + userSelected)).text());
                original++;
                ($("#C-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;



            case "CardDown":
                original = parseInt(($("#C-" + userSelected)).text());
                original--;
                ($("#C-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;

            case "CleanSheetUp":
                original = parseInt(($("#X-" + userSelected)).text());
                original++;
                ($("#X-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;

            case "CleanSheetDown":
                original = parseInt(($("#X-" + userSelected)).text());
                original--;
                ($("#X-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;


            case "AssistUp":
                original = parseInt(($("#A-" + userSelected)).text());
                original++;
                ($("#A-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;


            case "AssistDown":
                original = parseInt(($("#A-" + userSelected)).text());
                original--;
                ($("#A-" + userSelected)).text(original);
                showSaveButton(userSelected);
                break;

            default:
                break;
        }
    });

    function showSaveButton(protoUserID) {
        const protoDiv = "#Z-" + protoUserID;
        ($(protoDiv).css("display", "inline"));
    }

});