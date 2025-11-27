// Guaranteed CodeQL detections for JS/TS

import { exec } from "child_process";

// ❗ Hardcoded secret (recognizable pattern - AWS key)
const AWS_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE";

// ❗ Hardcoded JWT secret
const JWT_SECRET = "my-super-secret-jwt-key-123";

// ❗ Insecure eval (100% detected)
export function runUserCode(input: string) {
  // eslint-disable-next-line no-eval
  return eval(input);
}

// ❗ Command injection (100% detected)
export function runCommandUnsafe(arg: string) {
  exec("ls " + arg, (err, stdout, stderr) => {
    console.log(stdout);
  });
}

// ❗ ReDoS vulnerable regex (detected)
export function vulnerableRegex(input: string) {
  const regex = /(a+)+$/;  // catastrophic backtracking
  return regex.test(input);
}

// ❗ Insecure deserialization (100% detected)
export function insecureDeserialize(jsonString: string) {
  return JSON.parse(jsonString);
}
