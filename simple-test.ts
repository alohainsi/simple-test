// Angular
import {DebugElement, DebugNode} from '@angular/core';
import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

// Lodash
import {get} from 'lodash/get';
import {isString} from 'lodash/isString';

/**
 * Export SimpleTest
 */
export class SimpleTest {
  /**
   * Debug element control (DOM)
   * @type DebugElement
   */
  private readonly de: DebugElement;

  /**
   * Component fixture
   * @type ComponentFixture<any>
   */
  private readonly fixture: ComponentFixture<any>;

  /**
   * An expectation for a spec.
   * @type function
   */
  private readonly expect: any;

  /**
   * Spy On method
   * @type any
   */
  private readonly spy: any;

  /**
   * Native element
   * @type any
   */
  private el: any;

  /**
   * Constructor
   * @param {ComponentFixture} fixture
   * @param {function} expect
   * @param {function} spyOn
   */
  constructor(
    fixture: ComponentFixture<any>,
    expect?: Function,
    spyOn?: Function
  ) {
    this.fixture = fixture;
    this.de = this.fixture.debugElement;
    this.detectChanges();
    this.expect = expect;
    this.spy = spyOn;
  }

  /**
   * Spy method in component
   *    -: Install a spy onto an existing object.
   *        Exp. -> simpleTest.getById(id).spyOn()
   *
   * @param {any} component
   * @param {string} method
   * @param args
   */
  spyOn(component: any, method: string, ...args: any): void {
    this.spy(component, method).and.callThrough();
    component[method](...args);
    this.expect(component[method])[
      args.length > 0 ? 'toHaveBeenCalledWith' : 'toHaveBeenCalled'
      ](...args);
  }

  /**
   * Test: To Be Close To
   *    -: expect the actual value to be within a specified precision of the expected value.
   *        Exp. -> simpleTest.getById(id).toBeCloseTo(42.2, 3)
   *
   * @param {number} arg
   * @param {number} precision
   */
  toBeCloseTo(arg: number, precision?: number): void {
    this.doExpect(
      'toBeCloseTo',
      this.getValue(false, true),
      false,
      false,
      arg,
      precision
    );
  }

  /**
   * Test: To Be Greater Than
   *    -: expect the actual value to be greater than the expected value.
   *        Exp. -> simpleTest.getById(id).toBeGreaterThan(3)
   *
   * @param {number} arg
   */
  toBeGreaterThan(arg: number): void {
    this.doExpect(
      'toBeGreaterThan',
      this.getValue(false, true),
      false,
      false,
      arg
    );
  }

  /**
   * Test: To Be Greater Than Or Equal
   *    -: expect the actual value to be greater than or equal to the expected value.
   *        Exp. -> simpleTest.getById(id).toBeGreaterThanOrEqual(25)
   *
   * @param {number} arg
   */
  toBeGreaterThanOrEqual(arg: number): void {
    this.doExpect(
      'toBeGreaterThanOrEqual',
      this.getValue(false, true),
      false,
      false,
      arg
    );
  }

  /**
   * Test: To Be InstanceOf
   *    -: expect the actual to be an instance of the expected class
   *        Exp.  -> simpleTest.getById(id).toBeInstanceOf(String)
   *              -> simpleTest.getById(id).toBeInstanceOf(Number)
   *
   * @param arg
   */
  toBeInstanceOf(arg: any): void {
    this.doExpect('toBeInstanceOf', false, false, false, arg);
  }

  /**
   * Test: To Be Less Than
   *    -: expect the actual value to be less than the expected value.
   *        Exp. -> simpleTest.getById(id).toBeLessThan(0)
   *
   * @param {number} arg
   */
  toBeLessThan(arg: number): void {
    this.doExpect('toBeLessThan', false, false, false, arg);
  }

  /**
   * Test: To Be Less Than Or Equal
   *    -: expect the actual value to be less than or equal to the expected value.
   *        Exp. -> simpleTest.getById(id).toBeLessThanOrEqual(123)
   *
   * @param {number} arg
   */
  toBeLessThanOrEqual(arg: number): void {
    this.doExpect('toBeLessThanOrEqual', false, false, false, arg);
  }

  /**
   * Test: To Be NaN
   *    -: expect the actual value to be NaN (Not a Number).
   *        Exp. -> simpleTest.getById(id).toBeNaN()
   *
   */
  toBeNaN(): void {
    this.doExpect('toBeNaN');
  }

