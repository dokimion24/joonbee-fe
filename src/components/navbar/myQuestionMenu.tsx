import { CategoryName, ChildrenProps, SubcategoryName, ToggleItemProps } from '@/types';
import { ToggleItem } from '../@common/toggleItem';
import { toggleNavbarQuestionList } from '@/constants/toggleNavbarItem';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter, useSearchParams } from 'next/navigation';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';

export const MyQuestionMenu = () => {
  const [items, setItems] = useState<ToggleItemProps[]>(toggleNavbarQuestionList);
  const [selectQuestionCategory, setSelectQuestionCategory] = useRecoilState(
    mySelectQuestionCategoryState,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const fieldParams = searchParams.get('Qfield') as CategoryName;
  const subFieldParams = searchParams.get('subField') as SubcategoryName;
  const categoryParams = searchParams.get('category');

  const handleClickChild = (childItem: ChildrenProps) => {
    setSelectQuestionCategory({
      ...selectQuestionCategory,
      subCategory: childItem.id,
    });
  };

  const handleClickOpen = (clickedItem: ToggleItemProps) => {
    const foundItem = items.find(item => item.id === clickedItem.id);

    if (foundItem && foundItem.isOpen) {
      return;
    }
    const updatedItems = items.map(item => {
      if (item.id === clickedItem.id) {
        return { ...item, isOpen: !item.isOpen };
      }
      return { ...item, isOpen: false };
    });
    setSelectQuestionCategory({
      category: clickedItem.id,
      subCategory: clickedItem.children[0].id,
    });
    setItems(updatedItems);
  };

  return (
    <div className="p-4">
      {items.map(item => (
        <div key={item.id} className={`toggle-item ${fieldParams === item.id && 'font-bold'}`}>
          <ToggleItem
            item={item}
            onClickOpen={() => {
              if (item.id === fieldParams) return;
              handleClickOpen(item);
              router.push(
                `my/?category=${categoryParams}&Qfield=${item.id}&subField=${item.children[0].id}`,
              );
            }}
          />
          <div className="font-normal flex flex-col text-start w-full gap-2">
            {fieldParams === item.id &&
              item.children?.map(childItem => (
                <button
                  key={childItem.id}
                  onClick={() => {
                    handleClickChild(childItem);
                    router.push(
                      `my/?category=${categoryParams}&Qfield=${item.id}&subField=${childItem.id}`,
                    );
                  }}>
                  <div className={`${subFieldParams === childItem.id && 'font-bold'}`}>
                    {childItem.value}
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
