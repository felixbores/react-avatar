# React Avatar [![Build Status](https://travis-ci.org/felixbores/react-avatar.svg?branch=master)](https://travis-ci.org/felixbores/react-avatar)
A simple component that renders an user avatar using a picture with a fallback system that renders a SVG image based on user's name or initials in case of the configured picture failed to load.

![React Avatar Component Preview](example.png)

## Installation

`npm install @felixbores/react-avatar --save`

You need to install `react`, `prop-types` and `styled-components` libraries by yourself, as they are peer dependencies

## Usage

Import Avatar element:

```js
  import Avatar from "@felixbores/react-avatar";
```

How to use:

```jsx
  <Avatar size={48} name="John Smith" />
  <Avatar size={90} name="George Jungle" src="http://i.pravatar.cc/90" />
  <Avatar size={120} initials="ST" url="http://i.pravatar.cc/120" border={3} />
  <Avatar size={120} name="BJ" />
  <Avatar size={60} name="Jane Doe" bgColor="#FFF" fgColor="#000" />
  <Avatar size={256} name="Fred Rock" border={2} borderColor="lightgreen" />
```

### Component Props

|   Prop          |      Type          | Default  |                                              Description                                               |
| --------------- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
| `className`     | *string*           |          | Class names to be added to the avatar |
| `size`          | *number*           | 60       | Size of the avatar |
| `border`        | *number*           | 0        | Border size of the avatar |
| `initials`      | *string*           |          | The initials to show as text when avatar is text based |
| `name`          | *string*           |          | If `initials` is not present, the `name` will be used to generate user initials |
| `bgColor`       | *string*           | #000000  | The background color when the avatar is text based |
| `fgColor`       | *string*           | #ffffff  | The text color when the avatar is text based |
| `borderColor`   | *string*           | #ffffff  | The border color of the avatar |
| `rounded`       | *bool*             | false    | Display the avatar as a circle |
| `url`           | *string*           |          | Url to load image using ajax. The image is converted to base64 |
| `src`           | *string*           |          | Used as traditional src image attribute. Will be used only if `url` was not defined or failed to load |
| `onClick`       | *function*         |          | Mouse click event |
| `onContextMenu` | *function*         |          | Mouse contextmenu event |
| `onDoubleClick` | *function*         |          | Mouse dblclick event |
| `onMouseDown`   | *function*         |          | Mouse mousedown event |
| `onMouseEnter`  | *function*         |          | Mouse mouseenter event |
| `onMouseLeave`  | *function*         |          | Mouse mouseleave event |
| `onMouseOut`    | *function*         |          | Mouse mouseout event |
| `onMouseOver`   | *function*         |          | Mouse mouseover event |
| `onMouseUp`     | *function*         |          | Mouse mouseup event |
| `randomBgColor` | *array* of colors  |          | Determine a random background color from the array input based on `name` or `initials` props |
| `randomBgColor` | *string*           |          | Determine a random background color from the palette input based on `name` or `initials` props. The valid palette options are: [social](https://www.materialui.co/socialcolors "Social Palette") , [material](https://www.materialui.co/colors "Material Palette"), [flat](https://www.materialui.co/flatuicolors "Flat Palette"), [metro](https://www.materialui.co/metrocolors "Metro Palette") and [fluent](https://fluentcolors.com "Fluent Palette") |
| `randomBgColor` | *bool*             |          | Determine a random background color from [social](https://www.materialui.co/socialcolors "Social Palette") palette based on `name` or `initials` props |

In case `name` and `initials` were not set, and images from `url` or `src` were not set or failed to load, a placeholder image is used.

## License

[MIT License](http://opensource.org/licenses/MIT)
