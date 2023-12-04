import { atom } from "recoil";
import { v4 } from "uuid";

export const stepState = atom({
  key: `stepState/${v4()}`,
  default: 0,
  dangerouslyAllowMutability: true,
});
