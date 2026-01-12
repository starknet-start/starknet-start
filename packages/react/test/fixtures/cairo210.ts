import casm from "./cairo210.casm.json";
import sierra from "./cairo210.sierra.json";

export const cairo210 = {
  sierra,
  casm,
};

export function getRandomizedContract() {
  const randomSelector = `0x${Math.floor(Math.random() * 10000000000).toString(16)}`;

  // Clone artifacts to avoid mutating the original
  const customizedSierra = JSON.parse(JSON.stringify(sierra));
  const customizedCasm = JSON.parse(JSON.stringify(casm));

  // Add a dummy entry point to change the hash
  // We duplicate the first external function but with a random selector
  const sierraEntry = { ...customizedSierra.entry_points_by_type.EXTERNAL[0] };
  sierraEntry.selector = randomSelector;
  customizedSierra.entry_points_by_type.EXTERNAL.push(sierraEntry);
  customizedSierra.entry_points_by_type.EXTERNAL.sort(
    (
      a: { selector: string | number | bigint | boolean },
      b: { selector: string | number | bigint | boolean },
    ) => (BigInt(a.selector) < BigInt(b.selector) ? -1 : 1),
  );

  const casmEntry = { ...customizedCasm.entry_points_by_type.EXTERNAL[0] };
  casmEntry.selector = randomSelector;
  customizedCasm.entry_points_by_type.EXTERNAL.push(casmEntry);
  customizedCasm.entry_points_by_type.EXTERNAL.sort(
    (
      a: { selector: string | number | bigint | boolean },
      b: { selector: string | number | bigint | boolean },
    ) => (BigInt(a.selector) < BigInt(b.selector) ? -1 : 1),
  );

  return {
    sierra: customizedSierra,
    casm: customizedCasm,
  };
}
