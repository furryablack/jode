import { Internal } from '../internal/index.js';
import { Pkg }      from '../pkg/index.js';

const InputCLi  = Internal.InputCLi;
const Utils     = Internal.Utils;
const Schema    = Internal.Schema;
const Constants = Pkg.Constants;
const System    = Pkg.System;

main().catch((error) => {
  console.log(error);
  process.exit(-1);
});

async function main(input = InputCLi.parse()) {
  const inputSchema = Schema.object().shape({
    name: Schema.string().required(),
    mod:  Schema.string().default(Constants.CMD_SYSTEM_INPUT_MOD.DEFAULT),
  });

  input = await inputSchema.validate(input);

  const knownMods = [
    Constants.CMD_SYSTEM_INPUT_MOD.TAP,
    Constants.CMD_SYSTEM_INPUT_MOD.NEW,
    Constants.CMD_SYSTEM_INPUT_MOD.PRUNE,
  ];

  const isUnknownMod = knownMods.every(mod => mod !== input.mod);  
  const message = isUnknownMod && `Unknown command mod: ${input.mod}, known mods: ${knownMods.join(', ')}`;

  Utils.throwIf(isUnknownMod, message);

  const system = new System(input.name);

  switch (input.mod) {
    case Constants.CMD_SYSTEM_INPUT_MOD.TAP:
      system.tap();

      break;
    case Constants.CMD_SYSTEM_INPUT_MOD.NEW:
      system.createIfNotExists();

      break; 
    case Constants.CMD_SYSTEM_INPUT_MOD.PRUNE:
      system.prune();  
      
      break;   
    default: 
      break;
  }
}