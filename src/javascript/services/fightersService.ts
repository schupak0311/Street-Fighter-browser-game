import { IFighter } from './../fighter';
import {
  callApi
} from '../helpers/apiHelper';

class FighterService {
  public async getFighters(): Promise<IFighter[]> {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint);

      return JSON.parse(apiResult);
    } catch (error) {
      throw error;
    }
  }

  public async getFighterDetails(_id:number): Promise<IFighter> {
    try {
      const endpoint = `details/fighter/${_id}.json`;
      const apiResult = await callApi(endpoint)

      return JSON.parse(apiResult);
    } catch (error) {
      throw error;
    }

  }
}

export const fighterService = new FighterService();