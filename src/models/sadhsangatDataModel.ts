export interface SadhsangatDataModel {
  name: string;
  unitNo: number;
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
  isHOF: boolean;
}

export class GetSadhsangatResultModel {
  public data: SadhsangatDataModel[] = [];
  public count: number = 0;
}

export interface GetSadhsangatDataModel extends SadhsangatDataModel {
  unitName: string;
}
