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
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessStravaApiSecret = void 0;
const secret_manager_1 = require("@google-cloud/secret-manager");
const name = `projects/jogger-logger/secrets/jogger-logger-strava-api-client-secret/versions/1`;
const client = new secret_manager_1.SecretManagerServiceClient();
function accessStravaApiSecret() {
    return __awaiter(this, void 0, void 0, function* () {
        const [version] = yield client.accessSecretVersion({
            name: name,
        });
        const payload = version.payload.data.toString();
        return payload;
    });
}
exports.accessStravaApiSecret = accessStravaApiSecret;
