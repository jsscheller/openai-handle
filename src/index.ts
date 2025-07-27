/**
 * Library for interacting with OpenAI's API.
 *
 * @module
 * @allownet https://api.openai.com
 */

// API docs: https://platform.openai.com/docs/api-reference

export { Client } from "./client.ts";
export * as audio from "./audio/index.ts";
export * as responses from "./responses.ts";
