import basecss from './scss/index.scss'

// 引入工具库
import app from './app/app.js'

import vueComponents from './components/components.js'
import vueFilters from './filters/filters.js'

Vue.mixin({
    components: vueComponents,
    filters: vueFilters
});

// 解决在移动设备上键盘弹出输入的各种问题
app.listenKeyboard();

export default app
