declare module "next/dist/lib/metadata/types/metadata-interface.js" {
  export interface ResolvingMetadata {
    (): Promise<import("next").Metadata>;
  }
  export interface ResolvingViewport {
    (): Promise<import("next").Viewport>;
  }
}

declare module "next/types.js" {
  export * from "next/types";
}

declare module "next/types" {
  import type { Metadata, Viewport } from "next";
  export type ResolvingMetadata = () => Promise<Metadata>;
  export type ResolvingViewport = () => Promise<Viewport>;
  export { Metadata, Viewport };
}