  /**
   * Test: To Be Negative Infinity
   *    -: expect the actual value to be -Infinity (-infinity).
   *        Exp. -> simpleTest.getById(id).toBeNegativeInfinity()
   *
   */
  toBeNegativeInfinity(): void {
    this.doExpect('toBeNegativeInfinity');
  }

  /**
   * Test: To Be Null
   *    -: expect the actual value to be null.
   *        Exp. -> simpleTest.getById(id).toBeNull()
   *
   */
  toBeNull(): void {
    this.doExpect('toBeNull');
  }

  /**
   * Test: To Be Positive Infinity
   *    -: expect the actual value to be Infinity (infinity).
   *        Exp. -> simpleTest.getById(id).toBePositiveInfinity()
   *
   */
  toBePositiveInfinity(): void {
    this.doExpect('toBePositiveInfinity');
  }

  /**
   * Test: To Be True
   *    -: expect the actual value to be true.
   *        Exp. -> simpleTest.getById(id).toBeTrue()
   *
   */
  toBeTrue(): void {
    this.doExpect('toBeTrue');
  }

  /**
   * Test: To Be Undefined
   *    -: expect the actual value to be undefined.
   *        Exp. -> simpleTest.getById(id).toBeUndefined()
   *
   */
  toBeUndefined(): void {
    this.doExpect('toBeUndefined');
  }

  /**
   * Test: To be defined
   *    -: expect the actual value to be defined. (Not undefined)
   *        Exp. -> simpleTest.getById(id).toBeDefined()
   */
  toBeDefined(): void {
    this.doExpect('toBeDefined');
  }

  /**
   * Test: To Contain
   *    -: expect the actual value to contain a specific value.
   *        Exp.  -> simpleTest.getById(id).toContain(anElement)
   *              -> simpleTest.getById(id).toContain(substring)
   *
   * @param {number | string} arg
   * @param {boolean} stripTags
   */
  toContain(arg: number | string, stripTags = false): void {
    this.doExpect('toContain', false, stripTags, false, arg);
  }

  /**
   * Test: To Match
   *    -: expect the actual value to match a regular expression
   *        Exp.  -> simpleTest.getById(id).toMatch(/string$/)
   *              -> simpleTest.getById(id).toMatch("her")
   *
   * @param {number | string} arg
   * @param {boolean} stripTags
   */
  toMatch(arg: number | string, stripTags = false): void {
    this.doExpect('toMatch', false, stripTags, false, arg);
  }

  /**
   * Test: To Be
   *    -: expect the actual value to be === to the expected value.
   *        Exp. -> simpleTest.getById(id).toBe('Universal Studios')
   *
   * @param {any} arg
   * @param {boolean} fakeTest
   * @param {boolean} stripTags
   * @return {any}
   */
  toBe(arg: any, fakeTest: boolean = true, stripTags = false): void {
    this.doExpect('toBe', false, stripTags, fakeTest, arg);
  }

  /**
   * Test: To Equal
   *    -: expect the actual value to be equal to the expected, using deep equality comparison.
   *        Exp. -> simpleTest.getById(id).toEqual({a: 1})
   *
   * @param {any} arg
   * @param {boolean} fakeTest
   * @return {any}
   */
  toEqual(arg: any, fakeTest: boolean = true): void {
    this.doExpect('toEqual', false, false, fakeTest, arg);
  }

  /**
   * Test: Length To Be
   *        Exp. -> simpleTest.getById(id).lengthToBe(12)
   *
   * @param {number} value
   * @param {boolean} fakeTest
   */
  lengthToBe(value: number, fakeTest: boolean = true): void {
    this.doExpect(
      'toBe',
      this.el ? this.el.length : undefined,
      fakeTest,
      false,
      value
    );
  }

  /**
   * Test: To Be Truthy
   *    -: expect the element to be truthy.
   *        Exp. -> simpleTest.getById(id).toBeTruthy()
   *
   */
  toBeTruthy(): void {
    this.expect(this.getElement()).toBeTruthy();
  }

  /**
   * Test: To Be Falsy
   *    -: expect the element to be falsy
   *        Exp. -> simpleTest.getById(id).toBeFalsy()
   *
   * @return {any}
   */
  toBeFalsy(): void {
    this.expect(this.getElement()).toBeFalsy();
  }

  /**
   * Test: To Have Class
   *    -: expect the actual value to be a DOM element that has the expected class
   *        Exp. -> simpleTest.getById(id).toHaveClass(className)
   */
  toHaveClass(expected: string): void {
    this.expect(this.getElement()).toHaveClass(expected);
  }

