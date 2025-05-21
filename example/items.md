:::sandpack
```ts /index.ts
<!--@include: ./items.ts-->
```
```css /styles.css
body{
    background-color: #ccc;
}
.pic , #app{
    position: relative;
    float: left;
    margin-left: 10px;
}
#app img{
    position: relative;
    display: block;
    border: 2px solid #00cd67;
    margin-bottom: -4px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
}

@keyframes show {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
```
:::