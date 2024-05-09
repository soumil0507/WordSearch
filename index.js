class FindWord {
    find(board, word) {
        const n = board.length;
        const m = board[0].length;
        
        let found = false;

        const backtrack = (i, j, k) => {
            // Base case 1
            if (k === word.length) {
                return true;
            }

            // Check if out of bounds
            if (i < 0 || i >= n || j < 0 || j >= m || board[i][j] !== word[k]) {
                return false;
            }
            
            // Mark the current cell
            var temp = board[i][j];
            board[i][j] = '';

            if (backtrack(i, j - 1, k + 1) ||
                backtrack(i - 1, j, k + 1) ||
                backtrack(i, j + 1, k + 1) ||
                backtrack(i + 1, j, k + 1)) {
                return true;
            }

            // Backtracking and marking the current cell not visited
            board[i][j] = temp;

            return false;
        };

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (backtrack(i, j, 0)) {
                    found = true;
                    break;
                }
            }
        }

        return found;
    }
}

var matrix = [];

function generateRandomLetter(){
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length)); // Generates a random letter from 'A' to 'Z'
}

function createMatrix(rows, cols){
    for(var i = 0; i < rows; i++){
        matrix[i] = [];
        for(var j = 0; j < cols; j++){
            matrix[i][j] = generateRandomLetter();
        }
    };
    return matrix;
}

function displayMatrix(matrix) {
    var matrixHTML = '<table border="1">';
    for (var i = 0; i < matrix.length; i++) {
        matrixHTML += '<tr>';
        for (var j = 0; j < matrix[i].length; j++) {
            matrixHTML += '<td>' + matrix[i][j] + '</td>';
        }
        matrixHTML += '</tr>';
    }
    matrixHTML += '</table>';
    document.getElementById('matrix').innerHTML = matrixHTML;
}


// create matrix form
document.getElementById("createMatrixForm").addEventListener("submit", function(event){
    event.preventDefault();

    const rows = document.getElementById("rows").value;
    const columns = document.getElementById("cols").value;

    var matrix = createMatrix(rows, columns);
    displayMatrix(matrix);

    if(matrix.length > 0) {
        document.querySelector(".matrix-container").style.display = "flex";
        document.querySelector(".landing-form").style.display = "none";

    }else{
        document.querySelector(".matrix-container").style.display = "none";
        document.querySelector(".landing-form").style.display = "flex";
    }

});

function deepCopyArray(arr) {
    if (!Array.isArray(arr)) {
        return arr; // Return non-array elements directly
    }
    
    return arr.map(item => deepCopyArray(item));
}


// search word form
document.getElementById("search-word-form").addEventListener("submit", function(event){
    event.preventDefault();

    const word = document.getElementById("word").value.toUpperCase();

    // Example usage:
    const solution = new FindWord();

    var board = deepCopyArray(matrix);

    var result = solution.find(board, word);
    
    if (result === true){
        document.querySelector(".found-container").innerHTML = "Word Found!!";
    }else{
        document.querySelector(".found-container").innerHTML = "Word Not Found!!";
    }
});


// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Check if the modal has been shown before
var modalShownBefore = localStorage.getItem("modalShown");

// If the modal has not been shown before, display it
if (!modalShownBefore) {
    window.onload = function() {
        modal.style.display = "block";
    }

    // Set a flag in local storage indicating that the modal has been shown
    localStorage.setItem("modalShown", true);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