  /**
   * Test: To be false
   *    -: expect the element to be false.
   *        Exp. -> simpleTest.getById(id).toBeFalse()
   */
  toBeFalse(): void {
    this.expect(this.getElement()).toBeFalse();
  }

  /**
   * Change select option in the form
   * @param {string|number} keyIndex
   * @return {any}
   */
  changeSelectOption(keyIndex: string | number): any {
    // Result variable
    let result;

    // If we got needed data
    if (this.el) {
      // Get element
      const el = this.getElement();

      // Change the select option value
      result = el.value = this.getSelectOption(keyIndex);

      // Dispatch event
      el.dispatchEvent(new Event('change'));

      // Detect changes
      this.detectChanges();
    }

    // Return entire element
    return result;
  }

  /**
   * Get elements count
   * @return {number}
   */
  getLength(): number {
    return !this.el ? 0 : this.el.length;
  }

  /**
   * Native element: Get value
   * @param {boolean} stripTags
   * @param {boolean} isInt
   * @return {undefined|any}
   */
  getValue(stripTags = false, isInt = false): any {
    const getContent = () => {
      return get(this.el, 'nativeElement.textContent');
    };

    return this.el
      ? stripTags || isInt
        ? stripTags
          ? this.stripHtmlTags(getContent())
          : parseInt(getContent(), 10)
        : getContent()
      : undefined;
  }

  /**
   * Get native element
   * @return {undefined|any}
   */
  getElement(): any {
    return this.el ? get(this.el, 'nativeElement', undefined) : undefined;
  }

  /**
   * Get DOM element by class name
   *
   * Example: .getByClassName('mapInfoBlock')
   *          .getByClassName('mapInfoBlock', false, 'p')
   *          .getByClassName('mapInfoBlock', 'nativeElement.textContent')
   *          .getByClassName('mapInfoBlock', 'nativeElement.textContent', 'p')
   *          .getByClassName('mapInfoBlock', 'nativeElement.textContent', 'p', false)
   *          .getByClassName('mapInfoBlock', false, false, false)
   *              The last parameter "false" gonna return multiple items,
   *              cause by default "SimpleTest" do work with a single element".
   *              Small performance protection for future.
   *
   * @param {string} className
   * @param {string | boolean} neededData
   * @param {string} tag
   * @param {boolean} isSingle
   * @return {any|this}
   */
  getByClassName(
    className: string,
    neededData: string | boolean = false,
    tag: string | boolean = '',
    isSingle = true
  ): DebugElement | DebugElement[] | DebugNode[] | any | this {
    // Get dom element
    const domElement = this.getDomElement(
      isString(tag) ? `${tag}.${className}` : `.${className}`,
      neededData,
      isSingle
    );

    // Return result depends if we gonna use native element manually
    return neededData ? domElement : this;
  }

  /**
   * Get DOM element by ID
   *
   * Example: .getById('mapInfoBlock')
   *          .getById('mapInfoBlock', false, 'p')
   *          .getById('mapInfoBlock', 'nativeElement.textContent')
   *          .getById('mapInfoBlock', 'nativeElement.textContent', 'p')
   *          .getById('mapInfoBlock', 'nativeElement.textContent', 'p', false)
   *          .getById('mapInfoBlock', false, false, false)
   *              The last parameter "false" gonna return multiple items,
   *              cause by default "SimpleTest" do work with a single element".
   *              Small performance protection for future.
   *
   * @param {string} idEl
   * @param {string | boolean} neededData
   * @param {string} tag
   * @param {boolean} isSingle
   * @return {any|this}
   */
  getById(
    idEl: string,
    neededData: string | boolean = false,
    tag: string = '',
    isSingle = true
  ): DebugElement | DebugElement[] | DebugNode[] | any | this {
    // Get dom element
    const domElement = this.getDomElement(
      isString(tag) ? `${tag}#${idEl}` : `#${idEl}`,
      neededData,
      isSingle
    );

    // Return result depends if we gonna use native element manually
    return neededData ? domElement : this;
  }

