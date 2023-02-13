import { statement } from "./statement.js";
import { refactorStatement } from "./refactor.js";

const playsJSON = await Deno.readTextFile("./plays.json");
const invoicesJSON = await Deno.readTextFile("./invoices.json");

const plays = JSON.parse(playsJSON);
const invoices = JSON.parse(invoicesJSON);

const result = statement(invoices[0], plays);
console.log("result: " + result);

const refactorResult = refactorStatement(invoices[0], plays);
console.log("refactorResult: " + refactorResult);
