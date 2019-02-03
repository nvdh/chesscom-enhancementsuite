
$(function() {

    console.log("Loaded chess.js:");

    $('#viewpuzzles').click(function(){
        chrome.tabs.create({url: 'puzzles.html'});
    });

    $('#help').click(function(){
        chrome.tabs.create({url: 'help.html'});
    });

    $('#analyse').click(function(){
        chrome.tabs.create({url: 'visualisation.html'});
    });

});
