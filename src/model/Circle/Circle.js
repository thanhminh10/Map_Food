/* eslint-disable prettier/prettier */
const { default: Center } = require("../Center/Center");

class Circle {
    constructor(bk, coorCenterX, coorCenterY) {
        this.bk = bk,
            this.coorCenterX = coorCenterX
        this.coorCenterY = coorCenterY
    }

    DrawCircle(lat, long) {
        return Math.pow(lat - this.coorCenterX, 2) + Math.pow(long - this.coorCenterY, 2) - Math.pow(this.bk, 2)
    }
}
export default Circle;