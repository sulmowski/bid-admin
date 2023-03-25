import Config from "../config"
import Moment from 'moment-timezone';

export default class InternalUtils {
  generateFileName = (loadType="Artifacts", seqNumber, originalFileName, uploadFileType) => {
    switch(loadType) {
      case "Artifacts":
        return this.generateRawFileName(loadType, seqNumber, originalFileName, uploadFileType);
      default:
        throw new Error("wrong type of upload")
    }
  }

  generateRawFileName = (loadType, seqNumber, originalFileName, uploadFileType) => {
    const now = new Date();
    const tzUTC = 'utc'
    const dateTime = Moment(now).tz(tzUTC).format("YYYY-MM-DD-HH-mm-ss-SSS");
    const extension = originalFileName.split(".")[originalFileName.split(".").length-1]
    const new_name = originalFileName.split(".")[0]
    const res = `${new_name}_${seqNumber}_${dateTime}_${loadType}.${extension}`
    return res;
  }

  getAuthDomain = () => {
    const prefix = "njmsytvei82"
    const authEnv = '-' + Config.constants.ENVIRONMENT;
    const awsSuffix = ".auth.eu-west-1.amazoncognito.com"
    // const authEnv = Config.constants.ENVIRONMENT == 'prd' ? '' : '-' + Config.constants.ENVIRONMENT;
    return prefix + authEnv + awsSuffix 
  }

  timeConverter = (UNIX_timestamp) =>{
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = (a.getHours()<10?'0':'') + a.getHours()
    var min = (a.getMinutes()<10?'0':'') + a.getMinutes()
    var sec = (a.getSeconds()<10?'0':'') + a.getSeconds()
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

}
