import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class CookieService {
    constructor() { }

    private setCookie(cookieName, cookieData, expirytime) {
        var newCookieData = JSON.stringify(cookieData);
        document.cookie = cookieName + "=" + newCookieData + ";" + expirytime + ";path=/";
    }

    private getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    public setUploadDocumentsCookie(meetingId, uploadData) {
        var expireTime = new Date();
        var minutes = 0.5;
        expireTime.setTime(expireTime.getTime() + (minutes * 60 * 1000));
        var cookieName = meetingId + "_uploadDocs";
        this.setCookie(cookieName, uploadData, expireTime.toUTCString())
    }

    public getUploadDocumentsCookie(meetingId) {
        var cookieName = meetingId + "_uploadDocs";
        var data = this.getCookie(cookieName);
        return data ? JSON.parse(data) : "";
    }

     public removeAllCookies() {
        var res = document.cookie;
        var multiple = res.split(";");
        for(var i = 0; i < multiple.length; i++) {
           var key = multiple[i].split("=");
           document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
        }
     }





}
