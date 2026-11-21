import type { MetadataRoute } from "next";

import { routes } from "@/content/routes";
import { absoluteUrl } from "@/lib/site";

// Sem lastModified: data errada (ex.: a do build em toda página) faz o Google ignorar o campo.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.filter((route) => route.published).map((route) => ({ url: absoluteUrl(route.path) }));
}
