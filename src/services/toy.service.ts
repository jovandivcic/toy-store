import axios from "axios";
import { ToyModel } from "../models/toy.model";

const client = axios.create({
  baseURL: "/"
});

export class ToyService {

    static async getToys(){
        return await client.get<ToyModel[]>("toys.json")
    }

    static async getToyById(id: number) {
        const response = await this.getToys();
        return response.data.find((toy: ToyModel) => toy.id === id);
    }
}