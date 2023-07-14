import minimist from 'minimist';

const [InputCLi, ref] = ((ref) => [ref, ref])({});

ref.parse = function parse() {
  const argv = minimist(process.argv.slice(2));
  const { _, ...input } = argv;
  return input;
};

export { InputCLi };