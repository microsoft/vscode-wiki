import Hello from './Hello.vue';

describe('Hello', () => {
  it('should be a hello', () => {
    expect(Hello.name).toEqual('Hello');
  });
});
