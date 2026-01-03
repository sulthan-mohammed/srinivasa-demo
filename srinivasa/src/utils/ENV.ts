import Config from 'react-native-config';

export interface ENVTypes {
  apiUrl?: string;
  mode?: string;
  buildType?: string;
}
const ENV: ENVTypes = {
  apiUrl: Config.API_URL,
  mode: Config.MODE,
  buildType: Config.BUILD_TYPE,
};
// full common url including host/api/
export default ENV;
