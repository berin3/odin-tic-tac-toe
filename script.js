const gameboard = (function() {
    let fields = new Array(9).fill('_');

    let current = 'X';
    const setField = (index) => {
        if(canSetField(index)) {
            fields[index] = current;
            current = current === 'X' ? 'O' : 'X';
            return current === 'X' ? 'O' : 'X';
        } 
        return false;
    }

    const canSetField = (index) => {
        return fields[index] = '_';
    }

    const reset = () => {
        fields = fields.fill('_');
        current = 'X';
    }

    const checkRow = (start) => {
        if(fields[start] === '_') return false;
        if(fields[start] === fields[start+1] && fields[start] === fields[start+2]) return fields[start];
        return false;
    }

    const checkRows = () => {
        let rows = [0, 3, 6];
        let result = false;
        rows.forEach(row => {
            let winner = checkRow(row);
            if(winner !== false) result = winner;
        });
        return result;
    }

    const checkColumn = (start) => {
        if(fields[start] === '_') return false;
        if(fields[start] === fields[start+3] && fields[start] === fields[start+6]) return fields[start];
        return false;
    }

    const checkColumns = () => {
        let columns = [0, 1, 2];
        let result = false;
        columns.forEach(column => {
            let winner = checkColumn(column);
            if(winner !== false) result = winner;;
        });
        return result;
    }

    const checkDiagonals = (start) => {
        if(fields[0] !== '_') {
            if(fields[0] === fields[4] && fields[0] === fields[8]) return fields[0];
        }

        if(fields[2] !== '_') {
            if(fields[2] === fields[4] && fields[2] === fields[6]) return fields[2];
        }

        return false;
    }

    const checkDraw = () => {
        let draw = true;
        fields.forEach(field => {
            if(field === '_') draw = false;
        });
        return draw;
    }

    const checkWin = () => {
        let winner = checkRows();
        if(winner !== false) return winner;

        winner = checkColumns();
        if(winner !== false) return winner;

        winner = checkDiagonals();
        if(winner !== false) return winner;

        if(checkDraw()) return "Draw";

        return false;
    }

    const printToConsole = () => {
        for(let i = 0; i < 9; i+=3) {
            console.log(fields[i] + " " + fields[i+1] + fields[i+2]);
        }
    }

    return { setField, reset, printToConsole, checkWin };
})();

const displayManager = (function() {
    const displays = document.querySelectorAll(".field");
    const dialog = document.querySelector("dialog");
    const xName = document.querySelector("#X-name");
    const yName = document.querySelector("#Y-name");
    let gamestate = "Play";

    const setField = (index) => {
        if(gamestate !== "Play") return;

        let output = gameboard.setField(index);
        if(output !== false) {
            displays[index].textContent = output;
            output = gameboard.checkWin();
            if(output !== false) handleWin(output);
        }
    }

    const handleWin = (player) => {
        gamestate = "Done";
        dialog.children[0].children[0].textContent = `${player === 'X' ? xName.value : yName.value} ${player === 'Draw' ? "" : " wins!"}`;
        dialog.show();
    }

    const closeDialog = () => {
        dialog.close();
    }

    const reset = () => {
        displays.forEach(display => display.textContent = "");
        gameboard.reset();
        gamestate = "Play";
    }

    return { setField, closeDialog, reset };
})();
