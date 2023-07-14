import { Internal }  from '../internal/index.js';
import { Constants } from './constants.js';
import { Entity }    from './Entity.js';

const AFs    = Internal.AFs;
const Path   = Internal.Path;
const Crypto = Internal.Crypto;
const Json   = Internal.Json;
const Utils  = Internal.Utils;

export class System extends Entity {

  storeContainer = Constants.PATH_DATA;

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

  get storePath() {
    return Path.join(this.storeContainer, this.filename);   
  }

  constructor(name, capacity = Constants.ENTITY_SYSTEM_CAPACITY) {
    super();
    
    this.name     = name;
    this.capacity = capacity;
  }

  async tap() {
    const identity = await this.readStore();
      
    this.name     = identity.name;
    this.capacity = identity.capacity;
  }

  async readStore() {
    Utils.throwIf(!await this.storeIsExists(), `System ${this.name} has not a store`);
    return Json.parse(await AFs.readFile(this.storePath));
  }

  async writeStore() {
    Utils.throwIf(await this.storeIsExists(), `System ${this.name} has a store already`);
    AFs.writeFile(this.storePath, this.identity.stringify());  
  }

  async updateStore() {}

  async isExists() {
    return AFs.existsPath(this.storePath);
  }

  async createIfNotExists() {
    if (!await this.isExists()) {
      this.createStoreIfNotExists();  
    }
  }

  async storeIsExists() {
    return AFs.existsPath(this.storePath);
  }

  async createStoreIfNotExists() {
    if (!await this.storeIsExists()) {
      this.writeStore();  
    }
  }

  async prune() {
    this.pruneStore();
  }

  async pruneStore() {
    if (await this.storeIsExists()) {
      AFs.unlink(this.storePath);
    }
  }
}