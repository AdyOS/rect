import './rect.css';

export type RectProps = {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  radius: number;
};

class Rect {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  radius: number;

  protected domRoot: HTMLElement;
  protected box: HTMLElement;
  protected rect: HTMLElement;
  protected shiftX: number;
  protected shiftY: number;

  protected currentX: number = 0;
  protected currentY: number = 0;
  protected newPosX: number = 0;
  protected newPosY: number = 0;

  protected currentResizer: HTMLElement;
  protected isResizing: boolean = false;

  constructor({ id, width, height, x, y, radius }: RectProps) {
    if (
      isNaN(id) ||
      isNaN(width) ||
      isNaN(height) ||
      isNaN(radius) ||
      isNaN(x) ||
      isNaN(y)
    ) {
      throw new Error('Invalid rectangle data');
    }

    this.id = id;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.domRoot = document.getElementById('root');
    this.createRect();
  }

  public setPosition(x: number, y: number) {
    if (isNaN(x) || isNaN(y)) {
      throw new Error('Invalid position value provided  for Rect');
    }

    this.x = x;
    this.y = y;

    this.box.style.left = x + 'px';
    this.box.style.top = y + 'px';
  }

  public setSize(width: number, height: number) {
    if (isNaN(height) || isNaN(height)) {
      throw new Error('Invalid size value provided for Rect');
    }

    this.height = height;
    this.width = width;

    this.box.style.width = width + 'px';
    this.box.style.height = height + 'px';
  }

  public setCornerRadius(radius: number) {
    if (isNaN(radius)) {
      throw new Error('Invalid border radius value provided for Rect');
    }

    this.radius = radius;
    this.box.style.borderRadius = radius + 'px';
  }

  public toJSON(): RectProps {
    return {
      id: this.id,
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
      radius: this.radius,
    };
  }
  protected createDiv(): HTMLElement {
    return document.createElement('div');
  }

  protected createWrap(): void {
    this.rect = this.createDiv();
    this.rect.classList.add('rect');
    this.rect.setAttribute('id', `${this.id}`);
    this.rect.style.width = this.width + 'px';
    this.rect.style.height = this.height + 'px';
    this.rect.style.left = this.x + 'px';
    this.rect.style.top = this.y + 'px';

    this.domRoot.appendChild(this.rect);
  }
  protected createCorner(className: string): void {
    const corner = this.createDiv();
    corner.classList.add('resizer', className);
    this.rect.appendChild(corner);
  }

  private createRect() {
    this.createWrap();
    this.createCorner('nw');
    this.createCorner('ne');
    this.createCorner('sw');
    this.createCorner('se');

    this.box = this.createDiv();
    this.box.classList.add('box');

    this.rect.appendChild(this.box);
    this.createRectEvents();
  }

  protected onDragMove(event: MouseEvent): void {
    event.preventDefault();

    // calculate the new cursor position:
    this.newPosX = this.currentX - event.clientX;
    this.newPosY = this.currentY - event.clientY;
    this.currentX = event.clientX;
    this.currentY = event.clientY;

    // update rect position
    const x = this.rect.offsetLeft - this.newPosX;
    const y = this.rect.offsetTop - this.newPosY;
    this.setPosition(x, y);

    this.rect.style.top = this.y + 'px';
    this.rect.style.left = this.x + 'px';
  }

  protected onDrop(event: MouseEvent): void {
    // stop moving when mouse button is released and clear event listeners
    document.removeEventListener('mouseup', this.onDrop, false);
    document.removeEventListener('mousemove', this.onDragMove, false);
    
  }

  protected onDragStart(event: MouseEvent): void {
    event.preventDefault();
    // get the mouse cursor position at startup:
    this.currentX = event.clientX;
    this.currentY = event.clientY;
    this.onDrop = this.onDrop.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    document.addEventListener('mouseup', this.onDrop, false);
    document.addEventListener('mousemove', this.onDragMove, false);
  }

  protected createRectEvents(): void {
    this.onDragStart = this.onDragStart.bind(this);
    this.rect.addEventListener('mousedown', this.onDragStart, false);
    this.initResizeBorders();
  }

  protected onResizeMouseMove(event: MouseEvent & { target: HTMLElement }) {
    event.preventDefault();
    const rect = this.rect.getBoundingClientRect();

    // calculate new border radius/*
    const x = Math.round(Number(event.clientX - rect.left));
    const y = Math.round(Number(event.clientY - rect.top)); 
    
    let radius = y;

    if (this.currentResizer.classList.contains('sw')) {
      radius = x;
    } else if (this.currentResizer.classList.contains('se')) {
      radius = rect.width - x;
    }

    this.setCornerRadius(radius);
    this.rect.style.borderRadius = this.radius + 'px';
  }

  protected onResizeMouseUp() {
    this.rect.removeEventListener('mousemove', this.onResizeMouseMove, false);
    this.rect.removeEventListener('mouseup', this.onResizeMouseUp, false);

    // restore dragging events
    this.rect.addEventListener('mousedown', this.onDragStart, false);
    this.isResizing = false;
  }

  protected onResizeMouseDown(event: MouseEvent & { target: HTMLElement }) {
    this.currentResizer = event.target;
    event.preventDefault();
    this.isResizing = false;

    this.currentX = event.clientX;
    this.currentY = event.clientY;
    this.onResizeMouseMove = this.onResizeMouseMove.bind(this);
    this.onResizeMouseUp = this.onResizeMouseUp.bind(this);

    // remove listener for dragging
    this.rect.removeEventListener('mousedown', this.onDragStart, false);

    this.rect.addEventListener('mousemove', this.onResizeMouseMove, false);
    this.rect.addEventListener('mouseup', this.onResizeMouseUp, false);
    document.addEventListener('mouseup', this.onResizeMouseUp, false);
  }

  protected initResizeBorders(): void {
    const resizers = document.querySelectorAll('.resizer');
    this.onResizeMouseDown = this.onResizeMouseDown.bind(this);

    for (let resizer of resizers) {
      (resizer as HTMLElement).addEventListener(
        'mousedown',
        this.onResizeMouseDown,
        false
      );
    }
  }
}

export default Rect;
