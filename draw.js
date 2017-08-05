var readline = require('readline');

if (!process.stdin || !process.stdout) {
    return;
}

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var canvas;
var canvasHeight;
var canvasWidth;

function read(){
    rl.question('whats up? ', reply);
}

function reply(answer) {
    if (typeof answer !== 'string') stop();

    var params = answer.split(' ');
    var command = params[0];
    switch (command) {
        case 'C':
            createCanvas(
                parseInt(params[1]),
                parseInt(params[2])
            );
            break;

        case 'L':
            paintLine(
                parseInt(params[1]),
                parseInt(params[2]),
                parseInt(params[3]),
                parseInt(params[4])
            );
            break;

        case 'R':
            paintRectangleOutline(
                parseInt(params[1]),
                parseInt(params[2]),
                parseInt(params[3]),
                parseInt(params[4])
            );
            break;

        case 'B':
            bucketFill(
                parseInt(params[1]),
                parseInt(params[2]),
                params[3] || ' '
            );
            break;

        case 'Q':
            stop();
            return;
    
        default:
            error('err unknown command');
            break;
    }

    printCanvas();
    read();
}

function createCanvas(w, h) {
    if (isNaN(w) || isNaN(h) || w < 0 || h < 0) { error('err invalid w/h'); return; }
    var maxWidth = ( process.stdout.columns || 80 ) - 2;
    var maxHeight = ( process.stdout.rows || 80 ) - 2;
    if (w > maxWidth || h > maxHeight) { error('err w/h too big'); return; }

    canvasHeight = h+1;
    canvasWidth = w+1;
    canvas = new Array(canvasWidth);
    for (var x = 0; x < canvasWidth; x++) {
        canvas[x] = new Array(canvasHeight);
        for (var y = 0; y < canvasHeight; y++) {
            canvas[x][y] = ' ';
        }    
    }
}

function paintLine(x1, y1, x2, y2) {
    if (x1 !== x2 && y1 !== y2) { error('err only h/v lines'); return; }

    paintRectangle(x1, y1, x2, y2);
}

function paintRectangleOutline(x1, y1, x2, y2) {
    paintRectangle(x1, y1, x2, y1);
    paintRectangle(x1, y2, x2, y2);
    paintRectangle(x1, y1, x1, y2);
    paintRectangle(x2, y1, x2, y2);
}

function paintRectangle(x1, y1, x2, y2) {
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) { error('err invalid params'); return; }
    if (!canvas) { error('err no canvas'); return; }
    if (x1 < 1 || x1 >= canvasWidth
        || x2 < 1 || x2 >= canvasWidth
        || y1 < 1 || y1 >= canvasHeight
        || y2 < 1 || y2 >= canvasHeight
    ) { error('err out of bounds'); return; }
    
    var xFrom = Math.min(x1, x2);
    var xTo = Math.max(x1, x2);
    var yFrom = Math.min(y1, y2);
    var yTo = Math.max(y1, y2);
    for (var x = xFrom; x <= xTo; x++) {
        for (var y = yFrom; y <= yTo; y++) {
            canvas[x][y] = 'x';
        }    
    }
}

function bucketFill(x, y, c) {
    if (isNaN(x) || isNaN(x) || typeof c !== 'string' || c.length !== 1) { error('err invalid params'); return; }
    if (!canvas) { error('err no canvas'); return; }
    if (x < 1 || x >= canvasWidth
        || y < 1 || y >= canvasHeight
    ) { error('err out of bounds'); return; }

    var originalColor = canvas[x][y];
    if (originalColor === c) return;

    var queue = [];
    queue.push({x: x, y: y});
    while (queue.length) {
        var currentPoint = queue.pop();
        canvas[currentPoint.x][currentPoint.y] = c;
        [
            {x: currentPoint.x + 1, y: currentPoint.y},
            {x: currentPoint.x - 1, y: currentPoint.y},
            {x: currentPoint.x, y: currentPoint.y + 1},
            {x: currentPoint.x, y: currentPoint.y - 1}
        ].forEach(function(point) {
            if (
                point.x >= 1 && point.x < canvasWidth
                && point.y >= 1 && point.y < canvasHeight
                && canvas[point.x][point.y] === originalColor
            ) {
                queue.push(point);
            }
        });
    }
    
}

function printCanvas() {
    if (!canvas) { error('err no canvas'); return; }

    var s = '';
    
    s += (new Array(canvasWidth+2)).join('-') + '\n';
    for (var y = 1; y < canvasHeight; y++) {
        s += '|';
        for (var x = 1; x < canvasWidth; x++) {
            s += canvas[x][y];
        }    
        s += '|\n';
    }
    s += (new Array(canvasWidth+2)).join('-') + '\n';
    
    rl.write(s);
    
}

function error(message) {
    rl.write(message || 'err');
    rl.write('\n');
}

function stop() {
    rl.close();
}

read();