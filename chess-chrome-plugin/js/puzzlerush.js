var url = "URL";

$(function(){

    $(".section-row.tactics-settings-icons").append("<button class='iconized' tip='Save puzzle' tip-popup-delay='50' id='savepuzzle' title='Save puzzle'> <i class='icon-chess-book'></i></button>");

    $("div.section-row.control-group.three-buttons > .btn.btn-icon.btn-primary.half-width").removeClass("half-width").addClass("quarter-width")

    $("div.section-row.control-group.three-buttons").append("<button class='btn btn-icon btn-primary quarter-width' title='Next saved tactic' id='nextsavedpuzzle'><i class='icon-arrow-cross'></i></button>");

    $("#nextsavedpuzzle").click(function() {
        chrome.storage.sync.get(['savedpuzzles'], function(result) {

            if (result.savedpuzzles !== undefined){
                for (var i = 0; i < result.savedpuzzles.length - 1; i++){
                    console.log("inspecting savedpuzzles[i]" + result.savedpuzzles[i])
                    if (result.savedpuzzles[i].id == getPuzzleID()){
                        window.location.href = "https://www.chess.com/puzzles/" + result.savedpuzzles[i+1].id + "/practice?autostart=1";
                        return;
                    }
                }
                window.location.href = "https://www.chess.com/puzzles/" + result.savedpuzzles[0].id + "/practice?autostart=1";
                return;
            }

            window.location.href = "https://www.chess.com/puzzles/55905/practice?autostart=1"; //default

        });
    });


    $("#savepuzzle").click(function() {

        var url      = location.href;
        var puzzleId = getPuzzleID();

        var puzzle = {
            id  : puzzleId,
            url : url
        }

        chrome.storage.sync.get(['savedpuzzles'], function(result) {

            var puzzles = [];

            if (result.savedpuzzles !== undefined){
                puzzles = result.savedpuzzles;
            }

            if (isNew(puzzle, puzzles)) {
                puzzles.push(puzzle);
                chrome.storage.sync.set({'savedpuzzles': puzzles}, function() {
                });
            } else {
                console.log("puzzle was already stored");
            }

            function isNew(puzzle, puzzles) {
                for(var i = 0; i < puzzles.length; i++) {
                    if (puzzles[i].id === puzzle.id){
                        return false;
                    }
                }
                return true;
            }

        });

    });

    function getPuzzleID(url) {
        for (var i = 3; i < 7; i++){
            var value = location.href.split('/')[i];
            if (/^\d+$/.test(value)){
                return value;
            }
        }
        return location.href.split('/')[4]
    }

});
