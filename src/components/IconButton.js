import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
//icons 객체 import
import {icons} from '../icons';

const Icon = styled.Image`
  width: 30px;
  height: 30px;
  margin: 10px;
  tint-color: ${({theme, completed}) => (completed? theme.done: theme.text)};
`;

const IconButton = props => {
  //id를 받는 _onPress로 새로 정의
  const _onPress = () => {
    props.onPress(props.item.id);
  }
  return(
    //클릭되었을 때 수행할 동작
    <TouchableOpacity onPress={_onPress}>
      <View>
        {/* icon으로 이미지 불러오기 */}
        <Icon source={props.icon} completed={props.item.completed} />
      </View>
    </TouchableOpacity>
  );
}

IconButton.defaultProps={
  item: {completed: false},
}

IconButton.propTypes={
  //icon은 폴더에 있는 이미지 중 하나가 들어와야 함
  //객체에서 값만 뽑은 배열로 주기
  icon: PropTypes.oneOf(Object.values(icons)).isRequired,
  onPress: PropTypes.func,
  item: PropTypes.object,
}

export default IconButton;