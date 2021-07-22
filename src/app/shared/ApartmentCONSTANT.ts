import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'; 
import { Apartment } from '../Apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentCONSTANT {

 static readonly LOGIN_URI='login';
 static readonly REGISTER_URI='saveUser';
 static readonly SEARCH_FLATNO_URI='searchflatno';
 static readonly CHANGE_FLATNO_URI='changeflatno';
 static readonly FINDOWNERBYNAME_URI='findOwnerByName';
 static readonly GET_OWNER_DETAILS_URI='getOwnerDetais';
 static readonly SAVE_OWNER_DETAILS_URI='saveOwnerDetails';
 static readonly SEARCH_OWNER_DETAILS_URI='searchOwnerDetails';
 static readonly SELECT_OWNER_DETAILS_URI='selectOwnerDetails';
 static readonly UPDATE_OWNER_DETAILS_URI='updateOwnerDetails';
 static readonly GET_APARTMENT_DETAILS_URI='getApartmentDetails';
 static readonly FINDUSERBYNAME_URI='finduserByName';
 static readonly UPDATEUSERBYNAME_URI='updateuserByName';
 static readonly DOWNLOADOWNERTABLE_URI='downloadownerTable';
 static readonly GENERATEOTP_URI='generateOtp';
 static readonly VALIDATEOTP_URI='validateOtp';
 static readonly CHANGEPWD_URI='changepassword';
 static readonly GETPROFILEPIC_URI='getProfilePic';
 static readonly UPLOADPROFILEPIC_URI='uploadProfilePic';
}