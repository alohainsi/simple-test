## SUMMARY
It's a better way to safe time and resources to use SimpleTest in your project. It's a wrapper for all existing tests. See the API.

## Usage

### 1. Import SimpleTest
`import { SimpleTest } from './simple-test';`

### 2. Define SimpleTest variable
```
// SimpleTest
let simpleTest: SimpleTest;
```
### 3. Create a new instance before the each test
```
beforeEach(() => {
    simpleTest = new SimpleTest(fixture, expect, spyOn);
});
```

## Template for the examples
```
<div id="u_text">Simple Test</div>
<p>19</p>
<select class="u_select">
    <option value="1">First option</option>
    <option value="2">Second option</option>
    <option value="3">Third option</option>
</select>
<button data-aui="more-interests">
```

## 1.1. Get the DOM of element by:
```
const u_text = simpleTest.getById('u_text');
const u_number = simpleTest.getByTag('p');
const u_select = simpleTest.getByClassName('u_select');
const u_button = simpleTest.getByAttr('button', 'data-aui', 'more-interests');
```

> ##### Once we received the DOM of element, we can do the tests now.

# 2.0. The API

#### Install a spy onto an existing object.
```
// Support dynamic arguments
simpleTest.spyOn(component, 'loadMore', 'first arg', 'second arg')
```

#### Expect the actual value to be within a specified precision of the expected value.
```
u_number.toBeCloseTo(42.2, 3)
```

#### Expect the actual value to be greater than the expected value.
```
u_number.toBeGreaterThan(3)
```

#### Expect the actual value to be greater than or equal to the expected value.
```
u_number.toBeGreaterThanOrEqual(50)
```

#### Expect the actual to be an instance of the expected class
```
u_text.toBeInstanceOf(String)
u_number.toBeInstanceOf(Number)
```

#### Expect the actual value to be less than the expected value.
```
u_number.toBeLessThan(0)
```

#### Expect the actual value to be less than or equal to the expected value.
```
u_number.toBeLessThanOrEqual(123)
```

#### Expect the actual value to be NaN (Not a Number).
```
u_number.toBeNaN()
```

#### Expect the actual value to be -Infinity (-infinity).
```
u_number.toBeNegativeInfinity()
```

#### Expect the actual value to be null.
```
u_number.toBeNull()
```

#### Expect the actual value to be Infinity (infinity).
```
u_number.toBePositiveInfinity()
```

#### Expect the actual value to be true.
```
u_text.toBeTrue()
```

#### Expect the actual value to be undefined.
```
u_text.toBeUndefined()
```

#### Expect the actual value to be defined. (Not undefined)
```
u_button.toBeDefined()
```

#### Expect the actual value to contain a specific value.
```
u_text.toContain(anElement)
u_text.toContain(substring)
```

#### Expect the actual value to match a regular expression
```
u_text.toMatch(/string$/) // RegExp
u_text.toMatch("her")
```

#### Expect the actual value to be === to the expected value.
```
u_text.toBe('Universal Studios')
```

#### Expect the actual value to be equal to the expected, using deep equality comparison.
```
u_text.toEqual({a: 1})
```

#### Expect the element to be truthy.
```
u_select.toBeTruthy()
```

#### Expect the element to be falsy
```
u_text.toBeFalsy()
```

#### Expect the actual value to be a DOM element that has the expected class
```
u_select.toHaveClass('u_select')
```

#### Expect the element to be false.
```
u_text.toBeFalse()
```

#### Change select option
```
const optionValue = simpleTest
	.getByAttr('select', 'data-aui', 'AttractionExperiences')
	.changeSelectOption(2);
expect(component.AttractionExperiences).toBe(optionValue);

```
## 3.0. Full example
```
import { SimpleTest } from './simple-test';

describe('Component', () => {
	let fixture: ComponentFixture<Component>;
	let simpleTest: SimpleTest;

	beforeEach(() => {
		fixture = TestBed.createComponent(Component);
		simpleTest = new SimpleTest(fixture, expect, spyOn);
	});

	it('should check the API', () => {
		const u_text = simpleTest.getById('u_text');
		const u_number = simpleTest.getByTag('p');
		const u_select = simpleTest.getByClassName('u_select');
		const u_button = simpleTest.getByAttr('button', 'data-aui', 'more-interests');

		u_number.toBeCloseTo(42.2, 3);
		u_number.toBeGreaterThan(3);
		u_number.toBeGreaterThanOrEqual(50);

		u_text.toBeInstanceOf(String);
		u_number.toBeInstanceOf(Number);

		u_number.toBeLessThan(0);
		u_number.toBeLessThanOrEqual(123);
		u_number.toBeNegativeInfinity();
		u_number.toBePositiveInfinity();
		u_number.toBeNaN();
		u_number.toBeNull();

		u_text.toBeTrue();
		u_text.toBeUndefined();
		u_button.toBeDefined();

		u_text.toContain(anElement);
		u_text.toContain(substring);

		u_text.toMatch(/string$/); // RegExp
		u_text.toMatch('her');

		u_text.toBe('Universal Studios');
		u_text.toEqual({ a: 1 });

		u_select.toBeTruthy();
		u_text.toBeFalsy();
		u_text.toBeFalse();

		u_select.toHaveClass('u_select');
		u_button.click();

		const optionValue = simpleTest
			.getByAttr('select', 'data-aui', 'AttractionExperiences')
			.changeSelectOption(2);

                // You are still ablle to do the test as normal way to test it
		expect(component.AttractionExperiences).toBe(optionValue);
	});
});

```
