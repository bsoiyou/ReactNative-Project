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
  //icon 색상과 글자색 동일하게
  tint-color: ${({theme}) => theme.text};
`;

const IconButton = props => {
  return(
    //클릭되었을 때 수행할 동작
    <TouchableOpacity onPress={props.onPress}>
      <View>
        {/* icon으로 이미지 불러오기 */}
        <Icon source={props.icon}></Icon>
      </View>
    </TouchableOpacity>
  );
}

IconButton.propTypes={
  //icon은 폴더에 있는 이미지 중 하나가 들어와야 함
  //객체에서 값만 뽑은 배열로 주기
  icon: PropTypes.oneOf(Object.values(icons)).isRequired,
  onPress: PropTypes.func,
}

export default IconButton;