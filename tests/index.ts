import { test } from "uvu";
import * as assert from "uvu/assert";
import { Client } from "../src/index.ts";

const client = new Client(localStorage.getItem("API_KEY"));

test("responses.create", async function () {
  const message = "I SAY PEANUT BUTTER - YOU SAY...";
  const responseText = await client.responses.create(
    message,
    "gpt-4.1-nano-2025-04-14",
  );
  assert.type(responseText, "string");
});

test("responses.create files", async function () {
  const message = "Can you extract the main body text?";
  const files = [await download("chocolate.pdf")];
  const responseText = await client.responses.create(message, "gpt-4.1", files);
  assert.type(responseText, "string");
});

test("audio.speech.create", async function () {
  const input = "Hello World!";
  const audio = await client.audio.speech.create(
    input,
    "gpt-4o-mini-tts",
    "alloy",
  );
  assert.instance(audio, File);
});

async function download(path: string): Promise<File> {
  const res = await fetch(`/assets/${path}`);
  const blob = await res.blob();
  const name = path.split("/").at(-1);
  const type = res.headers.get("Content-Type");
  return new File([blob], name, { type });
}

test.run();
