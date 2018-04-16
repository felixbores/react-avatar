# React Avatar [![Build Status](https://travis-ci.org/felixbores/react-avatar.svg?branch=master)](https://travis-ci.org/felixbores/react-avatar)
A simple user avatar rendering using a picture with a fallback system that render a SVG image based on user's name or initials in case of the configured picture failed to load .

## Installation

`npm install @felixbores/react-avatar --save`

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

## License

[MIT License](http://opensource.org/licenses/MIT)
