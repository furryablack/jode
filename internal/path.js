import * as path from 'path';
import * as url from 'url';

const [Path, ref] = ((ref) => [ref, ref])({});

ref.filename   = (meta = import.meta) => url.fileURLToPath(meta.url)
ref.dirname    = (filename) => path.dirname(filename);
ref.basename   = (filename = ref.filename()) => path.basename(filename);
ref.resolve    = path.resolve;
ref.join       = path.join;

export { Path };