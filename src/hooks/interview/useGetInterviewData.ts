import useGetRandomQuestionList from '@/queries/question/useGetRandomQuestion';
import {
  InterviewCategoryAtom,
  interviewQuestionCountAtom,
  interviewTypeAtom,
} from '@/recoils/interview/atom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useGetInterviewData() {
  const [questionData, setQuestionData] = useState([]);
  const interviewType = useRecoilValue(interviewTypeAtom);
  const category = useRecoilValue(InterviewCategoryAtom);
  const questionCount = useRecoilValue(interviewQuestionCountAtom);
  const subcategory = '';

  const { randomQuestionData, isSuccess } = useGetRandomQuestionList({
    category,
    subcategory,
    questionCount,
    interviewType,
  });

  /* choice
    const questions = useRecoilValue(myQuestionAtom);

    const transformedQuestion = questions.map(question => ({
      questionId: question.questionId,
      questionContent: question.questionContent,
      answerContent: '',
    }));
    */
  /* random 
  const category = useRecoilValue(selectedRandomCategoryAtom);
  // const subcategory = useRecoilValue(selectedRandomSubcategoryAtom);
  const subcategory = '';
  const questionCount = useRecoilValue(questionCountAtom);

  console.log(category, subcategory, questionCount);

  const { data: questions, isLoading } = useSWR(
    ['/api/question/gpt', category, subcategory, questionCount],
    () => getRandomQuestions(category, subcategory, questionCount),
  );

  if (isLoading) return;
*/

  useEffect(() => {
    if (isSuccess && randomQuestionData?.length) {
      if (interviewType === 'random') setQuestionData(randomQuestionData);
    }
  }, [isSuccess]);

  return { questionData };
}
