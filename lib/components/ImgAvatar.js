import styled from "styled-components";

const ImgAvatar = styled.img`
    object-fit: cover;
    height: ${props => props.size - (props.border * 2)}px;
    width: ${props => props.size - (props.border * 2)}px;
    border: ${props => `${props.border}px solid ${props.borderColor}`};
    border-radius: ${props => props.rounded ? "50%" : "0%"}
`;

export default ImgAvatar;
