interface jqueryStatic {
  height(val: number): this;
  width(val: number): this;
  extend(obj): this;
}

// declare function $(val: string): $;

interface JQuery {
  (val: string): jqueryStatic;
  fn: jqueryStatic;
  ajax(url: string, options: object): void;
}

declare const $: JQuery;
