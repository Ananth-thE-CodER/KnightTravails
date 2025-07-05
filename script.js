function isValid(x, y) {
    return (x >= 0 && x < 8 && y >= 0 && y < 8);
}

function generateGraph() {
    const moves = [
        [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2]
    ];

    let graph = {};

    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            let key = JSON.stringify([x, y]);

            graph[key] = [];

            for ([kx, ky] of moves) {
                let nx = x + kx;
                let ny = y + ky;

                if (isValid(nx, ny)) {
                    graph[key].push([nx, ny]);
                }
            }
        }
    }
    return graph;
}

let graph = generateGraph();

function knightMoves(start, end) {
    let queue = [[start]];
    let visited = new Set();

    while (queue.length > 0) {
        let path = queue.shift();
        let current = path[path.length - 1];
        let key = JSON.stringify(current);

        if (key === JSON.stringify(end)) {
            return printPath(path);
        }

        if (!visited.has(key)) {
            visited.add(key);
            for (let neighbour of graph[key]) {
                queue.push([...path, neighbour]);
            }
        }
    }

    return null;
}

function printPath(output) {
    console.log(`You made it in ${output.length - 1} moves!  Here's your path:`)
    for (let path of output) {
        console.log(path);
    }
}

knightMoves([0,0],[3,3]);
knightMoves([3,3],[0,0]);
knightMoves([0,0],[7,7]);
knightMoves([6,0],[1,3]);