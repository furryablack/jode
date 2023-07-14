import * as fs   from 'fs';
import * as util from 'util';

const [AFs, ref] = ((ref) => [ref, ref])({});

ref.writeFile  = util.promisify(fs.writeFile);
ref.readFile   = util.promisify(fs.readFileSync);
ref.unlink     = util.promisify(fs.unlinkSync)
ref.existsPath = async (path) => fs.existsSync(path);

export { AFs };