const [Json, ref] = ((ref) => [ref, ref])({});

ref.stringify = function stringify(value = {}, replacer = null, space = 2) {
  return JSON.stringify(value, replacer, space);
};

ref.parse = JSON.parse;

export { Json };