import { findServer } from "./service/find-server";
import servers from "./data/index.json";

async function main() {
  await findServer(servers);
}
main();
