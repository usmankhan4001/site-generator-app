/**
 * Zips a directory into a Buffer. `assembleSite` never copies `node_modules`
 * or other junk into `destDir`, so this needs no exclusion logic of its own.
 */

import { ZipArchive } from 'archiver';

export async function zipDir(dir: string): Promise<Buffer> {
  return new Promise((resolvePromise, reject) => {
    const archive = new ZipArchive({ zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on('data', (chunk: Buffer) => chunks.push(chunk));
    archive.on('warning', (err) => {
      if (err.code !== 'ENOENT') reject(err);
    });
    archive.on('error', reject);
    archive.on('end', () => resolvePromise(Buffer.concat(chunks)));

    archive.directory(dir, false);
    void archive.finalize();
  });
}
