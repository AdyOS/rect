import Rect from './components/rect/';
import { RectProps } from './components/rect';

export type RectMap = {
    [key: string]: Rect
}

class Application { 
    private rectMap: RectMap = {};

    constructor() {
        const rectConfig = window.rectanglesData;

        for (const rect of rectConfig) {
            this.setRect(rect)
        }
    }

    public getRectById(id: number): Rect | null {
        if (this.rectMap[id]) {
            return this.rectMap[id];
        }

        return null;
    }

    private setRect(rect: RectProps): void {
        this.rectMap[rect.id] = new Rect(rect);
    }
}

export default Application;