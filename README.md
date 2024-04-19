## 概览

由于evm是构建在cosmos sdk上面，导致有两种类型的交易。一种是cosmos类型的交易，用于完成链的一些功能，比如使用cosmos类型交易完成一些staking相关的功能。而智能合约相关交易通过evm类型交易完成。这导致下面的一些问题：

我们需要开发两个类型的浏览器来显示相关交易以及区块信息。比如常见的做法是使用[bigdipper](https://testnet.bigdipper.live/evmos)查看cosmos相关信息，使用blockscout查看evm相关信息。

我们需要维护一个JavaScript库来完成cosmos类型的交易。比如使用[evmosjs](http://github.com/evmos/evmosjs)来完成staking相关的交易。

用户需要安装两个类型的钱包，比如keplr以及metamask。

如果我们将所有cosmos类型的交易使用evm交易实现，那么不仅交易变得简单，给用户带来更好的体验，我们也不在需要维护bigdipper, evmosjs等相关工具。

## 使用步骤
* 安装Node.js，安装v20.x版本。
* 在项目目录执行npm i安装依赖。
* 执行 `cp cfg.default.json cfg.json`，生成一份cfg.json文件。
* 在contracts目录，执行pwd命令获取到绝对路径，比如为`/Users/root/Code/ethos/precompile/contracts`,将此路径更新到cfg.json的contracts字段。其他字段依据需求进行更新。
* 调用合约，比如在staking目录，使用 `node 07_validators.js` 即可查看所有验证人列表。