import { Client } from "../client.ts";

export class Speech {
  constructor(private client: Client) {}

  /**
   * Generate audio from input text.
   *
   * # Examples
   *
   * ```handle
   * openai/audio/speech/create(
   *     input = "Hello World!",
   *     model = "gpt-4o-mini-tts",
   *     voice = "alloy",
   * )
   * ```
   */
  public async create(
    /** The text to generate audio for. The maximum length is 4096 characters. */
    input: string,
    /**
     * One of the available [TTS
     * models](https://platform.openai.com/docs/models#tts): `tts-1`, `tts-1-hd`
     * or `gpt-4o-mini-tts`.
     */
    model: string,
    /**
     * The voice to use when generating the audio. Supported voices are `alloy`,
     * `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`,
     * `shimmer`, and `verse`. Previews of the voices are available in the [Text
     * to speech
     * guide](https://platform.openai.com/docs/guides/text-to-speech#voice-options).
     */
    voice: string,
    /**
     * The format to audio in. Supported formats are `mp3`, `opus`, `aac`,
     * `flac`, `wav`, and `pcm`.
     */
    responseFormat?: string,
  ): Promise<File> {
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.client.apiKey}`,
      },
      body: JSON.stringify({
        model,
        input,
        voice,
        response_format: responseFormat,
      }),
    });
    if (!res.ok) throw new Error("bad response from OpenAI");
    const blob = await res.blob();
    return new File([blob], `speech.${responseFormat || "mp3"}`);
  }
}
