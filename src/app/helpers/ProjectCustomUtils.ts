import {FormControl, FormGroup} from '@angular/forms';
import {JwtHelperService} from '@auth0/angular-jwt';
import {VideoJwtToken} from '../login/model/videojwt';


export class ProjectCustomUtils {
    static superAdminCheckLocalStorageKey = 'su';
    static userIdStorageKey = 'uid';
    static companyIdLocalStorageKey = 'cid';
    static companyNameLocalStorageKey = 'cname';
    static usernameStorageKey = 'username';
    static featureAccessListKey = 'feature';
    static projectJWTToken = 'herdmanToken';
    static localStorageCredentialsStored = 'stored';

    public static decodeTokenAndStoreCredentials(): VideoJwtToken {
        const myRawToken = localStorage.getItem(ProjectCustomUtils.projectJWTToken);
        if (myRawToken) {
            const decodedToken: VideoJwtToken = new JwtHelperService().decodeToken(myRawToken);
            const credentialStored = localStorage.getItem(ProjectCustomUtils.localStorageCredentialsStored);
            if (!credentialStored) {
                if (decodedToken.su) {
                    localStorage.setItem(ProjectCustomUtils.superAdminCheckLocalStorageKey, decodedToken.su + '');
                    localStorage.setItem(ProjectCustomUtils.userIdStorageKey, decodedToken.userID.toString());
                    localStorage.setItem(ProjectCustomUtils.usernameStorageKey, decodedToken.username);
                    localStorage.setItem(ProjectCustomUtils.companyNameLocalStorageKey, decodedToken.company);
                } else {
                    // normal user
                    // localStorage.setItem(ProjectCustomUtils.userIdStorageKey, decodedToken.userID.toString());
                    localStorage.setItem(ProjectCustomUtils.usernameStorageKey, decodedToken.username);
                    localStorage.setItem(ProjectCustomUtils.companyNameLocalStorageKey, decodedToken.company);
                }
                localStorage.setItem(ProjectCustomUtils.localStorageCredentialsStored, 'true');
            }
            return decodedToken;
        } else {
            return undefined;
        }
    }
    public static isTokenExpired(): boolean {
        const myRawToken = localStorage.getItem(ProjectCustomUtils.projectJWTToken);
        if (myRawToken) {
            return new JwtHelperService().isTokenExpired(myRawToken);
        } else {
            return true;
        }
    }


}