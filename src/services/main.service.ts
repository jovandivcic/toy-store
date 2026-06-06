import axios from "axios";

export class MainService {
    static async getFavoriteToys(){
        return await axios.get<String[]>('./favorite-toys.json');
    }
}