import type { CanvasOptions } from "@moefy-canvas/core";
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
import { MeteorOption } from "../../type";
import { Meteor, MeteorConfig} from "@moefy-canvas/theme-meteor";
import "@vuepress/client/types";
declare const MeteorOptions: MeteorOption;
const MAX_Z_INDEX = 2147483647;
export const MeteorCanvas = defineComponent({
  name: "MeteorCanvas",
  setup() {
    let moefyCanvas: Meteor | null = null;
    const id = "meteor-canvas";
    const getCanvas = (): HTMLCanvasElement => {
      const canvas: HTMLCanvasElement = document.getElementById(
        id
      ) as HTMLCanvasElement;

      return canvas;
    };
    const themeConfig: MeteorConfig = {
        numParticles: MeteorOptions.config.numParticles
            ? MeteorOptions.config.numParticles
            : null,
        particleColor: MeteorOptions.config.particleColor
        ? MeteorOptions.config.particleColor
        : {
           light: 'rgba(102, 175, 239, .2)',
           dark: 'rgba(245, 236, 66, .2)',
        },
    };
    const canvasOptions: CanvasOptions = {
      opacity: 1,
      zIndex: -MAX_Z_INDEX,
    };
    onMounted(() => {
      moefyCanvas = new Meteor(themeConfig, canvasOptions);
      moefyCanvas && moefyCanvas.mount(getCanvas());
    });

    onBeforeUnmount(() => {
      moefyCanvas && moefyCanvas.unmount();
    });

  },
});
