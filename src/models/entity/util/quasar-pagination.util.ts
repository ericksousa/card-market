export class QuasarPaginationEntity {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;

  constructor(this_class?: Partial<QuasarPaginationEntity>) {
    this.sortBy = "desc";
    this.descending = false;
    this.page = 1;
    this.rowsPerPage = 10;

    if (this_class) {
      Object.entries(this_class).forEach(([key, value]) => {
        if (key in this && value) this[key] = value;
      });
    }
  }
}
