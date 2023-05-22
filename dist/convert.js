"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJSON = void 0;
const tools_1 = require("@iconify/tools");
const convertJSON = (iconfontJSON) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const { font_class, icons } = iconfontJSON;
    const iconSet = new tools_1.IconSet({ prefix: font_class, icons: {} });
    try {
        for (var _d = true, icons_1 = __asyncValues(icons), icons_1_1; icons_1_1 = yield icons_1.next(), _a = icons_1_1.done, !_a;) {
            _c = icons_1_1.value;
            _d = false;
            try {
                const icon = _c;
                const svg = new tools_1.SVG(icon.svg);
                yield (0, tools_1.cleanupSVG)(svg);
                yield (0, tools_1.parseColors)(svg, {
                    defaultColor: 'currentColor',
                    callback: (attr, colorStr, color) => {
                        return !color || (0, tools_1.isEmptyColor)(color) ? colorStr : 'currentColor';
                    },
                });
                yield (0, tools_1.runSVGO)(svg);
                iconSet.fromSVG(icon.class_name, svg);
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = icons_1.return)) yield _b.call(icons_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    const iconifyJSON = iconSet.export(true);
    return iconifyJSON;
});
exports.convertJSON = convertJSON;
