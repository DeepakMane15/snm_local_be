import { SadhsangatDataModel } from "./sadhsangatDataModel";

export interface SewadalDataModel extends SadhsangatDataModel {
  sewadalId: number;
  personalNo: number;
  sewadalNo: string;
  recruitmentDate: Date;
}

export class GetSewadalResultModel {
  public data: SewadalDataModel[] = [];
  public count: number = 0;
}
