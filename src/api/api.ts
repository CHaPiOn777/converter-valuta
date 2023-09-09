
const API_KEY = '47f2b1ef72deea1bace6ab6e8d38c347c301201a';
const countryURL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/country'
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
};



const optionsGET = {
  method: "GET",
  mode: "cors",
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  }
}
const optionsPOST = (query:string) => {
  console.log(query)
  return {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + API_KEY
    },
    body: JSON.stringify({query: 'IRR'})
  }
}
export async function request(url: string, options: TOptions) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(res => checkReponse<any>(res))

}

export const getValuta = () => {
  return request(baseURL, optionsGET)
}

export const convertValuta = (from:string, to:string) => {
  return request(convertURL(from, to), optionsGET)
}

export const getCountry = (query:string) => {
  return request(countryURL, optionsPOST(query))
}
