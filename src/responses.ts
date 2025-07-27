import { Client } from "./client.ts";

export class Responses {
  constructor(private client: Client) {}

  /**
   * Create a model response.
   *
   * # Examples
   *
   * ```handle
   * openai/responses/create(
   *     input = "I SAY PEANUT BUTTER - YOU SAY...",
   *     model = "gpt-4.1",
   * )
   * ```
   */
  public async create(
    input: string,
    /**
     * Model ID used to generate the response, like `gpt-4o` or `o3`. OpenAI
     * offers a wide range of models with different capabilities, performance
     * characteristics, and price points. Refer to the [model
     * guide](https://platform.openai.com/docs/models) to browse and compare
     * available models.
     */
    model: string,
    files?: File[],
  ): Promise<string> {
    const content: any[] = [];
    if (files) {
      for (const file of files) {
        const fileId = await uploadFile(this.client, file);
        content.push({ type: "input_file", file_id: fileId });
      }
    }
    content.push({ type: "input_text", text: input });
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.client.apiKey}`,
      },
      body: JSON.stringify({
        model,
        input: [{ role: "user", content }],
      }),
    });
    if (!res.ok) throw new Error("bad response from OpenAI");
    const json = await res.json();
    return json.output[0].content[0].text;
  }
}

async function uploadFile(client: Client, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("purpose", "user_data");
  formData.append("file", file);

  return fetch("https://api.openai.com/v1/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${client.apiKey}`,
    },
    body: formData,
  })
    .then((x) => x.json())
    .then((x) => x.id);
}
