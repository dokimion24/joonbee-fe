export type CategoryName = '프론트엔드' | '백엔드' | 'CS' | '모바일' | '기타' | '언어' | '카테고리';
export type SubcategoryName =
  | '세부 카테고리'
  | 'React'
  | 'Vue'
  | 'Nextjs'
  | 'DB'
  | 'Express'
  | 'MSA'
  | 'Docker'
  | '운영체제'
  | '컴퓨터구조'
  | 'IOS'
  | '플러터'
  | 'Git';

export type QuestionCategory = {
  category: CategoryName;
  subcategory: SubcategoryName[];
};