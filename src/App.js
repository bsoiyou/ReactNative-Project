import { StatusBar } from 'react-native';
import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import Input from './components/Input';
import IconButton from './components/IconButton';
import {icons} from './icons';

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

export default function App() {
  //상태변수
  const [newTask, setNewTask] = useState('');

  const addTask= ()=>{
    //입력한 text 띄우기
    alert(newTask);
    //Input text 초기화
    setNewTask('');
  }
  return (
  <ThemeProvider theme={theme}>
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
      <Title>TODO List</Title>
      <Input placeholder="+ Add a Task" 
      value={newTask}
      onChangeText = {text => setNewTask(text)} 
      //키보드 완료 버튼 누르면 수행할 동작
      onSubmitEditing={addTask}/>
      <IconButton onPress={()=> alert('check')} icon={icons.check} />
      <IconButton onPress={()=> alert('uncheck')} icon={icons.uncheck} />
      <IconButton onPress={()=> alert('delete')} icon={icons.delete} />
      <IconButton onPress={()=> alert('edit')} icon={icons.edit} />
    </Container>
  </ThemeProvider>
  ); 
}
