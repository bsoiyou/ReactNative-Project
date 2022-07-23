import React from 'react';
import styled from 'styled-components';
import { Dimensions, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';


const StyledInput = styled.TextInput.attrs(
  //props.theme
  ({theme}) => ({
     placeholderTextColor: theme.main,
   })
)`
  width : ${({ width }) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 25px;
  background-color: ${({ theme }) => theme.itemBg};
  color: ${({ theme }) => theme.text};
`;


const Input = props => {
  //Dimensions component
  //const width= Dimensions.get('window').width;
  const width = useWindowDimensions().width;
  return (
    <StyledInput 
    width={width} 
    placeholder={props.placeholder} 
    maxLength={50}
    autoCapitalize='none' 
    autoCorrect={false} 
    returnKeyType='done'
    keyboardAppearance='dark'
    value={props.value}
    onChangeText={props.onChangeText}
    onSubmitEditing={props.onSubmitEditing} 
    onBlur={props.onBlur}/>
  );
};

//proptype 설정
Input.propTypes={
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default Input;
