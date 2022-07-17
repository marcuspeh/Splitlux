import EncryptedStorage from "react-native-encrypted-storage";
import { AuthData } from "../../models/data/authData";

export default async function getHeader(): Promise<{}> {
    const authDataSerialized = await EncryptedStorage.getItem('@AuthData')
    if (authDataSerialized) {
        const authData: AuthData = JSON.parse(authDataSerialized);

        return {
            Authorization: `Bearer ${authData.access}`
        }
    } else {
        return {}
    }
}