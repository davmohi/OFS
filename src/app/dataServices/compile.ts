export const compileData = async(content: string) => {
    const timestamp = new Date().toISOString();
    return `${timestamp}\n${content}`;
  }