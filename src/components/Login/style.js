import styled from 'styled-components'

export const LoginContainer = styled.div`
  background-color: ${props => (props.theme === true ? '#ffffff' : '#000000')};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`
export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 16px;
  margin-top: 30px;
`

export const Label = styled.label`
  color: ${props => (props.theme === true ? '#000000' : '#ffffff')};
  font-size: 16px;
  font-family: 'Roboto';
`

export const InputElement = styled.input`
  height: 20px;
  width: 45vw;
  border: solid #000000 1px;
  border-radius: 5px;
  margin-top: 8px;
  color: ${props => (props.theme === true ? '#000000' : '#ffffff')};
`

export const LoginButton = styled.button`
  background-color: '#0070c1';
  color: '#ffffff';
  height: 25px;
  width: 45vw;
  margin-top: 16px;
  border-radius: 10px;
`
export const ErrorMessage = styled.p`
  color: #ff0b37;
  font-size: 20px;
  font-family: 'Roboto';
`
