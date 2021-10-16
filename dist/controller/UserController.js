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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
var user_1 = require("../entity/user");
var typeorm_1 = require("typeorm");
var UserService_1 = __importDefault(require("../services/UserService"));
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(user_1.User).find()];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(user_1.User).findOne({ where: { username: req.params.username } })];
            case 1:
                result = _a.sent();
                if (result)
                    return [2 /*return*/, res.json(result)];
                return [2 /*return*/, res.json("Usuario não encontrado")];
        }
    });
}); };
exports.getUser = getUser;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, checkUserExists, passwordCript, newUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                user = new UserService_1.default();
                return [4 /*yield*/, (0, typeorm_1.getRepository)(user_1.User).findOne({ where: { username: username } })];
            case 1:
                checkUserExists = _b.sent();
                if (!!checkUserExists) return [3 /*break*/, 5];
                if (!user.maximumLetter(username)) return [3 /*break*/, 4];
                return [4 /*yield*/, user.criptPassword(password)];
            case 2:
                passwordCript = _b.sent();
                newUser = (0, typeorm_1.getRepository)(user_1.User).create({ username: username, password: passwordCript });
                return [4 /*yield*/, (0, typeorm_1.getRepository)(user_1.User).save(newUser)];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json("Usu\u00E1rio criado")];
            case 4: return [2 /*return*/, res.json("O nome de usuário é muito grande")];
            case 5: return [2 /*return*/, res.json("O nome de usuário já está em uso")];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, userUpdate, user, passwordCript;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, (0, typeorm_1.getRepository)(user_1.User).findOne({ where: { username: req.params.username } })];
            case 1:
                userUpdate = _b.sent();
                user = new UserService_1.default();
                if (!userUpdate) return [3 /*break*/, 4];
                return [4 /*yield*/, user.criptPassword(password)];
            case 2:
                passwordCript = _b.sent();
                (0, typeorm_1.getRepository)(user_1.User).merge(userUpdate, { username: username, password: passwordCript });
                return [4 /*yield*/, (0, typeorm_1.getRepository)(user_1.User).save(userUpdate)];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json("Usu\u00E1rio atualizado")];
            case 4: return [2 /*return*/, res.json("Usuario não encontrado")];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(user_1.User).delete({ username: req.params.username })];
            case 1:
                user = _a.sent();
                if (user.affected)
                    return [2 /*return*/, res.json("Usuario excluido")];
                return [2 /*return*/, res.json("Usuario não encontrado")];
        }
    });
}); };
exports.deleteUser = deleteUser;
