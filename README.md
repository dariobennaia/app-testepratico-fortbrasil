# App teste prático - (FortBrasil)

- [Demonstração](#Demonstração)
- [Especificações](#Especificações)
- [Descrição](#descri%c3%a7%c3%a3o)
- [Rodando o projeto (desenvolvimento)](#rodando-o-projeto-desenvolvimento)
  - [Localmente (node + yarn)](#localmente-node--yarn)

## Demonstração

Para visualizar a demonstração baixe o aplicativo do Expo.

- Baixe no [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR)
- Baixe na [Apple](https://apps.apple.com/br/app/expo-client/id982107779)

Escanei o [QR code](https://expo.io/@dariosantos/teste-pratico) usando o aplicativo Expo que você baixou e aproveite.

## Especificações

Especificações do projeto

- Node >= 12
- yarn >= 1.21.1
- Expo

## Descrição

App para encontrar lojas feito em React Native.

  
## Rodando o projeto (desenvolvimento)

1. Crie um arquivo [.env](https://www.npmjs.com/package/dotenv) para rodar o
projeto, consulte o `.env-example` para observar quais variáveis podem precisar
ser especificadas.

### Localmente (node + yarn)

2. Crie um .env com as variáveis de ambiente se baseando no arquivo `.env-example`.

3. Siga o procedimento abaixo

```bash
# configure a variavel de ambiente caso vc não tenha
$ export PATH="$(yarn global bin):$PATH"

# modo "watch" (hot reloading)
$ expo start
```
