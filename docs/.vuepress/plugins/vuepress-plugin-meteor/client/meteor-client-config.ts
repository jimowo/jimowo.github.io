import { defineClientConfig, usePageData, useSiteData } from "@vuepress/client";
import {MeteorCanvas} from "../client/components/MeteorCanvas"


export default defineClientConfig({
  rootComponents: [MeteorCanvas],
});