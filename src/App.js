import { StatusBar } from 'react-native';
import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import Input from './components/Input';
import IconButton from './components/IconButton';
import {icons} from './icons';
import Task from './components/Task';
import { useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

//View > SafeAreaView Component 
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${ ({theme}) => theme.bg};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({theme}) => theme.main};
  width:100%;
  align-items: flex-start;
  padding: 0 20px;
`;

//ScrollView Component
const List = styled.ScrollView`
  flex: 1;
  width : ${({ width }) => width - 40}px;
`;

export default function App() {
  const width = useWindowDimensions().width;

  //Input text 상태변수
  const [newTask, setNewTask] = useState('');

  //목록 관리 상태변수
  const [tasks, setTasks] = useState({});

  //데이터 저장 함수 - async storage 이용
  const storeData = async tasks=>{
    try{
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);  
    }
    catch (e){

    }
  }

  //데이터 불러오는 함수 - async storage 이용
  const getData = async ()=>{
    const loadedData = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedData || '{}'))
  }


  //----Task 추가하기----
  const addTask= ()=>{
    //빈 텍스트 추가 방지 - newTask(text)의 길이 검사
    if(newTask.length < 1){
      return; //길이가 1보다 작으면 바로 return - 함수 실행x
    }
    //ID는 고유한 값 - 현재 시간의 timestamp 이용
    const ID= Date.now().toString();
    //추가할 task 객체 생성
    const newTaskObject = {
      //[ID]: ID 변수의 값을 의미 -> key가 ID 변수의 값이 되도록
      [ID] : {id: ID, text: newTask, completed:false}
    }
    //Input text 초기화
    setNewTask('');
    storeData({...tasks, ...newTaskObject});
  }


  //----Task 삭제하기----
  const deleteTask = (id) => {
    //현재 task 목록과 동일한 항목 가진 객체 생성
    const currentTasks = Object.assign({},tasks);
    //가져온 id에 해당하는 task를 삭제
    delete currentTasks[id];
    //업데이트
    storeData(currentTasks);
  }


  //----Task 완료/미완료 처리하기----
  const toggleTask = (id) => {
    //현재 task 목록과 동일한 항목 가진 객체 생성
    const currentTasks = Object.assign({},tasks);
    //completed 값 반대로 변경
    currentTasks[id]['completed']= !(currentTasks[id]['completed']);
    //업데이트
    storeData(currentTasks);
  }

  //----Task 수정하기----
  const updateTask= item=>{
    const currentTasks = Object.assign({},tasks);
    //수정한 item으로 변경
    currentTasks[item.id]=item;
    //업데이트
    storeData(currentTasks);
  }

  //로딩 상태 변수
  const [isReady, setIsReady] = useState(false);

  return isReady? (
  <ThemeProvider theme={theme}>
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
      {/* title */}
      <Title>TODO List</Title>

      {/* input */}
      <Input placeholder="+ Add a Task" 
      value={newTask}
      onChangeText = {text => setNewTask(text)} 
      //키보드 완료 버튼 누르면 수행할 동작
      onSubmitEditing={addTask}
      //onBlur 속성 (입력 취소할 때) --> Input text 공백으로 초기화
      onBlur={()=> setNewTask('')}/>

      {/* task list */}
      <List width= {width}>
        {/* task */}
        {/* 나중에 입력한 것이 위에 뜨도록 reverse() */}
          {/* map 함수 사용하여 task 하나씩 렌더링 */}
          {Object.values(tasks).reverse().map(item => ( 
          <Task 
          key={item.id} 
          item={item} 
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          updateTask={updateTask}/> 
          ))}
      </List>
    </Container>  
  </ThemeProvider>
  ) 
  //AppLoading component - 저장한 데이터 불러오기
  : (<AppLoading 
    startAsync={getData} 
    onFinish={()=> setIsReady(true)}
    onError={()=>{}}/>);
}
