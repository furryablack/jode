const [Utils, ref] = ((ref) => [ref, ref])({});

ref.invariant = (expression, variants = {}) => {
  if (Boolean(expression)) 
    variants.true && variants.true(); 
  else 
    variants.false && variants.false();
};

ref.throwIf = (expression, message = '') => {
  const exception = () => {
    throw new Error(message);
  };

  ref.invariant(expression, { true: exception });
};

export { Utils };