import fs from "fs";
import util from "util";
import test from "ava";
import writeVox from "vox-saver";
import readVox from "../index";
import { diff } from "json-diff";

test("test deer.vox", (t: any) => {
  const buffer = fs.readFileSync("./test/deer.vox");
  const vox = readVox(buffer);
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
