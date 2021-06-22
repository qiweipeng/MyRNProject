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

### 为 Git 提交增加 ESLint 检查

为了保证每次 Git 提交时代码是符合 ESLint 规则的，否则无法提交。

#### 安装 husky（v6.x） 和 lint-staged

```
$ yarn add --dev husky
$ yarn add --dev lint-staged
```

之后使用

```
$ npm set-script prepare "husky install" && npm run prepare
```

该命令会在 package.json 中添加 `"prepare": "husky install"`，并会创建 `.husky` 文件夹。

之后使用

```
npx husky add .husky/pre-commit "yarn lint-staged"
```

该命令会在 `.husky` 文件夹下创建 `pre-commit` 文件，并写入 `yarn lint-staged` 命令。

同时，在 package.json 中添加

```
"lint-staged": {
  "*.js|*.jsx|*.ts|*.vue|*tsx": [
    "eslint",
    "eslint --fix",
    "git add"
  ]
}
```

#### 安装 husky v4 和 lint-staged

如果安装 husky v4 版本，则执行

```
$ yarn add --dev husky@4
$ yarn add --dev lint-staged
```

之后在 package.json 中添加

```
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.js|*.jsx|*.ts|*.vue|*tsx": [
    "eslint",
    "eslint --fix",
    "git add"
  ]
}
```

参考：[husky](https://typicode.github.io/husky/#/)，[lint-staged](https://github.com/okonet/lint-staged)

## Reat Native 理解

### React Native 与本地的桥接

在 iOS 项目的 `AppDelegate.m` 中，RN 在应用启动后做了三件事：

第一是 `InitializeFlipper`，初始化 Flipper，这个是一个调试工具，并且只会在 Debug 模式下才会加载，如果不使用，可以在 `Podfile` 中注释掉 `use_flipper!()` 这行代码以加快编译速度。

第二是创建 `RCTBridge` 这个类的对象，并设置代理。这决定了 RN 的内容如何加载到 iOS 项目中，在 Debug 环境下是实时加载的，而在 Release 环境下会打包到 `main.jsbundle` 中去。

``` objc
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
```

第三是将创建一个 `RCTRootView` 的视图对象，并将这个视图作为一个 iOS 的控制器的根视图，以把 RN 的内容显示出来。

这其中 `RCTRootView` 对象的创建需要指定 `moduleName`：

``` objc
RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"MyRNDemoApp" initialProperties:nil];
```

这里的字符串 `moduleName` 对应到 RN 中就是 index.js 中的 `AppRegistry.registerComponent(appName, () => App);` 的 `appName`。

`AppRegistry.registerComponent(appName, () => App);` 中的 `App` 就是将要作为 `RCTRootView` 显示的那个根组件，一般会是 `App.js`。

也就是说，我们在 index.js 中可以使用该方法注册多个 `component`，然后提供给 iOS 中原生视图的不同控制器中，达到 React Native 与原生混编的目的。

### 如何将 React Native 添加到现有到 iOS 项目中

最简便的方式是先创建一个完整的 RN 项目，再将 RN 项目中的 `ios` 文件夹中的内容替换为现有的项目。

下面介绍如何替换：

1. 移除 RN 项目 `ios` 文件夹内容，将现有项目所有内容移动到 RN 项目的 `ios` 文件夹中；
2. 修改 `Podfile` 文件，添加如下内容：

``` ruby
inhibit_all_warnings!

require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '10.0'

target 'MyRNProject' do
  config = use_native_modules!

  use_react_native!(
    :path => config[:reactNativePath],
    # to enable hermes on iOS, change `false` to `true` and then install pods
    :hermes_enabled => false
  )

  # Enables Flipper.
  #
  # Note that if you have use_frameworks! enabled, Flipper will not work and
  # you should disable the next line.
#  use_flipper!()

  post_install do |installer|
    react_native_post_install(installer)
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

3. 执行 `pod install`；
4. 参照 RN 中原有 iOS 项目的 `AppDelegate` 中的方式修改现有项目（当然也可以只在特定控制器引入 RN）；
5. 在 `Target - Build Phases` 中参照 RN 原有 iOS 项目添加 `Start Packager` 和 `Bundle React Native code and images` 脚本：

```
// Start Packager
// 不勾选 Show environment variables in build log
export RCT_METRO_PORT="${RCT_METRO_PORT:=8081}"
echo "export RCT_METRO_PORT=${RCT_METRO_PORT}" > "${SRCROOT}/../node_modules/react-native/scripts/.packager.env"
if [ -z "${RCT_NO_LAUNCH_PACKAGER+xxx}" ] ; then
  if nc -w 5 -z localhost ${RCT_METRO_PORT} ; then
    if ! curl -s "http://localhost:${RCT_METRO_PORT}/status" | grep -q "packager-status:running" ; then
      echo "Port ${RCT_METRO_PORT} already in use, packager is either not running or not running correctly"
      exit 2
    fi
  else
    open "$SRCROOT/../node_modules/react-native/scripts/launchPackager.command" || echo "Can't start packager automatically"
  fi
fi

// Bundle React Native code and images
set -e

export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```
