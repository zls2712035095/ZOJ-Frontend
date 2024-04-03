# zoj-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### 根据后端生成前端代码
```
openapi --input http://localhost:8081/api/v2/api-docs --output ./generated --client axios
```
> 在[OpenAPI.ts](generated%2Fcore%2FOpenAPI.ts)的OpenAPIConfig中的BASE可能生成出多余字段，根据需要进行修改（BASE和WITH_CREDENTIALS）
### error Delete cr prettier/prettier报错，LF和CRLF冲突问题解决
*LF和CRLF冲突*： 使用Windows系统进行开发时，时常一拉代码，就会出现大量的`error Delete cr prettier/prettier`报错，因为git在维护版本库的时候统一使用的是LF，这样就可以保证文件跨平台的时候保持一致，在Linux下默认的换行符也是LF，那就不存在什么问题，但是在Windows系统环境下拉取代码时，git会自动将代码当中与你系统不同的换行方式转化为你当前系统的换行方式，从而造成这样的冲突。

- 解决方法： 修改git全局配置，禁止git自动将LF转换为CRLF。
```
git config --global core.autocrlf false
```
### 添加了Monaco Editor
```
npm install monaco-editor
https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
