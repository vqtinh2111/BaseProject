export class PageOutput<Type> {
  page: number;
  size: number;
  total: number;
  records: Type[];
}
