# Chart

Charts are very important for an enterprise dashboard which provide a visual reprentation of data in various types, clarify information effectively, allow users to perceive information quicky,.. In `laravue`, we recommend full-featured [ECharts](https://echarts.apache.org/en/index.html).
You can find many awsome examples from community: http://gallery.echartsjs.com/explore.html

ECharts supports the import of webpack, you can import the whole ECharts `var echarts = require('echarts')`. However, ECharts is not small, if you use only a few features or chart types, then it's recommended to import individually.

```js
// Import on demand -- import ECharts main module
var echarts = require('echarts/lib/echarts');
// Import bar
require('echarts/lib/chart/bar');
// Import tooltip&title
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

// Import all ECharts module
var echarts = require('echarts')
```

[Use ECharts with webpack](https://ecomfe.github.io/echarts-doc/public/en/tutorial.html#Use%20ECharts%20with%20webpack)

[Include ECharts charts and components on demand](https://ecomfe.github.io/echarts-doc/public/en/tutorial.html#Use%20ECharts%20with%20webpack)

Next we will declare the initialization of ECharts in vue. Because ECharts initialization must be bound to dom, we can only initialize it during vue's mounted lifetime.

```js
mounted() {
  this.initCharts();
},
methods: {
  initCharts() {
    this.chart = echarts.init(this.$el);
    this.setOptions();
  },
  setOptions() {
    this.chart.setOption({
      title: {
        text: 'ECharts Example'
      },
      tooltip: {},
      xAxis: {
        data: ["Shirt", "Sweater", "Chiffon Shirt", "Pants", "High Heels", "Socks"]
      },
      yAxis: {},
      series: [{
        name: 'Volumes',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
}
```

ECharts is configured - quite simple.

In case you want to load data remotely (from API for example) then dynamically show on chart, we can trigger the setOptions method with `watch`

```js
// The first watch options change Using the depth of vue watcher, options are re-setOption
watch: {
  options: {
    handler(options) {
      this.chart.setOption(this.options)
    },
    deep: true
  },
}
// The second only watch data changes trigger ECharts only when the data changes
watch: {
  seriesData(val) {
    this.setOptions({series:val})
  }
}
```

Depends on your business, you can decide to show ECharts in the suitable way.

## Demo

![](https://wpimg.wallstcn.com/137aeadd-ad0e-4b21-badd-c53f96b7482b.gif)

::: tip Code
`@/views/dashboard/admin/components`
:::

## Others

There are many great libraries for charts, such as [d3](https://github.com/d3/d3), [Chart.js](https://github.com/chartjs/Chart.js), [chartist-js](https://github.com/gionkunz/chartist-js). Integrating them is not too hard.