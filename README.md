# qunaer-ticket
去哪儿网站的一个小程序火车订票、选票页面，使用react技术栈，主要是练习hooks的使用。express搭建本地模拟服务器。
/*

    ###
    1>使用React官网的create-react-app脚手架工具搭建demo的基本框架。
    ###
    2>由于官方的脚手架比较简单，默认的CSS样式是使用CSS，SCSS，我习惯使用LESS，所以还需要自己手动配置一下LESS相关的样式。
    ###
    3>有些小的UI样式组件，个人比价懒，所以又把AntD装进去了，其实自己手写的话，打包文件会小很多。
    ###
    4>项目全部使用的是函数组件，没有使用Class组件，现在函数组件完全可以替代Class组件，有了Hooks，组件代码逻辑写起来会更加清晰简洁。
      Hooks确实好用。官方也说明了为什么要使用Hooks，主要原因还是组件之间的状态服用比较困难，不如在组件中，自己新建一个状态，由事件
      驱动更改状态。
    ###
    5>我还用了Redux来管理状态，因为这个demo涉及到的状态还比较多，不使用的Redux的话，组件中会充斥大量的数据状态，组件就比较庞大。而且
      有了Redux之后，数据和组件之间就可以很清晰的分离，需要什么数据，就去Redux里面获取，把状态定义在Redux之中，派发Action去更改状态。
      如果组件的状态比较简单，其实也可以使用useReduce钩子函数，能代替部分Redux的功能。
    ###
    6>最近实习事情比较多，只有周末才能提交一下代码的样子了 = =|
    7>日期组件这里写起来有点麻烦，首先日期格式化，计算出三个月的天数，当前日期，以及对应的日期索引。日期这块，组件拆分的比较细，每个周对应了一个组件，每一天对应一个组件。数据结构是二维数组，这样设计的意义是，拿到每个月1号对应的索引，便于插入空元素，使之与表头的周几一一对应。其实也可以不这样设计，一样可以做出想要的效果。最麻烦的就是预约的模块，有点绕，感觉我自己写的逻辑应该是有点问题的。到了2月份这个比较特殊的月份，日期应该显示会出点bug。
    ````
*/
