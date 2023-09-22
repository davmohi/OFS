export async function compileData(content: string) {
    const timestamp = new Date().toISOString();
    return `${timestamp}\n${content}`;
  }