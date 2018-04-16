import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const StyledText = styled.text`
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

const SvgAvatar = (props) => {
    const background = props.rounded
        ? (
            <circle
                cx={props.size / 2}
                cy={props.size / 2}
                fill={props.bgColor}
                r={(props.size / 2) - (props.border / 2)}
                stroke={props.borderColor}
                strokeWidth={props.border}
                />
        )
        : (
            <rect
                fill={props.bgColor}
                height={props.size}
                stroke={props.borderColor}
                strokeWidth={props.border * 2}
                width={props.size}
                x={0}
                y={0}
                />
        );

    return (
        <svg
            height={props.size}
            width={props.size}
            >
            {background}
            <StyledText
                fill={props.fgColor}
                fontSize={props.size / 2.5}
                textAnchor="middle"
                x={props.size / 2}
                y={(props.size / 2.5) + (props.size / 4.4)}
                >
                {props.initials}
            </StyledText>
        </svg>
    );
};

SvgAvatar.propTypes = {
    bgColor: PropTypes.string,
    border: PropTypes.number,
    borderColor: PropTypes.string,
    fgColor: PropTypes.string,
    initials: PropTypes.string,
    rounded: PropTypes.bool,
    size: PropTypes.number
};

export default SvgAvatar;
