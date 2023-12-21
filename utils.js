import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function importFile(dir, f) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const p = 'file://' + join(process.cwd(), dir, f);
    const { default: data } = await import(p);
    return data;
}
