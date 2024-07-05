"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ava_1 = __importDefault(require("ava"));
const vox_saver_1 = __importDefault(require("vox-saver"));
const index_1 = __importDefault(require("../index"));
const json_diff_1 = require("json-diff");
(0, ava_1.default)("test deer.vox", (t) => {
    const buffer = fs_1.default.readFileSync("./test/deer.vox");
    const vox = (0, index_1.default)(buffer);
    const writtenVox = (0, vox_saver_1.default)(vox);
    const validationVox = (0, index_1.default)(writtenVox);
    const difference = (0, json_diff_1.diff)(vox, validationVox);
    t.assert(difference === undefined, "vox-reader and vox-writer should be the same (handling extended files):\n" +
        difference);
    const rawDifference = (0, json_diff_1.diff)(Array(...buffer), writtenVox);
    t.assert(rawDifference === undefined, "vox-reader and vox-writer should be the same (handling extended files) RAW:\n" +
        rawDifference);
    t.pass();
});
/*

// This test just doesn't work at the moment, because the reader does more than the writer
test("test extended.vox", (t: any) => {
  const buffer = fs.readFileSync("./test/extended.vox");
  const vox = readVox(buffer);
  // console.log(util.inspect(vox, false, null, true));
  const writtenVox = writeVox(vox);
  const validationVox = readVox(writtenVox);
  const difference = diff(vox, validationVox);
  t.assert(
    difference === undefined,
    "vox-reader and vox-writer should be the same (handling extended files):\n" +
      difference
  );
  const rawDifference = diff(Array(...buffer), writtenVox);
  t.assert(
    rawDifference === undefined,
    "vox-reader and vox-writer should be the same (handling extended files) RAW:\n" +
      rawDifference
  );
  t.pass();
});
*/
//# sourceMappingURL=readVox.test.js.map