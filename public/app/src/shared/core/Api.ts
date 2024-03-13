import { Either, left, right } from "./either"
import { getGlobal } from "./globalVariables"

/**
 * 
 * @class Api
 * @classdesc Helper for http requests. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class Api {
  baseUrl: string

  /**
   * Insert base url
   * @param {string} baseUrl 
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public  async get(url: string, token: string | undefined): Promise<Either<Response, any>> {
    const response = await fetch(this.baseUrl + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const json = await response.json()
      return right(json)
    }
    return left(response)
  }

  public async post(url: string, data: any, token: string | undefined): Promise<Either<Response, any>> {
    const response = await fetch(this.baseUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      const json = await response.json()
      return right(json)
    }
    return left(response)
  }
}

// Insert base url.
const noliApi = new Api(getGlobal("apiUrl"))
export { noliApi }
