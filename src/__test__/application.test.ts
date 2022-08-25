import Application from '../application';

window.rectanglesData = [
  { id: 0, x: 100, y: 100, width: 200, height: 150, radius: 10 },
  { id: 1, x: 400, y: 150, width: 300, height: 100, radius: 30 },
  { id: 2, x: 150, y: 400, width: 250, height: 150, radius: 20 },
];

describe('Application', () => {
  document.body.innerHTML = '<div id="root"></div>';

  it('should retrun rect actural JSON after chaneging dimensions of rect', () => {
    const appliction = new Application();
    const rect = appliction.getRectById(1); 

    rect.setSize(100, 100);
    rect.setPosition(10, 10);
    rect.setCornerRadius(5);
    expect(rect.toJSON()).toEqual({
      id: 1,
      width: 100,
      height: 100,
      x: 10,
      y: 10,
      radius: 5,
    });
  });
});
