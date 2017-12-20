'usr strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerJustHelpers } = require('../../src/helpers/just_helpers')

registerJustHelpers(Handlebars)

test('helpers > justHelpers > eq', (assert) => {
  // False stuff
  const notEqStr = `{{eq '3' '123'}}`
  const notEqNumber = `{{eq 399 200}}`

  const templateFalse1 = Handlebars.compile(notEqStr)
  const templateFalse2 = Handlebars.compile(notEqNumber)
  const resultFalse1 = templateFalse1({})
  const resultFalse2 = templateFalse2({})

  // True
  const eqString = `{{eq '3' '3'}}`
  const eqNumber = `{{eq 42 42}}`

  const templateTrue1 = Handlebars.compile(eqString)
  const templateTrue2 = Handlebars.compile(eqNumber)
  const resultTrue1 = templateTrue1({})
  const resultTrue2 = templateTrue2({})

  assert.same(resultFalse1, 'false', 'should return `false` String')
  assert.same(resultFalse2, 'false', 'should return `false` String')

  assert.same(resultTrue1, 'true', 'should return `true` String')
  assert.same(resultTrue2, 'true', 'should return `true` String')

  assert.end()
})

test('helpers > justHelpers > eq with template', (assert) => {
  const textFalse = `
    {{#if (eq gradur 'gradur')}}
      Hello
    {{else}}
      NotEqual
    {{/if}}
  `

  const textTrue = `
    {{#if (eq 'gradur' 'gradur')}}
      Hello
    {{else}}
      NotEqual
    {{/if}}
  `

  const templateFalse = Handlebars.compile(textFalse)
  const templateTrue = Handlebars.compile(textTrue)
  const resultFalse = templateFalse({})
  const resultTrue = templateTrue({})

  assert.true(resultFalse.includes('NotEqual'), 'should contains NotEqual')
  assert.false(resultFalse.includes('Hello'), 'should NOT contains Hello')

  assert.true(resultTrue.includes('Hello'), 'should contains Hello')
  assert.false(resultTrue.includes('NotEqual'), 'should NOT contains NotEqual')

  assert.end()
})

test('helpers > justHelpers > eqw', (assert) => {
  const text = `{{eqw 3 '3'}}`

  const template = Handlebars.compile(text)
  const result = template({})

  assert.same(result, 'true', 'should return `true` for `3` eqw 3')

  assert.end()
})

test('helpers > justHelpers > gte (classic and weak)', (assert) => {
  const text = `{{gte snow.howmany.metre 5}}`
  const template = Handlebars.compile(text)

  const resultString = template({ snow: { howmany: { metre: '5' } } })
  const resultNumber = template({ snow: { howmany: { metre: 5 } } })

  const resultFalse1 = template({ snow: { howmany: { metre: 2 } } })
  const resultFalse2 = template({ snow: { howmany: { metre: '2' } } })

  assert.equal(resultString, 'true')
  assert.equal(resultNumber, 'true')

  assert.equal(resultFalse1, 'false')
  assert.equal(resultFalse2, 'false')

  assert.end()
})

test('helpers > justHelpers > gte Template (classic and weak)', (assert) => {
  const text = `
    {{#if (gte snow.howmany.metre 5)}}
      Snow
    {{else}}
      Fail
    {{/if}}
  `

  const template = Handlebars.compile(text)
  const resultString = template({ snow: { howmany: { metre: '10' } } })
  const resultNumber = template({ snow: { howmany: { metre: 10 } } })

  assert.true(resultString.includes('Snow'))
  assert.true(resultNumber.includes('Snow'))

  assert.end()
})
