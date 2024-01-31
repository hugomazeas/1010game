$(document).ready(function() {
    let board = new Board(10, 10);
    board.init();
    board.display_board();
    board.new_object();
    board.display_board();
    $(".box").hover(function() {
        let x = parseInt($(this).attr("id")[0]);
        let y = parseInt($(this).attr("id")[1]);
        board.preview_object(x, y);
    }, function() {
        $(".box").removeClass("preview");
        $(".box").removeClass("preview_out_of_bounds");
    });
    $(".box").click(function() {
        let x = parseInt($(this).attr("id")[0]);
        let y = parseInt($(this).attr("id")[1]);
        board.add_current_object(x, y);
        board.update_board();
        board.new_object();
        console.time("is_game_over1");
        board.is_game_over();
        if(board.is_game_over()){
            alert("Game Over");
        }
        console.timeEnd("is_game_over1");
    });
});