import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { useWindowDimensions} from 'react-native';
import {icons} from '../icons';
import Input from './Input';

//항목 컨테이너
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme})=> theme.itemBg};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0;
`;

//텍스트
const Contents = styled.Text`
  color: ${({theme, completed})=> (completed? theme.done: theme.text)};
  flex: 1;
  font-size: 24px;
  text-decoration-line: ${({completed}) => (completed? 'line-through' : 'none')};
`;


const Task = ({item, deleteTask, toggleTask, updateTask}) => {
  //수정 상태 변수
  const [isEditing, setIsEditing] = useState(false);
  //Input text 값 관리하는 상태 변수 
  const [text, setText] = useState(item.text);

  //수정 완료 후 제출
  const _onSubmit = () => {
    if(isEditing){
      //현재 항목과 동일한 항목 만들기
      const updatedItem= Object.assign({},item);
      //텍스트 변경
      updatedItem['text']=text;
      setIsEditing(false);
      //수정한 item 전달
      updateTask(updatedItem);  
    }  
    
  }

  //수정 상태 변수 값에 따라 component 다르게 렌더링
  return isEditing
  ? (
  <Input 
    value={text} 
    onChangeText={text => setText(text)} 
    onSubmitEditing={_onSubmit}
    //onBlur 속성 (입력 취소할 때) --> Input text 원래 항목 text로 초기화, 수정 상태 변수 변경   
    onBlur={()=> {
      setText(item.text);
      setIsEditing(false);}
    }
   />
  )
  
  : (
    <Container>

      {/* check icon */}
      <IconButton 
      //completed 여부에 따라 icon 다르게 렌더링 
      icon={item.completed? icons.check : icons.uncheck}
      onPress={toggleTask} 
      item={item}
      />

      {/* text */}
      <Contents completed={item.completed}>
        {item.text}
      </Contents>

      {/* edit icon */}
      {/* completed 여부에 따라 edit 버튼 보이게/안 보이게 */}
      {item.completed || <IconButton onPress={()=>setIsEditing(true)} icon={icons.edit}/>}

      {/* delete icon */}
      <IconButton onPress={deleteTask} item={item} icon={icons.delete}/>
    </Container>
  );
}

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
}

export default Task;