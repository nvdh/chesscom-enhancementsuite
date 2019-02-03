var board = ChessBoard('board');

$(function() {

    $('#loadfen').click(function(){

        var fen = $('#fen').val();
        var board = ChessBoard('board', fen);
        var chess = new Chess();

        //load inverse color to find pins in the opposite color
        chess.loadInverseColor(fen);
        var moves = chess.moves({verbose:true});
        var pinnedPieces = chess.pinned();

        var boardEl = $('#board');

        pinnedPieces.forEach(function(pinnedLocation){
            if (chess.turn() == chess.get(pinnedLocation).color) {
                boardEl.find('.square-' + pinnedLocation).addClass('highlight-black');
            }
        })

    });

    function whotomove(chess) {
        if (chess.turn() === 'b') {
            $('#whotomove').text("Black to move");
        } else {
            $('#whotomove').text("White to move");
        }
    }

});
