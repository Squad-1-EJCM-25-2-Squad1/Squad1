# Style Marketplace

## Download 

Para que seja possível a execução dos arquivos deste repositório, o usuário deve clonar através da ferramenta git. Abrindo o terminal do seu sistema operacional ou o GitBash, insira o seguinte comando na pasta desejada:

``` bash
$ git clone https://github.com/Squad-1-EJCM-25-2-Squad1/StyleMarketplace.git
$ cd StyleMarketplace
```

## Instalação 
Para o correto uso do aplicativo, terão de ser feitas as instalações as dependências nas pastas de back e front

### Geral

``` bash
$ npm install -g lemon-pie-cli
```

### Pasta back
Abra o seu terminal e execute o comando para instalar as dependências da pasta back

``` bash
$ cd back
$ npm install
```

### Pasta front
Agora, execute os comandos abaixo para instalar as dependências da pasta front

``` bash
$ cd ..
$ cd front
$ npm install
```


## Configuração
Após a instalação, algumas preparações anteriores devem ser realizadas na pasta `back`

Deve ser criado o arquivo .env com base no arquivo .env.example e colocadas as suas credenciais do banco criado no PgAdmin4.
Na linha abaixo, PASSWORD deve ser substituída pela sua senha e DATABASE pelo nome do banco.

DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/DATABASE?schema=public"

Com os comandos abaixo, será feita a configuração da pasta `back`:

``` bash
$ cd ..
$ cd back
$ npm run migrate
$ npm run seed
$ npm run keys
```


## Uso
Ainda na pasta `back`, execute o seguinte comando para servir o aplicativo em um servidor customizado para posterior execução no front-end:

``` bash
npm run dev
```

Com as configurações feitas, mude a seguir para a pasta `front`, para a execução do aplicativo utilizando os seguintes comandos:

``` bash
cd ..
cd front
npm run dev
```


## Arquitetura
- [Figma](https://www.figma.com/design/JIYx2W0f7qp0Y0sfNTtu36/Trabalho-final---TT-2025.2?node-id=0-1&p=f&t=UpddBrdwlc9SgPvH-0)
