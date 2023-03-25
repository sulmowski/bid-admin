import { Storage } from "aws-amplify";
import InternalUtils from "./internalLib";
import BackendRestApi from "./backendRestApi";
import AwsUtils from './awsUtils'

let uploadProgressLocal = {};
const internalUtils = new InternalUtils();
const backendRestApi = new BackendRestApi();
const awsUtils = new AwsUtils();
export class UploadUtils {
  constructor(){
    uploadProgressLocal = {};

  }
  
  utilsInstance = this;
  s3Upload = async (file, setProgress, loadType, seqNumber, uploadFileType) => {
    const fileName = internalUtils.generateFileName(loadType, seqNumber, file.name, uploadFileType);
    const originalFileName = file.name;

    try{
      const stored = await Storage.put(fileName, file, {
        contentType: file.type,
        customPrefix: {"public": "public/" + await awsUtils.getUserName() + "/"},
        async progressCallback(progress) {
          const loaded = (100 * progress.loaded)/progress.total;
          uploadProgressLocal[fileName] = {loaded: loaded, fileName: file.name, awsFileName: fileName, buffer: Math.random() * 10 + loaded, status: 'progress' }
          const clone = Object.assign({}, uploadProgressLocal);
          setProgress(clone);
        }
      })
      .then (result => {
        uploadProgressLocal[fileName]['status'] = 'success'
        setProgress(uploadProgressLocal)
        backendRestApi.genericPost('artifacts/putItem', {
          'uploaded_file_name': fileName,
          'original_file_name': originalFileName,
          'upload_file_type': uploadFileType
        })
      }
        )
      .catch(err => {
        uploadProgressLocal[fileName]['status'] = 'failed'
        setProgress(uploadProgressLocal)
      });
      return stored;
    }
    catch(error) {
      uploadProgressLocal[fileName] = {loaded: 100, fileName: file.name, awsFileName: fileName, buffer: 100, status: 'failed' }
      setProgress(uploadProgressLocal)
    }
  }
}
