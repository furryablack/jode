import { Internal }  from '../internal/index.js';
import { Constants } from './constants.js';
import { Entity }    from './Entity.js';

const AFs    = Internal.AFs;
const Path   = Internal.Path;
const Crypto = Internal.Crypto;
const Json   = Internal.Json;
const Utils  = Internal.Utils;

export class System extends Entity {

  container = Constants.PATH_DATA;

  get identity() {
    const { name, capacity } = this;
    const identity = { name, capacity };
    identity.stringify = () => Json.stringify(identity);
    return identity;
  }

  get id() {
    return Crypto.createHash('md5').update(this.name).digest('hex');
  }

  get filename() {
    return `${this.id}.json`;
  }

  get systemPath() {
    return Path.join(this.container, this.filename);   
  }

  constructor(name, capacity = Constants.ENTITY_SYSTEM_CAPACITY) {
    super();
    
    this.name     = name;
    this.capacity = capacity;
  }

  async tap() {
    const identity = await this.read();
      
    this.name     = identity.name;
    this.capacity = identity.capacity;
  }

  async read() {
    Utils.throwIf(!await this.isExists(), `System ${this.name} is not exists`);
    return Json.parse(await AFs.readFile(this.systemPath));
  }

  async write() {
    Utils.throwIf(await this.isExists(), `System ${this.name} is exists already`);
    AFs.writeFile(this.systemPath, this.identity.stringify());  
  }

  async update() {}

  async prune() {
    if (await this.isExists()) {
      AFs.unlink(this.systemPath);
    }
  }

  async isExists() {
    return AFs.existsPath(this.systemPath);
  }

  async createIfNotExists() {
    if (!await this.isExists()) {
      this.write();  
    }
  }

  
}