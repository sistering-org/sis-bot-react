import styled from 'styled-components';
import defaultTheme from '../../theme';

const OptionElement = styled.a`
  background: ${({ theme }) => theme.optionsColor};
  border-radius: 22px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.botFontColor};
  display: inline-block;
  font-size: 14px;
  padding: 12px;
  &:hover { opacity: .7;
    text-decoration: none;
    color: ${({theme}) => theme.botFontColor};
    background: ${({ theme }) => theme.optionsColorHover};
   }
`;

OptionElement.defaultProps = {
  theme: defaultTheme,
};

export default OptionElement;
