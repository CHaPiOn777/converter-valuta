import { SetStateAction } from "react";

const API_KEY = '7753040aef409cb121b04d44ff1d9fcb'
const baseURL = `https://api.exchangerate.host/latest`;

const convertURL = (from:string, to:string) => {
  return `https://api.exchangerate.host/convert?from=${from}&to=${to}`
}

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
let options = {
  method: "GET",
  mode: "cors",
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  }
}
export async function request(url: string, options: TOptions) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(res => checkReponse<any>(res))

}

export const getValuta = () => {
  return request(baseURL, options)
}

export const convertValuta = (from:string, to:string) => {
  return request(convertURL(from, to), options)
}
