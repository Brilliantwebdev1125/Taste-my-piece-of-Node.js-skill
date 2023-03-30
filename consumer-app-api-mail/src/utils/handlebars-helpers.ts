function ifEq(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
}

function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export default {ifEq, toUpperCase}