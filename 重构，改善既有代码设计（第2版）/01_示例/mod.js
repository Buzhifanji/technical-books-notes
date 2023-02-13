import { statement } from "./statement.js";

const playsJSON = await Deno.readTextFile("./plays.json");
const invoicesJSON = await Deno.readTextFile("./invoices.json");

const plays = JSON.parse(playsJSON);
const invoices = JSON.parse(invoicesJSON);

const result = statement(invoices[0], plays);
console.log(result);
