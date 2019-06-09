var myCanvas = document.getElementById('draw-board');
var ifClicked = false;
var currentColor = "black";
var brushHeight = 2;
var brushWidth = 2;
var canvasBorder = 10;

$('#current-size').text(`current size: ${brushWidth}`);

$(".color").click(function (e) {
    currentColor = e.target.id;
    return currentColor;
});

$(myCanvas).on("mousedown", draw);

function draw(e) {
    var wantedWidth = $("#canvas-width").val();
    var wantedHeight = $("#canvas-height").val();
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    if (x < wantedWidth - canvasBorder && y < wantedHeight - canvasBorder) {
        ifClicked = true;
        var newDot = document.createElement("span");
        newDot.className = 'dot';
        newDot.style.left = `${x}px`;
        newDot.style.top = `${y}px`;
        newDot.style.height = `${brushHeight}%`;
        newDot.style.width = `${brushWidth}%`;
        newDot.style.backgroundColor = currentColor;
        myCanvas.appendChild(newDot);
        return ifClicked;
    }
}

$(myCanvas).mousedown(function isDrawing() {
    if (ifClicked) {
        $(myCanvas).on("mousemove", draw);
    }
});

$(document).mouseup(function stopDraw() {
    $(myCanvas).off("mousemove", draw)
});

function changeCanvasSize() {
    var wantedWidth = $("#canvas-width").val();
    var wantedHeight = $("#canvas-height").val();
    myCanvas.style.width = wantedWidth + "px";
    myCanvas.style.height = wantedHeight + "px";
    $(myCanvas).empty();
}

$('#canvas-width').on("keyup", changeCanvasSize);
$('#canvas-height').on("keyup", changeCanvasSize);

$("#draw-board").mousemove(function canvasPosition(e) {
    var pos = $(this).offset();
    var elPos = { X: pos.left, Y: pos.top };
    var mPos = { X: e.clientX - elPos.X, Y: e.clientY - elPos.Y };
    $("#target-x").text(`Mouse X: ${mPos.X}`);
    $("#target-y").text(`Mouse Y: ${mPos.Y}`);
});

$("#plus").click(function brushBigger(e) {
    if (brushWidth < 9) {
        brushHeight++;
        brushWidth++;
        canvasBorder += 5;
        $('#current-size').text(`current size: ${brushWidth}`);
    }
    var currentCanvasWidth = $("#canvas-width").val();
    var currentCanvasHeight = $("#canvas-height").val();
    if (brushWidth > 4 && (currentCanvasWidth > 700 || currentCanvasHeight > 700)) {
        canvasBorder += 7;
    }
});

$("#minus").click(function brushSmaller(e) {
    if (brushWidth > 1) {
        brushHeight--;
        brushWidth--;
        canvasBorder -= 5;
        $('#current-size').text(`current size: ${brushWidth}`);
    }
});

$("#eraser").click(function (e) {
    currentColor = "white";
    return currentColor;
});

$("#clear").click(function clearCanvas() {
    canvasBorder = 10;
    brushWidth = 2;
    brushHeight = 2;
    currentColor = "black";
    $('#current-size').text(`current size: ${brushWidth}`);
    $(myCanvas).empty();
    $(myCanvas).css('background-color', 'white');
    document.getElementById('canvas-width').value = "500";
    document.getElementById('canvas-height').value = "500";
    changeCanvasSize();
});

$("#fill").click(function fill() {
    $(myCanvas).css('background-color', currentColor);
});