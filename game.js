var game = new Chess();

function onDrop(source, target) { 
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // auto promote to queen
  });

  // illegal move
  if (move === null) return 'snapback';

  updateStatus();
}

function updateStatus() {
  var status = '';

  var moveColor = game.turn() === 'w' ? 'White' : 'Black';

  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  document.getElementById('status').textContent = status;
}

var board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: onDrop
});
