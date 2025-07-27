import { Responses } from "./responses.ts";
import { Audio } from "./audio/index.ts";

export class Client {
  constructor(
    /** @secret */
    public apiKey: string,
  ) {}

  readonly responses: Responses = new Responses(this);
  readonly audio: Audio = new Audio(this);
}
