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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var isDigitsOnly_1 = __importDefault(require("../utilities/isDigitsOnly"));
var resizeImage_1 = __importDefault(require("./api/resizeImage"));
var routes = express_1.default.Router();
routes.get('/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageFilename, imageWidth, imageHeight, imgPath, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imageFilename = req.query.filename;
                imageWidth = req.query.width;
                imageHeight = req.query.height;
                imgPath = path_1.default.join(__dirname, "../../images/thumbnail/".concat(imageFilename, "_").concat(imageWidth, "_").concat(imageHeight, ".jpg"));
                if (!(!(0, isDigitsOnly_1.default)(imageWidth) && !(0, isDigitsOnly_1.default)(imageHeight))) return [3 /*break*/, 1];
                res.send('Please enter valid numbers for the width and height of the resized image');
                return [3 /*break*/, 9];
            case 1:
                if (!!(0, isDigitsOnly_1.default)(imageHeight)) return [3 /*break*/, 2];
                res.send('Please enter a valid height number for the resized image');
                return [3 /*break*/, 9];
            case 2:
                if (!!(0, isDigitsOnly_1.default)(imageWidth)) return [3 /*break*/, 3];
                res.send('Please enter a valid width number for the resized image');
                return [3 /*break*/, 9];
            case 3:
                if (!!fs_1.default.existsSync(imgPath)) return [3 /*break*/, 8];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                //If no resized file already exists, then do the resizing and send the resized file
                return [4 /*yield*/, (0, resizeImage_1.default)(imageFilename, parseInt(imageWidth), parseInt(imageHeight))];
            case 5:
                //If no resized file already exists, then do the resizing and send the resized file
                _a.sent();
                res.status(200).sendFile(imgPath);
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                //handle error in case of failed image resizing or in case the requested filename doesn't exist
                res.send('Error: You may have entered a filename of an image that does not exist or the image might have failed to process.');
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 9];
            case 8:
                //else if a resized file already exists for the requested image then send it
                res.status(200).sendFile(imgPath);
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); });
exports.default = routes;
