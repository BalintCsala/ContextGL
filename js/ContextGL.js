/*
------ Done ------------
canvas
globalAlpha
globalCompositeOperation
shadowColor
shadowBlur
shadowOffsetX
shadowOffsetY
direction
textAlign
textBaseline
font
lineCap
lineDashOffset
lineJoin
lineWidth
miterLimit
imageSmoothingEnabled
imageSmoothingQuality

------ WIP -------------
fillStyle
strokeStyle

------ Unimplemented ---
currentTransform
filter

addHitRegion()
arc()
arcTo()
beginPath()
bezierCurveTo()
clearHitRegions()
clearRect()
clip()
closePath()
createImageData()
createLinearGradient()
createPattern()
createRadialGradient()
drawFocusIfNeeded()
drawImage()
ellipse()
fill()
fillRect()
fillText()
getImageData()
getLineDash()
isPointInPath()
isPointInStroke()
lineTo()
measureText()
moveTo()
putImageData()
quadraticCurveTo()
rect()
removeHitRegion()
resetTransform()
restore()
rotate()
save()
scale()
scrollPathIntoView()
setLineDash()
setTransform()
stroke()
strokeRect()
strokeText()
transform()
translate()
*/

class ContextGL {

    constuctor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl");

        this._prettyFillStyle = "black";
        this._fillStyleType = "color";
        this._fillStyle = [ 0, 0, 0, 1 ];

        this._prettyStrokeStyle = "black";
        this._strokeStyleType = "color";
        this._strokeStyle = [ 0, 0, 0, 1 ];

        // Global values

        this._globalAlpha = 1;

        this._globalCompositeOperations = [
            "source-over",
            "source-in",
            "source-out",
            "source-atop",
            "destination-over",
            "destination-in",
            "destination-out",
            "destination-atop",
            "lighter",
            "copy",
            "xor",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "color",
            "luminosity"
        ];
        this._globalCompositeOperation = "source-over";

        // Shadows

        this._prettyShadowColor = "rgba(0, 0, 0, 0)";
        this._shadowColor = [ 0, 0, 0, 0 ];

        this._shadowBlur = 0;

        this._shadowOffsetX = 0;
        this._shadowOffsetY = 0;

        // Text

        this._direction = "inherit";

        this._textBaseLines = [
            "top",
            "hanging",
            "middle",
            "alphabetic",
            "ideographic",
            "bottom"
        ];
        this._textBaseLine = "alphabetic";

        this._textAligns = [
            "left",
            "right",
            "center",
            "start",
            "end"
        ];
        this._textAlign = "start";

        this._fontFamily = "sans-serif";
        this._fontSize = 10;

        // Lines

        this._lineCap = "butt";

        this.lineDashOffset = 0;

        this._lineJoin = "miter";

        this._lineWidth = 1;

        this._miterLimit = 10;

        // Smoothing

        this.imageSmoothingEnabled = true;
        this._imageSmoothingQuality = "high";
    }

    set imageSmoothingQuality(value) {
        let v = value.toLowerCase();
        if (v == "low" || v == "medium" || v == "high")
            this._imageSmoothingQuality = value;
    }

    get imageSmoothingQuality() {
        return this._imageSmoothingQuality;
    }

    set miterLimit(value) {
        if (value != Infinity && value != NaN && value > 0)
            this._miterLimit = value;
    }

    get miterLimit() {
        return this._miterLimit;
    }

    set lineWidth(value) {
        if (value != Infinity && value != NaN && value >= 0)
            this._lineWidth = value;
    }

    get lineWidth() {
        return this._lineWidth;
    }

    set lineJoin(value) {
        let v = value.toLowerCase();
        if (v == "bevel" || v == "round" || v == "miter")
            this._lineJoin = value;
    }

    get lineJoin() {
        return this._lineJoin;
    }

    set lineCap(value) {
        let v = value.toLowerCase();
        if (v == "butt" || v == "round" || v == "square")
            this._lineCap = value;
    }

    get lineCap() {
        return this._lineCap;
    }

    set font(value) {
        let data = value.split(" ");
        this._fontFamily = data[1];
        this._fontSize = parseInt(data[0]);
    }

    get font() {
        return this._fontSize + "px " + this._fontFamily;
    }

    set textAlign(value) {
        if (this._textAligns.indexOf(value) != -1)
            this._textAlign = value;
    }

    get textAlign() {
        return this._textAlign;
    }

    set textBaseLine(value) {
        if (this._textBaseLines.indexOf(value) != -1)
            this._textBaseLine = value;
    }

    get textBaseLine() {
        return this._textBaseLine;
    }

    set direction(value) {
        let v = value.toLowerCase();
        if (v == "ltr" || v == "rtl" || v == "inherit")
            this._direction = value;
    }

    get direction() {
        return this._direction;
    }

    set shadowOffsetX(value) {
        if (value != Infinity && value != NaN)
            this._shadowOffsetX = value;
    }

    get shadowOffsetX() {
        return this._shadowOffsetX;
    }

    set shadowOffsetY(value) {
        if (value != Infinity && value != NaN)
            this._shadowOffsetY = value;
    }

    get shadowOffsetY() {
        return this._shadowOffsetY;
    }

    set shadowBlur(value) {
        if (value != Infinity && value != NaN && value >= 0)
            this._shadowBlur = value;
    }

    get shadowBlur() {
        return this._shadowBlur;
    }

    set shadowColor(value) {
        this._prettyShadowColor = value;
        this._shadowColor = Color.convertToGL(value);
    }

    get shadowColor() {
        return this._prettyShadowColor;
    }

    set globalCompositeOperation(value) {
        if (this._globalCompositeOperations.indexOf(value) != -1)
            this._globalCompositeOperation = value;
    }

    get globalCompositeOperation() {
        return this._globalCompositeOperation;
    }

    set globalAlpha(value) {
        if (value >= 0 && value <= 1)
            this._globalAlpha = value;
    }

    get globalAlpha() {
        return this._globalAlpha;
    }

    set fillStyle(value) {
        this._prettyFillStyle = value;
        if (value instanceof Gradient) {
            this._fillStyleType = "gradient";
            // TODO: Implement
        } else if (value instanceof Pattern) {
            this._fillStyleType = "pattern";
            // TODO: Implement
        } else {
            this._fillStyleType = "color";
            this._fillStyle = Color.convertToGL(color);
        }
    }

    get fillStyle() {
        return this._prettyFillStyle;
    }

    set strokeStyle(value) {
        this._prettyStrokeStyle = value;
        if (value instanceof Gradient) {
            this._strokeStyleType = "gradient";
            // TODO: Implement
        } else if (value instanceof Pattern) {
            this._strokeStyleType = "pattern";
            // TODO: Implement
        } else {
            this._strokeStyleType = "color";
            this._strokeStyle = Color.convertToGL(color);
        }
    }

    get strokeStyle() {
        return this._prettyStrokeStyle;
    }

    get clearColor() {
        return Color.convertToGL(this.canvas.style.backgroundColor);
    }

}
