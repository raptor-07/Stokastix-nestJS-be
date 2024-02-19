"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTime = void 0;
function toTime(timeStamp) {
    var d = new Date(timeStamp).toString().slice(16, 24);
    return d;
}
exports.toTime = toTime;
