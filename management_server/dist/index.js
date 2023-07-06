"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ad_1 = __importDefault(require("./routes/ad"));
const test_1 = __importDefault(require("./routes/test"));
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.static('.')); //url로 직접 사진에 접속할때 필요한 코드 "localhost:8000/pic1.jpeg"
app.use(express_1.default.json());
app.use('/AD', ad_1.default);
app.use('/test', test_1.default);
// 사진보내기 테스트 겸 기본화면
app.get('/', (req, res) => {
    const photoPath = 'pic1.jpeg';
    res.sendFile(photoPath, { root: './' }); // root 잘 확인해야될듯
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
