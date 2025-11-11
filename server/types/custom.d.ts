// Ambient module declarations for packages without shipped types in this workspace
// Placed under `server/types` so it's picked up by the project's `tsconfig.json` typeRoots/include.

declare module "cors";
declare module "cookie-parser";

declare module "@faker-js/faker" {
  // Minimal typing to allow importing the `faker` object in seed scripts.
  // For richer typing, install @faker-js/faker types or update this declaration.
  export const faker: any;
  export default faker;
}
