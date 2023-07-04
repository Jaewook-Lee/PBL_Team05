import { Fetch } from "./Fetch";
import css from "./index.css";
css;

async function main(): Promise<void> {
    const respose = await Fetch.requestList("", "");
    console.log(respose);
}

main();
