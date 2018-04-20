import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImgAvatar from "./ImgAvatar";
import SvgAvatar from "./SvgAvatar";
import styled from "styled-components";
import * as defaultValues from "../utils/defaultValues";
import { loadImage } from "../utils/ajax";
import { initials, createCancelablePromise, calculateColor } from "../utils/helpers";

const StyledAvatar = styled.div`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    display: inline-block;
`;

export default class Avatar extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            src: !props.url ? props.src || null : null,
            loadImageFailed: false,
            srcImageFailed: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount () {
        const { url, src } = this.props;

        if (url) {
            this.loadImageFromUrl(url, src);
        }
    }

    componentWillReceiveProps (nextProps) {
        if (!nextProps.url) {
            this.setState({ src: nextProps.src });
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.url !== this.props.url && this.props.url) {
            const src = this.props.src || prevProps.src;
            this.loadImageFromUrl(this.props.url, src);
        }
    }

    componentWillUnmount () {
        if (this.loadImagePromise) {
            this.loadImagePromise.cancel();
        }
    }

    loadImageFromUrl (url, src) {
        this.loadImagePromise = createCancelablePromise(loadImage(url));
        this.loadImagePromise.promise
            .then(response => {
                if (!response.promiseWasCanceled && response.data) {
                    this.setState({ src: response.data });
                }
            })
            .catch(response => {
                if (!response.promiseWasCanceled) {
                    this.setState({ loadImageFailed: true, src: src || null });
                }
            });
    }

    getInitials (props) {
        return props.initials ? props.initials : initials(props.name);
    }

    getPlaceholderSrc (rounded) {
        return rounded ? defaultValues.roundedPlaceholder : defaultValues.rectanglePlaceholder;
    }

    getBgColor (props) {
        const { randomBgColor, name, initials } = props;

        if (!randomBgColor) {
            return defaultValues.avatarBgColor;
        }

        return calculateColor(randomBgColor, name, initials);
    }

    handleError () {
        this.setState({ srcImageFailed: true });
    }

    handleClick (event) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    handleContextMenu (event) {
        if (this.props.onContextMenu) {
            this.props.onContextMenu(event);
        }
    }

    handleDoubleClick (event) {
        if (this.props.onDoubleClick) {
            this.props.onDoubleClick(event);
        }
    }

    handleMouseDown (event) {
        if (this.props.onMouseDown) {
            this.props.onMouseDown(event);
        }
    }

    handleMouseEnter (event) {
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    }

    handleMouseLeave (event) {
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    }

    handleMouseOut (event) {
        if (this.props.onMouseOut) {
            this.props.onMouseOut(event);
        }
    }

    handleMouseOver (event) {
        if (this.props.onMouseOver) {
            this.props.onMouseOver(event);
        }
    }

    handleMouseUp (event) {
        if (this.props.onMouseUp) {
            this.props.onMouseUp(event);
        }
    }

    render () {
        let image = null;
        const initials = this.getInitials(this.props);
        const bgColor = !this.props.bgColor ? this.getBgColor(this.props) : this.props.bgColor;
        const src = !this.state.src || (this.state.loadImageFailed && this.state.srcImageFailed)
            ? !initials
                ? this.getPlaceholderSrc(this.props.rounded)
                : null
            : this.state.src;

        if (src) {
            image = (
                <ImgAvatar
                    border={this.props.border}
                    borderColor={this.props.borderColor}
                    onError={() => this.handleError()}
                    rounded={this.props.rounded}
                    size={this.props.size}
                    src={src}
                    />
            );
        } else if (initials) {
            image = (
                <SvgAvatar
                    bgColor={bgColor}
                    border={this.props.border}
                    borderColor={this.props.borderColor}
                    fgColor={this.props.fgColor}
                    initials={initials}
                    rounded={this.props.rounded}
                    size={this.props.size}
                    />
            );
        }

        return (
            <StyledAvatar
                className={this.props.className}
                onClick={this.handleClick}
                onContextMenu={this.handleContextMenu}
                onDoubleClick={this.handleDoubleClick}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseOut={this.handleMouseOut}
                onMouseOver={this.handleMouseOver}
                onMouseUp={this.handleMouseUp}
                size={this.props.size}
                >
                {image}
            </StyledAvatar>
        );
    }
}

Avatar.propTypes = {
    bgColor: PropTypes.string,
    border: PropTypes.number,
    borderColor: PropTypes.string,
    className: PropTypes.string,
    fgColor: PropTypes.string,
    initials: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseUp: PropTypes.func,
    randomBgColor: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.bool,
        PropTypes.oneOf(["social", "material", "flat", "metro", "fluent"])
    ]),
    rounded: PropTypes.bool,
    size: PropTypes.number,
    src: PropTypes.string,
    url: PropTypes.string
};

Avatar.defaultProps = {
    border: defaultValues.avatarBorder,
    borderColor: defaultValues.borderColor,
    fgColor: defaultValues.avatarFgColor,
    size: defaultValues.avatarSize,
};
