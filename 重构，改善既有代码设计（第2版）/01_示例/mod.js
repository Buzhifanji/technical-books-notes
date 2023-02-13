import { statement } from "./statement.js";
import { refactorStatement } from "./refactor.js";

const playsJSON = await Deno.readTextFile("./plays.json");
const invoicesJSON = await Deno.readTextFile("./invoices.json");

const plays = JSON.parse(playsJSON);
const invoices = JSON.parse(invoicesJSON);

const result = statement(invoices[0], plays);
const refactorResult = refactorStatement(invoices[0], plays);

const oldResult = result.split("\n");
const newResult = refactorResult.split("\n");

let flag = true;
for (let i = 0; i < oldResult.length; i++) {
  if (oldResult[i] !== newResult[i]) {
    console.log("错误：" + oldResult[i] + " " + newResult[i]);
    flag = false;
  }
}

if (flag) {
  console.log("重构测试通过");
}
