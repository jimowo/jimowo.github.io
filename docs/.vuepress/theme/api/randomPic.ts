import axios, { AxiosResponse } from "axios";

export interface RandomPicResponse {
  code: string;     // 图片状态码
  acgurl: string;   // 图片地址
  width: string;    // 图片宽
  height: string;   // 图片高
}

export class RandomPicApi {
  public static toRandomPicResponse(json: string): RandomPicResponse {
    return JSON.parse(json);
  }

  public static RandomPicResponseToJson(value: RandomPicResponse): string {
    return JSON.stringify(value);
  }
  public static request(): Promise<AxiosResponse<RandomPicResponse>> {
    return axios.get<RandomPicResponse>(
      "/dome/random.php?return=json"
    //   "https://api.yimian.xyz/img?type=moe&size=1920x1080"
    );
  }
}