import { SetStateAction } from "react";

const API_KEY = 'cur_live_w6odapiXRE24IgXeNWur7GHtnNqQGlv92u9XSKB6'
const baseURL = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

const checkReponse = <T> (res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

type TOptions = {
  method?: string;
  body?: BodyInit | null | undefined;
  headers?: HeadersInit | undefined;
}

export type TResponce = {
  
}

export async function request(url: string, options: TOptions) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(res => checkReponse<any>(res))

}

export const getValuta = () => {
  return request(baseURL, {})
}
