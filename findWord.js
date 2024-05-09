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
            const temp = board[i][j];
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

module.exports = {FindWord}

