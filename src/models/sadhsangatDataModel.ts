import { SewadalDataModel } from "./sewadalDataModel";

export interface SadhsangatDataModel extends SewadalDataModel {
  id: number;
  name: string;
  unitNo: number;
  unitName: string;
  area: string;
  address: string;
  pincode: string;
  contactNo: string;
  gender: number;
  dob: Date;
  age: number;
  qualification: string;
  occupation: string;
  dateOfGyan: Date;
  bloodGroup: string;
  familyId: number;
  isSewadal: boolean;
}

export class GetSadhsangatResultModel {
  public data: Partial<SadhsangatDataModel[]> = [];
  public count: number = 0;
}
