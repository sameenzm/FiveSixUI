# FitArea--区域贴合工具

此组件为区域贴合组件，主要用于画地图区域（如画商圈、画配送范围）时将正在绘制的区域的点自动吸附到小于阈值（单位：米）的已有的区域边界；

## Function
1. 画出完整的闭合商圈；
2. 自动吸附小于阈值的边界；
3. 能够在编辑过程中提供吸附开关；
4. 支持画区域不重叠；
5. 支持微调；

## Props
1. minDistance, 数字，单位米;
2. existArea, 多个区域，二维数组，如下所示：

```js
[
  [
    {longitude: 116.210667, latitude: 40.76959},
    {longitude: 115.555263, latitude: 40.49627},
    {longitude: 116.316882, latitude: 39.960742}
  ],[
    {longitude: 116.31257, latitude: 39.921133},
    {longitude: 116.342465, latitude: 39.912057},
    {longitude: 116.375523, latitude: 39.946583},
    {longitude: 116.365749, latitude: 39.964724}
  ],[
    {longitude: 116.365749, latitude: 39.964724},
    {longitude: 115.832013, latitude: 40.486339},
    {longitude: 116.342465, latitude: 39.912057},
    {longitude: 116.375523, latitude: 39.946583},
    {longitude: 116.365749, latitude: 39.964724}
]]
```

3. overlap， 是否允许重叠，默认是不允许；


## Tips
1. 调研当前百度地图及百度地图第三方类库提供的方法，当前是否有类似的解决方案；
2. 贴合到点 -> 贴合到边界；
3. 在边界上微调；





