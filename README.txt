Autor: Leonardo Sensiate

Instruções para compilar executar o programa:

Primeiro deve se instalar alguns softwares em seu computador:
- Deve-se instalar o Node.js. (https://nodejs.org/en/).

Recomenda-se instalar a biblioteca Nodemon (https://www.npmjs.com/package/nodemon)
**para maior praticidade na execução dos testes**

Tendo esses softwares instalados, faça o download do repositório

Após baixar o .zip, extraia a pasta para o diretório de sua preferência.

Depois, abra o prompt de comando ("cmd.exe" no Windows) e navegue até 
o diretório com os arquivos. 

Após isso, digite o seguinte comando no prompt:

                            node index.js 
          (ou nodemon index.js - caso tenha instalado  nodemon)

Com isso, o código irá compilar. Espere até que a compilação esteja completa.

Uma vez que esteja compilado, no prompt de comando irá aparecer a porta na qual a aplicação está sendo executada.
Por padrão, é o endereço http://localhost:3000/

Em seu navegador padrão, acesse  este endereço e você estará na tela inicial.

EXPLORAÇÃO:

Para exploração da API, recomenda- se a utilização do POSTMAN

As seguintes operações foram implementadas:

- Criar um User (http://localhost:3000/api/users)
- Recuperar um User (http://localhost:3000/api/users/:_id)
- Atualizar um User (http://localhost:3000/api/users/:_id)
- Deletar um User (http://localhost:3000/api/users/:_id)

- Criar uma Empresa (http://localhost:3000/api/empresas)
- Recuperar uma Empresa (http://localhost:3000/api/empresas/:_id)
- Atualizar uma Empresa (http://localhost:3000/api/empresas/:_id)
- Deletar uma Empresa (http://localhost:3000/api/empresas/:_id)

- Adicionar um User em uma Empresa (http://localhost:3000/api/empresas/:_id_empresa/users)
- Remover um User de uma Empresa (http://localhost:3000/api/empresas/:_id_empresa/users/:_id_usuario)

- Criar uma Planta em uma Empresa (http://localhost:3000/api/empresas/:_id_empresa/plantas)
- Remover uma Planta de uma Empresa (http://localhost:3000/api/empresas/:_id_empresa/plantas/:_id_planta)

NAVEGAÇÃO:

Para acessar a lista de usuários, acesse: http://localhost:3000/api/users

Para acessar um usuário específico, acesse: http://localhost:3000/api/users/ID_USUÁRIO

Para acessar a lista de empresas, acesse: http://localhost:3000/api/empresas

Para acessar uma empresa específica, acesse: http://localhost:3000/api/empresas/ID_EMPRESA

De maneira semelhante, é possível ter acesso aos usuários de uma determinada empresa e as plantas da mesma,
através dos endereços:

http://localhost:3000/api/empresas/ID_EMPRESA/users (todos usuários)

http://localhost:3000/api/empresas/ID_EMPRESA/users/ID_USUÁRIO (usuário específico)

http://localhost:3000/api/empresas/ID_EMPRESA/plantas (todas as plantas)

http://localhost:3000/api/empresas/ID_EMPRESA/plantas/ID_PLANTA (planta específica)