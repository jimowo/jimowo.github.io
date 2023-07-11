import type { CanvasOptions } from '@moefy-canvas/core'
import type {MeteorConfig} from '@moefy-canvas/theme-meteor'

export interface MeteorOption {
   config:MeteorConfig;
   canvasOptions?:CanvasOptions
}