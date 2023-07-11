import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
import { MeteorOption } from "./type";

const __dirname = getDirname(import.meta.url);

const MeteorPlugin = (options?: MeteorOption): PluginFunction => {
  return (app) => {
    return {
      name: "vuepress-plugin-meteor",
      define: {
        MeteorOptions: options,
      },
      multiple: false,
      clientConfigFile: path.resolve(__dirname, "./client/meteor-client-config.ts"),
    };
  };
};
export { MeteorPlugin };