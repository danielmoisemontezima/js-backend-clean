export async function readJsonBody(req: any): Promise<any> {
  const body = await new Promise<string>((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer | string) => (data += typeof chunk === "string" ? chunk : chunk.toString()));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

  return body ? JSON.parse(body) : {};
}