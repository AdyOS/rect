import Rect from '../rect';
import { RectProps } from '../rect';

describe('Rect', () => {
  document.body.innerHTML = '<div id="root"></div>';

  it('should raise an error when invalid rect is passed', () => {
    expect(() => new Rect({} as RectProps)).toThrowError(Error);
  });

  describe('public properties', () => {
    const rectData: RectProps = {
      id: 1,
      width: 100,
      height: 100,
      x: 10,
      y: 10,
      radius: 5,
    };
    let rect: Rect;

    beforeEach(() => {
      rect = new Rect(rectData);
    });


    it('should raise an error when invalid position is passed', () => {
      expect(() => rect.setPosition(undefined, undefined)).toThrowError(Error);
    });

    it('should raise an error when invalid border radius is passed', () => {
      expect(() => rect.setCornerRadius(undefined)).toThrowError(Error);
    });

    it('should raise an error when invalid size is passed', () => {
      expect(() => rect.setSize(undefined, undefined)).toThrowError(Error);
    });

    it('should return new values after changing attributes', () => {
      rect.setSize(200, 200);
      rect.setCornerRadius(10);
      rect.setPosition(15, 15);

      expect(rect.toJSON()).toEqual({
        id: 1,
        width: 200,
        height: 200,
        x: 15,
        y: 15,
        radius: 10,
      });
    });

    it('should drag and drop correctly',  () => {
      const newRectPos = { clientX: 100, clientY: 200 };

      const rectElement = document.getElementById('1');
      const mouseDownEvent = new MouseEvent('mousedown', {
        clientX: rectData.x,
        clientY: rectData.y,
      });
      const mouseUpEvent = new MouseEvent('mouseup');
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: newRectPos.clientX,
        clientY: newRectPos.clientY,
      });

      rectElement.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);
      document.dispatchEvent(mouseUpEvent);

      //expect(mockedSpy).toBeCalledTimes(1);

      const xPos = newRectPos.clientX - rectData.x;
      const yPos = newRectPos.clientY - rectData.y;

      expect(rectElement.style.top).toEqual(yPos + 'px');
      expect(rectElement.style.left).toEqual(xPos + 'px');
    });

    it('should resize border radius',  () => {
        const moveDelta = 15;
  
        const cornerElement = document.querySelector('.nw');
        const rectElement = document.getElementById('1');

        const mouseDownEvent = new MouseEvent('mousedown', {
          clientX: rectData.x,
          clientY: rectData.y,
        });
        const mouseUpEvent = new MouseEvent('mouseup');
        const mouseMoveEvent = new MouseEvent('mousemove', {
          clientX: rectData.x + moveDelta,
          clientY: rectData.y + moveDelta,
        });
  
        cornerElement.dispatchEvent(mouseDownEvent);
        rectElement.dispatchEvent(mouseMoveEvent);
        rectElement.dispatchEvent(mouseUpEvent);

        expect(rectElement.style.borderRadius).toEqual(moveDelta * 2 - rectData.radius + 'px');
      });
  });
});
