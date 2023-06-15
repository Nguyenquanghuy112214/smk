import { useDispatch, useSelector } from 'react-redux';
import { changeCourse } from '~/Redux/CreateCourseSlice';
export const useCourse = () => {
  const course = useSelector((state) => state.course);

  const dispatch = useDispatch();

  const setCourse = (data) => {
    localStorage.setItem('course', JSON.stringify(data));
    const actionChangeCourse = changeCourse(data);
    dispatch(actionChangeCourse);
  };

  const clearCourse = () => {
    localStorage.clear('course');
  };

  return { course, setCourse, clearCourse };
};
