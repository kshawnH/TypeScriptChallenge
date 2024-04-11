declare module "mitt" {
  type PType = string | number | symbol;
  type Listener = (...args: any[]) => void;

  const on: (type: PType, listener: Listener) => void;
  const emit: (type: PType, ...args: any[]) => void;
}

declare module "*.jpg" {
  const str: string;
  export default str;
}
