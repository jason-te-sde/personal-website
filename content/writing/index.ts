import type { Article } from "../types";
import { article as nanoMcp } from "./nano-mcp-untrusted-tools";
import { article as keel } from "./keel-deterministic-simulation";
import { article as shale } from "./shale-438-zero-bytes";
import { article as timeseriesguard } from "./timeseriesguard-why-0-70";

/** Newest first. Each article lives in its own module; every number in it links into its project's repository. */
export const articles: Article[] = [nanoMcp, keel, shale, timeseriesguard];
