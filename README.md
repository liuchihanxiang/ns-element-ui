<p align="center">
    <a>
        <img width="200" src="./assets/logo.png">
    </a>
</p>

<h1>
ns-element-ui
    <h3>A lightweight Vue.js UI toolkit</h3>
</h1>

# Install

Run the command below in your terminal to install ns-element-ui first
```
npm install ns-element-ui --save
```

# Usage

## Global Use
Import in your entry script file and register it
```javascript
import NS from 'ns-element-ui'
import "ns-element-ui/lib/styles/ns-element-ui.css"

Vue.use(NS)
```

### Example

```html
<l-button>click</l-button>
```

## On-demand Loading

Firstly, you should install `babel-plugin-component` in your project.
```
npm install babel-plugin-component
```

Configure your `.babelrc` file like this

```json
{
    "plugins": [
        ["component", {
            "libraryName": "ns-element-ui",
            "libDir": "lib",
            "styleLibrary": {
                "name": "styles",
                "base": false, // no base.css file
                "path": "[module].css"
            }
        }]
    ]
}
```

The you can import component on demand, and you don't need to care about importing styles, the babel plugin will do it automaticly.

```javascript
import Vue from 'vue'
import { NsDialog } from 'ns-element-ui'

Vue.component('ns-dialog', NsDialog)
```
