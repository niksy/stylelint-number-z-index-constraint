# stylelint-number-z-index-constraint

[![Build Status][ci-img]][ci]

Stylelint rule for setting minimum and maximum constraint value for z-index.

## Install

```sh
npm install stylelint-number-z-index-constraint --save-dev
```

## Usage

Add this config to your `.stylelintrc`:

```json
{
	"plugins": [
		"stylelint-number-z-index-constraint"
	],
	"rules": [
		"plugin/number-z-index-constraint": {
			"min": 10,
			"max": 9999
		}
	]
}
```

## Details

```css
a { z-index: 10; }
/**          ↑
 * This number */
```

From [CSS Tricks article](https://css-tricks.com/handling-z-index/):

> It's fairly common to see people number in the hundreds with z-index in web design too. The idea being that you could slip something in between later if need be, which you couldn't if you did 1, 2, 3, etc, because z-index doesn't support decimals.

This rule also handles negative values.

### Options

#### `{ min: 10 }`

The following patterns are considered warnings:

```css
a { z-index: 9; }
b { z-index: 2; }
```

```css
a { z-index: -9; }
b { z-index: -2; }
```

The following patterns are *not* considered warnings:

```css
a { z-index: 10; }
b { z-index: 25; }
```

```css
a { z-index: 10; }
b { z-index: -25; }
```

#### `{ max: 9999 }`

The following patterns are considered warnings:

```css
a { z-index: 10000; }
b { z-index: 200000; }
```

```css
a { z-index: -10000; }
b { z-index: -200000; }
```

The following patterns are *not* considered warnings:

```css
a { z-index: 9999; }
b { z-index: 8000; }
```

```css
a { z-index: -9999; }
b { z-index: -8000; }
```

---

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/stylelint-number-z-index-constraint
[ci-img]: https://img.shields.io/travis/niksy/stylelint-number-z-index-constraint.svg
