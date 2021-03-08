import { Color } from "@angular-material-components/color-picker";
import { FormGroup } from "@angular/forms";
import { globalConstanst } from "../global-constants/global-constants";

export class StaticHelper {

    static extractISDCode(fullphoneNumber:string): string {
        if(!fullphoneNumber) return globalConstanst.defaultISDCode;
            let [isdCode, ...phone] = fullphoneNumber.split("-");
            //const phone = second.join(" ")
        // const dashRemovedPhoneNo = fullphoneNumber.split("-").join("");
        // const isdCode = dashRemovedPhoneNo.substring(0,dashRemovedPhoneNo.length - 10);
        return isdCode;
    }

    static extractPhoneOnly(fullphoneNumber:string):string {
      if(!fullphoneNumber) return "";
        let [isdCode, ...phone] = fullphoneNumber.split("-");
        return phone.join("-");
    //     const dashRemovedPhoneNo = fullphoneNumber.split("-").join("");
    //     const isdCode = dashRemovedPhoneNo.substring(0,dashRemovedPhoneNo.length - 10);
    //    // const phoneNum = dashRemovedPhoneNo.slice(dashRemovedPhoneNo.length - 10, dashRemovedPhoneNo.length);.
    //    const phoneNum = fullphoneNumber.substring(isdCode.length,fullphoneNumber.length);
    //    return phoneNum;
    }

    static createFullPhoneNumber(isdCode:string , phoneNum:string): string {
        isdCode = isdCode ? isdCode : globalConstanst.defaultISDCode;
        return phoneNum  ? isdCode + "-" + phoneNum : "";
    }

    static hexToRgbaColor(hex:any): Color {
        var c:any;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
          c = hex.substring(1).split("");
          if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c = "0x" + c.join("");
          // var rgba =
          //   "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)";
    
          const color = new Color((c >> 16) & 255, (c >> 8) & 255, c & 255, 1);
          return color;
        } else return null as any;
      }

      static timeZoneAbbreviated = () => {
            
        const tz = new Date().toString().match(/\((.+)\)/);
                      return tz;
        // In Chrome browser, new Date().toString() is
        // "Thu Aug 06 2020 16:21:38 GMT+0530 (India Standard Time)"
      
        // In Safari browser, new Date().toString() is
        // "Thu Aug 06 2020 16:24:03 GMT+0530 (IST)"
      
        // if (tz.includes(" ")) {
        //   return tz
        //     .split(" ")
        //     .map(([first]) => first)
        //     .join("");
        // } else {
        //   return tz;
        // }
      };


      static focusToFirstInvalidField(form:FormGroup, el:any) {
     
        for (const key of Object.keys(form.controls)) {
          if (form.controls[key].invalid) {
            const invalidControl = el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            if(invalidControl){
              invalidControl.focus();
            }
           
            break;
          }
        }
      }

}