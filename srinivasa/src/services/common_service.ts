import {Dimensions, Linking, Platform} from 'react-native';
import * as queryString from 'querystring';
// import DocumentPicker from 'react-native-document-picker';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export interface FileType {
  uri: string;
  type: string | undefined;
  name: string;
}

const getAuthHeader = (token: string) => {
  return {Authorization: 'Bearer ' + token};
};

const isAndroid = () => {
  return Platform.OS === 'android';
};

const toCapitalize = (str: string | ''): any => {
  return str?.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

const toCapitalizeFirstLetter = (str: string | ''): any => {
  return str?.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
};

const convertSecondsToMinutesSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
};

const isIOS = () => {
  return Platform.OS === 'ios';
};
const parseQueryString = (q: string): any => {
  return queryString.parse(q);
};
const openLink = (link: string) => {
  Linking.canOpenURL(link)
    .then(supported => {
      if (!supported) {
        console.log('Cant handle url');
      } else {
        return Linking.openURL(link);
      }
    })
    .catch(err => {
      console.log('An error occurred', err);
    });
};
const openCall = (phoneNumber: string) => {
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phoneNumber}`;
  } else {
    phoneNumber = `tel:${phoneNumber}`;
  }
  openLink(phoneNumber);
};
const getWidth = (screen: 'screen' | 'window' = 'screen') => {
  return Dimensions.get(screen).width;
};
const getHeight = (screen: 'screen' | 'window' = 'screen') => {
  return Dimensions.get(screen).height;
};

// const openDocumentPicker = (types: any[]): Promise<FileType> => {
//   return new Promise((resolve, reject) => {
//     DocumentPicker.pick({
//       type: types,
//       allowMultiSelection: false,
//     })
//       .then(resp => {
//         if (resp && resp.length > 0) {
//           const fileAsset = resp[0];
//           const file = {
//             uri: isAndroid()
//               ? fileAsset.uri || ''
//               : (fileAsset.uri || '').replace('file://', ''),
//             type: fileAsset.type || '',
//             name: fileAsset.name || 'image.jpg',
//             size: fileAsset.size || 0,
//           };
//           console.log(fileAsset, 'size of the photo');
//           // FileViewer.open(resp.uri);
//           if (fileAsset.size && fileAsset.size <= 8000000) {
//             resolve(file);
//           } else {
//             reject({
//               didCancel: false,
//               err: 'size of image should be less than 8MB',
//             });
//           }
//         } else {
//           reject({
//             didCancel: false,
//             err: 'Asset not selected',
//           });
//         }
//       })
//       .catch(err => {
//         if (DocumentPicker.isCancel(err)) {
//           reject({didCancel: true, err: 'User cancelled image picker'});
//         } else if (err.errorCode) {
//           console.log(err.errorMessage, 'Image Picker Error');
//           reject({didCancel: false, err: err.errorCode});
//         }
//       });
//   });
// };

const openMedia = (
  mode: 'camera' | 'picker' = 'picker',
  selectionLimit: number = 5,
  mediaType: 'photo' | 'video' | 'mixed' = 'photo',
  options: ImageLibraryOptions | CameraOptions = {mediaType: mediaType},
): Promise<FileType> => {
  const baseOptions: ImageLibraryOptions | CameraOptions = {
    mediaType: mediaType,
    maxHeight: 1024,
    selectionLimit: selectionLimit,
    maxWidth: 1024,
  };
  options = {...baseOptions, ...options};
  console.log(mode, 'mode of the image picker');

  return new Promise((resolve, reject) => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    let func = launchImageLibrary;
    if (mode === 'camera') {
      console.log('***');
      func = launchCamera;
    }
    func(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        reject({didCancel: true, err: 'User cancelled image picker'});
      } else if (response.errorCode) {
        console.log(response.errorMessage, 'Image Picker Error');
        reject({didCancel: false, err: response.errorCode});
      } else {
        console.log(response);
        if (response.assets) {
          if (response.assets.length > 0) {
            const fileAsset = response.assets;
            const file: any = fileAsset.map((item: any) => {
              return {
                uri: isAndroid()
                  ? item.uri || ''
                  : (item.uri || '').replace('file://', ''),
                type: item.type || '',
                name: item.fileName || 'image.jpg',
                fileSize: item.fileSize || 0,
              };
            });
            console.log(response, 'file size of the photo');
            resolve(file);
          } else {
            const fileAsset = response.assets[0];
            const file = {
              uri: isAndroid()
                ? fileAsset.uri || ''
                : (fileAsset.uri || '').replace('file://', ''),
              type: fileAsset.type || '',
              name: fileAsset.fileName || 'image.jpg',
              fileSize: fileAsset.fileSize || 0,
            };
            console.log(response, 'file size of the photo');
            if (fileAsset.fileSize && fileAsset.fileSize <= 8000000) {
              resolve(file);
            } else {
              reject({
                didCancel: false,
                err: 'size of image should be less than 8MB',
              });
            }
          }
          // const source = {uri: response.origURL};
          // console.log(file);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          // console.log(source);
        } else {
          reject({
            didCancel: false,
            err: 'Asset not selected',
          });
        }
      }
    });
  });
};

const CommonService = {
  getAuthHeader,
  isAndroid,
  isIOS,
  parseQueryString,
  toCapitalize,
  toCapitalizeFirstLetter,
  convertSecondsToMinutesSeconds,
  openCall,
  openLink,
  getWidth,
  getHeight,
  // openDocumentPicker,
  openMedia,
};

export default CommonService;
