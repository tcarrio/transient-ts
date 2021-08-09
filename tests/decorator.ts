import { test } from 'uvu'
import assert from 'uvu/assert'
import { transient } from '../src/decorator'

class SingleTransientClass {
  @transient()
  public ignored = 0

  public name = 'single'
}

class DoubleTransientClass {
  @transient()
  public a = 'a'

  @transient()
  public b = 'b'

  public name = 'double'
}

class ChildTransientClass extends SingleTransientClass {
  public name = 'child'
}

test('applies transient to a single property', () => {
  const expectedOutput = '"{\\"name\\":\\"single\\"}"'

  const actualOutput = JSON.stringify(new SingleTransientClass())

  assert.equal(expectedOutput, actualOutput)
})

test('applies transient to multiple properties', () => {
  const expectedOutput = '"{\\"name\\":\\"double\\"}"'

  const actualOutput = JSON.stringify(new DoubleTransientClass())

  assert.equal(expectedOutput, actualOutput)
})

test('applies transient through inheritance', () => {
  const expectedOutput = '"{\\"name\\":\\"child\\"}"'

  const actualOutput = JSON.stringify(new ChildTransientClass())

  assert.equal(expectedOutput, actualOutput)
  console.log('assertion ran')
})

test.run()
