import { configureStore } from '@reduxjs/toolkit';
import MenuMbActive from '~/pages/HomePage/HomePageSlice';
import ModalSelect from '~/Components/ModalSelectClass/HandleModalSlice';
import CardClass from '~/Redux/CardClassSlice';
import BookByAge from '~/Redux/BookByAgeSlice';
import Topic from '~/Redux/TopicSlice';
import TopicModal from '~/Redux/CloseModalTopicSlice';
import VocabyLesson from '~/Redux/VocaByLessonSlice';
import PostIndexVoca from '~/Redux/PostIndexVocaSlice';
import Loading from '~/Redux/LoadingSlice';
import auth from '~/Redux/AuthSlice';
import ModalVoca from '~/Redux/ModalVocaSlice';
import ModalVocaPage from '~/Redux/OpenModalVocaPage';
import Excercies from '~/Redux/ExerciesSlice';
import ModalExcercise from '~/Redux/ModalExcercise';
import DataDetailVoca from '~/Redux/PushDetaiVoca';
import IdTopic from '~/Redux/IDTopicSlice';
import DataVocaExcercise from '~/Redux/DataVocaExcercise';
import DataSearchVoca from '~/Redux/DataSearchVoca';
import ItemOffset from '~/Redux/ItemOffset';
import ActiveModalVocaPageExercise from '~/Redux/ActiveModalVocaPageExercise';
import IDVoca from '~/Redux/IDVocaSlice';
import ModalSpeak from '~/Redux/ModalSpeakSlice';
import ListActive from '~/Redux/ListActiveExercise';
import PostLesson from '~/Redux/PostIdLession';
import IndexTopic from '~/Redux/IndexTopic';
import ModalSuccess from '~/Redux/ModalSuccess';
import Scores from '~/Redux/Scores';
import ActiveModalScore from '~/Redux/ActiveModalScore';
import ResetEx3 from '~/Redux/ResetEx3';
import ActiveEx5 from '~/Redux/ActiveEx5';
import CountEx5 from '~/Redux/CountEx5';
import NextSingleSpeak from '~/Redux/NextSingleSpeak';
import ActiveEx8 from '~/Redux/ActiveEx8';
import CountEx8 from '~/Redux/CountEx8';
import ActiveExerciseEnd from '~/Redux/ActiveExerciseEnd';
import ListSongByID from '~/Redux/ListSongByIDTopic';
import IndexActiveTopicVideo from '~/Redux/IndexActiveTopicVideo';
import IdTopicVideo from '~/Redux/IdTopicVideo';
import ActiveModalChangePassword from '~/Redux/ActiveModalChangePassword';
import IndexSeriesStory from '~/Redux/IndexSeriesStory';
import DataGrammarDetailActive from '~/Redux/DataGrammarDetailActive';
import CourseSlice from '~/Redux/CourseSlice';
import IdDragDrop from '~/Redux/IdDragDrop';
import course from '~/Redux/CreateCourseSlice';
import musicBackground from '~/Redux/MusicBackground';
import IDBookAge from '~/Redux/IDBookAgeSlice';
import UCHistory from '~/Redux/ChangeUCHistory';
import scoreExercise from '~/Redux/TottalScoreExcercise';

const rootReducer = {
  musicBackground: musicBackground,
  scoreExercise: scoreExercise,
  UCHistory: UCHistory,
  IDBookAge: IDBookAge,
  MenuMbActive: MenuMbActive,
  ModalSelect: ModalSelect,
  CardClass: CardClass,
  BookByAge: BookByAge,
  Topic: Topic,
  TopicModal: TopicModal,
  VocabyLesson: VocabyLesson,
  PostIndexVoca: PostIndexVoca,
  Loading: Loading,
  auth: auth,
  course: course,
  ModalVoca: ModalVoca,
  ModalVocaPage: ModalVocaPage,
  Excercies: Excercies,
  ModalExcercise: ModalExcercise,
  DataDetailVoca: DataDetailVoca,
  IdTopic: IdTopic,
  DataVocaExcercise: DataVocaExcercise,
  DataSearchVoca: DataSearchVoca,
  ItemOffset: ItemOffset,
  ActiveModalVocaPageExercise: ActiveModalVocaPageExercise,
  IDVoca: IDVoca,
  ModalSpeak: ModalSpeak,
  ListActive: ListActive,
  PostLesson: PostLesson,
  IndexTopic: IndexTopic,
  ModalSuccess: ModalSuccess,
  Scores: Scores,
  ActiveModalScore: ActiveModalScore,
  ResetEx3: ResetEx3,
  ActiveEx5: ActiveEx5,
  CountEx5: CountEx5,
  NextSingleSpeak: NextSingleSpeak,
  ActiveEx8: ActiveEx8,
  CountEx8: CountEx8,
  ActiveExerciseEnd: ActiveExerciseEnd,
  ListSongByID: ListSongByID,
  IndexActiveTopicVideo: IndexActiveTopicVideo,
  IdTopicVideo: IdTopicVideo,
  ActiveModalChangePassword: ActiveModalChangePassword,
  IndexSeriesStory: IndexSeriesStory,
  DataGrammarDetailActive: DataGrammarDetailActive,
  CourseSlice: CourseSlice,
  IdDragDrop: IdDragDrop,
};
export const store = configureStore({
  reducer: rootReducer,
});
