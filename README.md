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
