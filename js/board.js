class Board {
    current_object = null;
    score = 0;
    objects = [];
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.board = [[]];
        this.init();
    }
    init() {
        for (let i = 0; i < this.height; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.width; j++) {
                this.board[i][j] = false;
            }
        }
        this.objects.push(new GameObject(2, 3, 0, 0));
        this.objects.push(new GameObject(0, 2, 4, 0));
        this.objects.push(new GameObject(0, 4, 0, 2));
        this.objects.push(new GameObject(0, 2, 4, 0));
        this.objects.push(new GameObject(2, 0, 4, 0));
        this.objects.push(new GameObject(0, 2, 3, 2));
        this.objects.push(new GameObject(0, 0, 0, 5));
    };
    set_current_object(object) {
        this.current_object = object;
    }
    display_board() {
        $(".board_container").empty();
        let y = 0;
        for (let x = 0; x < this.height; x++) {
            for (y = 0; y < this.width; y++) {
                if (this.board[x][y] == false)
                    $(".board_container").append(`<div id='${x.toString() + y.toString()}' class='box'></div>`);
                else
                    $(".board_container").append(`<div id='${x.toString() + y.toString()}' class='box busy'></div>`);
            }
        }
    }
    update_board() {
        this.check_for_full_lines();
        let y = 0;
        for (let x = 0; x < this.height; x++) {
            for (y = 0; y < this.width; y++) {
                if (this.board[x][y] == false)
                    $("#" + x.toString() + y.toString()).removeClass("busy");
                else
                    $("#" + x.toString() + y.toString()).addClass("busy");
            }
        }
    }
    check_for_full_lines() {
        let number_of_full_rows = this.check_for_full_rows();
        let number_of_full_columns = this.check_for_full_columns();
        let score = (number_of_full_columns + number_of_full_rows) * 10;
        this.score += score;
        $(".score").text(this.score.toString());
    }
    check_for_full_rows() {
        let number_of_full_rows = 0;
        for (let y = 0; y < this.width; y++) {
            let full = true;
            for (let x = 0; x < this.height; x++) {
                if (this.board[x][y] == false) {
                    full = false;
                }
            }
            if (full) {
                this.remove_column(y);
                number_of_full_rows++;
            }
        }
        return number_of_full_rows;
    }
    check_for_full_columns() {
        let number_of_full_rows = 0;
        for (let x = 0; x < this.height; x++) {
            let full = true;
            for (let y = 0; y < this.width; y++) {
                if (this.board[x][y] == false) {
                    full = false;
                }
            }
            if (full) {
                this.remove_row(x);
                number_of_full_rows++;
            }
        }
        return number_of_full_rows;
    }
    remove_column(y) {
        for (let x = 0; x < this.height; x++) {
            this.board[x][y] = false;
        }
    }
    remove_row(x) {
        for (let y = 0; y < this.width; y++) {
            this.board[x][y] = false;
        }
    }
    add_current_object(x, y) {
        if (this.is_object_placable(x, y, [])) {
            for (let i = 0; i < this.current_object.up; i++) {
                this.board[x - i][y] = true;
            }
            for (let i = 0; i < this.current_object.down; i++) {
                this.board[x + i][y] = true;
            }
            for (let i = 0; i < this.current_object.left; i++) {
                this.board[x][y - i] = true;
            }
            for (let i = 0; i < this.current_object.right; i++) {
                this.board[x][y + i] = true;
            }
        }
    }
    preview_object(x, y) {
        let coords = [];
        let placable = this.is_object_placable(x, y, coords);
        coords.forEach(element => {
            $("#" + element[0].toString() + element[1].toString()).addClass(!placable ? "preview_out_of_bounds" : "preview");
        });
        return placable;
    }
    is_object_placable(x, y, coords) {
        let placable = true;
        for (let i = 0; i < this.current_object.up; i++) {
            if (!this.is_box_free(x - i, y)) {
                placable = false;
            }
            coords.push([x - i, y]);
        }
        for (let i = 0; i < this.current_object.down; i++) {
            if (!this.is_box_free(x + i, y)) {
                placable = false;
            }
            coords.push([x + i, y]);
        }
        for (let i = 0; i < this.current_object.left; i++) {
            if (!this.is_box_free(x, y - i)) {
                placable = false;
            }
            coords.push([x, y - i]);
        }
        for (let i = 0; i < this.current_object.right; i++) {
            if (!this.is_box_free(x, y + i)) {
                placable = false;
            }
            coords.push([x, y + i]);
        }
        return placable;
    }
    is_box_free(x, y) {
        if (x >= 0 && y >= 0 && x < this.height && y < this.width) {
            return !this.board[x][y];
        } else {
            return false;
        }
    }
    new_object() {
        let random_object = this.objects[Math.floor(Math.random() * this.objects.length)];
        this.set_current_object(random_object);
    }
    is_game_over(){
        let game_over = true;
        for (let x = 0; x < this.height; x++) {
            for (let y = 0; y < this.width; y++) {
                if (this.is_object_placable(x, y, [])){
                    return false;
                }
            }
        }
        return game_over;
    }
}