import { PageOutput } from '../page.output';

const transformPage = <Type>(source: PageOutput<any>, type: Type): PageOutput<Type> => {
  const page = new PageOutput<Type>();
  page.size = source.size;
  page.total = source.total;
  page.page = source.page;
  page.records = source.records;
  return page;
};

export default transformPage;
