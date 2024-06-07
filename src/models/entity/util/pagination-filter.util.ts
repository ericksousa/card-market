export class PaginationFilterEntity {
  page: number;
  rpp: number;

  constructor(this_class?: Partial<PaginationFilterEntity>) {
    this.page = 1;
    this.rpp = 10;

    if (this_class) {
      Object.entries(this_class).forEach(([key, value]) => {
        if (key in this && value) this[key] = value;
      });
    }
  }
}
