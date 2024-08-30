export interface HOFDataModel {
  name: string;
  familyId: number;
  hof: number;
}

export class GetHOFResultModel {
  data: HOFDataModel[] = [];
  count: number = 0;
}
