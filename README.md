# Drag and drop and edit rounded rectangle

## Requirements
Node v18.7.0+

## Description
    1. Editing corner radius by dragging corner handle (all of the corners simultaneously by dragging one corner handle).
    2. Moving rectangles around by dragging them
## Installation
```
git clone git@github.com:AdyOS/rect.git
cd rect
npm install
npm run test
```

## Start application in development mode

```
npm run start
```
...and navigate to http://localhost:9000/

## Configure the reactangles
Create a rectangle object assinged to global widow instanse 
``` window.rectanglesData ```
The example config looks like this:
```
 window.rectanglesData = [
  { id: 0, x: 100, y: 100, width: 200, height: 150, radius: 10 },
  { id: 1, x: 400, y: 150, width: 300, height: 100, radius: 30 },
  { id: 2, x: 150, y: 400, width: 250, height: 150, radius: 20 },
];
```

## API
1. Setting its position on the screen: 
```
rectangle.setPosition(100,200);
```
2. Setting its size: 
```
rectangle.setSize(50, 60);
```
3. Setting the corner radius: 
```
rectangle.setCornerRadius(10);
```
4. Serialising its state to JSON data: 
```
rectangle.toJSON(); // Object returned by that invocation should contain rectangle’s id, x, y, width, height and radius 
```
5. Get rectangle instanse by ID 
```
application.getRectById(1)
```
