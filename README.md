# Webpack 4 + Bootstrap 4 + Handlebars


Static site generator built with Webpack, Bootstrap and Handlebars.

![Webpack 4 + Bootstrap 4 + Handlebars](src/assets/images/screenshot.png?raw=true)

### Demo

[https://webpack-handlebars-bootstrap.netlify.com/](https://webpack-handlebars-bootstrap.netlify.com/)

### Installation

```
git clone https://github.com/statickidz/webpack-handlebars-bootstrap.git your-app-name
cd your-app-name
yarn install
```

### Run development

```
yarn start
```

### Build Static site for production

```
yarn build
```

### Netlify Deploy Build settings

- Add your repository normally
- Build command: webpack --config webpack-prod.config.js --colors --optimize-minimize
- Publish directory: dist

### Features:

- Static-site
- SEO friendly
- Webpack 4
- axios
- BrowserSync with localtunnel, xip.io, ...
- Hot Module Replacement
- ES6 Support via [babel-loader](https://github.com/babel/babel-loader)
- SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
- Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)



### TODOS

- [ ] handerbars 的helper， 先用handerbars之后再用其它模板引擎
- [ ] 配置启动变量，只打包一个页面
- [ ] 数据处理方式
- [ ] 样式处理，搞点mixin?，要不要放进来呢
- [ ] 引入redux, 考虑更新机制
- [ ] 一些简单事件绑定 click 之类的

### THINKS

This project was forked from [statickidz/webpack-handlebars-bootstrap](https://github.com/statickidz/webpack-handlebars-bootstrap), thinks you giving!
