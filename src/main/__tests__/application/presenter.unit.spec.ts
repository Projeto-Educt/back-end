import { Presenter } from '@/main/application';

describe('Presenter', () => {
  it('Should return data accepting application/json', () => {
    const data = { name: 'John Doe' };
    const acceptHeader = 'application/json';
    const result = Presenter.execute(data, acceptHeader);
    expect(result).toEqual(data);
  });

  it('Should return data accepting default', () => {
    const data = { name: 'John Doe' };
    const acceptHeader = 'text/html';
    const result = Presenter.execute(data, acceptHeader);
    expect(result).toEqual(data);
  });
});
