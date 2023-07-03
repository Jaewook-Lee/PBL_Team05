"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.static('/'));
app.get('/', (req, res) => {
    const photoPath = 'pic1.jpeg';
    res.sendFile(photoPath, { root: './' });
});
app.get('/AD/requestList', (req, res) => {
    res.json({ "stauts": "success",
        "data": [{ "content": "pic1.jpeg", "width": "dddddd" }]
    });
});
app.get('/AD/readAd', (req, res) => {
    res.send({ "stauts": "success",
        "data": [{ "content": "pic1.jpeg", "width": "ssssss" }]
    });
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
