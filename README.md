# React Native 学习项目

## 项目创建

```
npx react-native init MyRNDemoApp
```

参考：[Creating a new application](https://reactnative.dev/docs/environment-setup#creating-a-new-application)

## 配置

### Xcode 相关配置

修改 `Podfile`，如果不使用 `Flipper`，注释 `use_flipper!()` 不安装该调试工具；增加代码消除 Xcode 中的警告，具体如下：

``` ruby
# 消除所有警告
inhibit_all_warnings!

# ...

target 'MyRNProject' do
  # ...

  # Enables Flipper.
  #
  # Note that if you have use_frameworks! enabled, Flipper will not work and
  # you should disable the next line.
#  use_flipper!()

  post_install do |installer|
    react_native_post_install(installer)
    # 消除部分警告
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        if config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'].to_f < 9.0
          config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '9.0'
        end
      end
    end
  end
end
```

### 支持 TypeScript

```
yarn add -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer
```

创建 `tsconfig.json` 文件，写入：

``` json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

创建 `jest.config.js` 文件并写入：

``` javascript
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

参考：[Adding TypeScript to an Existing Project](https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project)

## ESLint 相关配置

### 安装 ESLint

如果是一个空项目，我们需要安装 ESLint，不过一个新的 React Native 项目创建好之后，从 `package.json` 文件可以看到，其已经安装了 ESLint：

``` json
"devDependencies": {
  ...
  "@react-native-community/eslint-config": "^2.0.0",
  "eslint": "7.14.0",
  ...
},
```

这里面除了 ESLint 本身，还安装了一个 [@react-native-community/eslint-config](https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community#readme)，这是 React Native 官方提供的一个 ESLint 的规则。

项目默认就是使用的这个规则，其配置在 `.eslintrc.js` 文件中：

```
module.exports = {
  root: true,
  extends: '@react-native-community',
};

```

我们也可以对 `.eslintrc.js` 进行配置增加或修改规则。

### VSCode 中关于 ESLint 的相关配置

首先，VSCode 需要安装名为 ESLint 的插件。

之后，需要在 `settings.json` 中进行配置：

``` json
"eslint.packageManager": "yarn",
// 开启 ESLint 作为格式化器
"eslint.format.enable": true,
// 开启不同语言使用该格式化器
"[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"[javascriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},

// 文件保存自动格式化，可选
"editor.formatOnSave": true,
```

其中 `"eslint.format.enable": true` 使得 VSCode 使用 `Shift+Alt+F` 格式化代码时可以选择使用 ESLint 插件提供的格式化器，该格式化器会按照配置的 ESLint 规则去格式化代码。

之后的 `"editor.defaultFormatter": "dbaeumer.vscode-eslint"` 设置了 `.js`、`.jsx`、`.ts`、`.tsx` 文件的默认格式化器为 ESLint 插件提供的格式化器（因为 VSCode 默认提供了一个格式化器，如果没设置在第一次使用 `Shift+Alt+F` 时会提示选择）。

这些配置最好在同时在项目（Workspace）的 settings.json 中设置，多人开发时都可以享用。

### 为除了 JS 文件外的格式添加 ESLint 支持

在 .eslintrc.js 增加配置：

```
parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
overrides: [
  {
    files: ['*.ts', '*.tsx'],
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
  },
],
```

其实创建项目默认的 `@react-native-community/eslint-config` 已经对 TypeScript 有了较好的支持，其中也包含了 `@typescript-eslint` 的依赖，只是实践中发现上述规则对类型要求会更加严格（比如使用 any 会警告提示），后续实践可继续观察这样写的区别。

由于该库已经安装了，我们无需重复安装，不过也可以手动再安装一遍（[Installation](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md#installation)）：

```
$ yarn add -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
$ npm i --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

参考：[TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint)