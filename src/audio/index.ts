import { Client } from "../client.ts";
import { Speech } from "./speech.ts";

export * as speech from "./speech.ts";

export class Audio {
  constructor(private client: Client) {}

  readonly speech: Speech = new Speech(this.client);
}