  /**
   * Get by selector
   *
   * Example: .getBySelector('h3')
   *          .getBySelector('h3', 'nativeElement.textContent')
   *          .getBySelector('h3', 'nativeElement.textContent', false)
   *          .getBySelector('h3', false, false)
   *
   * @param {string} tag
   * @param {string | boolean} neededData
   * @param {boolean} isSingle
   * @return {any|this}
   */
  getByTag(
    tag: string,
    neededData: string | boolean = false,
    isSingle = true
  ): DebugElement | DebugElement[] | DebugNode[] | any | this {
    // Get dom element
    const domElement = this.getDomElement(tag, neededData, isSingle);

    // Return result depends if we gonna use native element manually
    return neededData ? domElement : this;
  }

  /**
   * Get DOM element by attributes
   *
   * Example: .getByAttr('p', 'data-aui', 'AttractionExperiences')
   *          .getByAttr('p', 'data-aui', 'AttractionExperiences', 'nativeElement.textContent')
   *          .getByAttr('p', 'data-aui', 'AttractionExperiences', 'nativeElement.textContent', false)
   *          .getByAttr('p', 'data-aui', 'AttractionExperiences', false, false)
   *              The last parameter "false" gonna return multiple items,
   *              cause by default "SimpleTest" do work with a single element".
   *              Small performance protection for future.
   *
   * @param {string} tag
   * @param {string} attrKey
   * @param {string} attrValue
   * @param {string | boolean} neededData
   * @param {boolean} isSingle
   * @return {any|this}
   */
  getByAttr(
    tag: string,
    attrKey: string,
    attrValue: string,
    neededData: string | boolean = false,
    isSingle = true
  ): DebugElement | DebugElement[] | DebugNode[] | any | this {
    // Get dom element
    const domElement = this.getDomElement(
      `${tag}[${attrKey}=${attrValue}]`,
      neededData,
      isSingle
    );

    // Return result depends if we gonna use native element manually
    return neededData ? domElement : this;
  }

  /**
   * Get dom element by class name, id or attributes
   * @param {string} stringPath
   * @param {string | boolean} neededData
   * @param {boolean} isSingle
   * @return {any|this}
   */
  private getDomElement(
    stringPath: string,
    neededData: string | boolean,
    isSingle = true
  ): DebugElement | DebugElement[] | DebugNode[] | any | this {
    // Detect changes before any changes with a DOM
    this.detectChanges();

    // Get DOM element
    const domElement = (this.el = this.de[isSingle ? 'query' : 'queryAll'](
      By.css(stringPath)
    ));

    // Return result
    return domElement && neededData && isString(neededData)
      ? get(domElement, neededData)
      : this;
  }

  /**
   * Do expect test
   * @param {string} funcName
   * @param {any} expected
   * @param {boolean} stripTags
   * @param {boolean} fakeTest
   * @param {[]} args
   */
  private doExpect(
    funcName: string,
    expected?: any,
    stripTags?: boolean,
    fakeTest?: boolean,
    ...args: any
  ): void {
    const getExpected = (): any => {
      return expected
        ? stripTags
          ? this.stripHtmlTags(expected)
          : expected
        : this.getValue(stripTags);
    };

    if (args && typeof args[0] !== 'undefined') {
      for (const x in args) {
        if (args.hasOwnProperty(x)) {
          args[x] = stripTags ? this.stripHtmlTags(args[x]) : args[x];
        }
      }
      this.expect(getExpected())[funcName](...args);
    } else {
      if (fakeTest) {
        this.expect(true).toBe(true);
      } else {
        this.expect(getExpected()).toBe(...args);
      }
    }
  }

  /**
   * Get select option value
   * @param {string | number | boolean} key
   * @return {string | number | boolean}
   */
  private getSelectOption(
    key?: string | number | false
  ): string | number | undefined {
    // If we dont' have DOM of native element
    if (!this.el) {
      return undefined;
    }

    // Get element
    return key
      ? this.getElement()['options'][key]['value']
      : this.getElement()['options'];
  }

  /**
   * Strip tags
   * @param {string} str
   * @return {string}
   */
  stripHtmlTags(str: any): string {
    return Number.isInteger(str)
      ? str
      : str.replace(/(<([^>]+)>)/gi, '').trim();
  }

  /**
   * Strip lines
   * @param {string} str
   * @return {string}
   */
  stripLines(str: any): string {
    return Number.isInteger(str) ? str : str.replace(/\r?\n|\r/g, '').trim();
  }

  /**
   * Fake Test
   * @param expVal
   * @param value
   */
  fakeTest(expVal: any = true, value: any = true) {
    this.expect(expVal).toBe(value);
  }

  /**t
   * Detect changes
   */
  detectChanges() {
    this.fixture.detectChanges();
  }
}
