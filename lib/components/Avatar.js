import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImgAvatar from "./ImgAvatar";
import SvgAvatar from "./SvgAvatar";
import styled from "styled-components";
import * as defaultValues from "../utils/defaultValues";
import { loadImage } from "../utils/ajax";
import { initials, createCancelablePromise } from "../utils/helpers";

const StyledAvatar = styled.div`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
`;

export default class Avatar extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            src: !props.url ? props.src || null : null,
            loadImageFailed: false,
            srcImageFailed: false
        };
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

    handleError () {
        this.setState({ srcImageFailed: true });
    }

    render () {
        let image = null;
        const initials = this.getInitials(this.props);
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
                    bgColor={this.props.bgColor}
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
    rounded: PropTypes.bool,
    size: PropTypes.number,
    src: PropTypes.string,
    url: PropTypes.string
};

Avatar.defaultProps = {
    bgColor: defaultValues.avatarBgColor,
    border: defaultValues.avatarBorder,
    borderColor: defaultValues.borderColor,
    fgColor: defaultValues.avatarFgColor,
    size: defaultValues.avatarSize,
};
