import { cx } from "class-variance-authority";

export function cn(...inputs: Array<string | false | null | undefined>) {
  return cx(inputs);
}
