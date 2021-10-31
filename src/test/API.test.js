import subject from './subject'
describe('subject', () => {
  const mySpy = jest.spyOn(subject.default, 'foo', 'get')

  it('foo returns true', () => {
    expect(subject.foo).toBe(true)
  })

  it('foo returns false', () => {
    mySpy.mockReturnValueOnce(false)
    expect(subject.foo).toBe(false)
  })
})


// test('query Note', async () => {

//   expect(1+2).toBe(3);
// });