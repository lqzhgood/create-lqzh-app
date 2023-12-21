import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function resolve(dir, p) {
    return join(process.cwd(), dir, p);
}

export async function importFile(dir, f) {
    const p = 'file://' + resolve(dir, f);
    const { default: data } = await import(p);
    return data;
}
