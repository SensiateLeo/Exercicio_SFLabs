const Joi = require('joi'); //Para realizar validações de maneira mais ágil
const express = require('express');

const app = express();

app.use(express.json());

//Variáveis Empresas
let empresas = [
    {
        "_id": "SFLABS",
        "nome": "SF Labs",
        "cnpj": "95.922.248/0001-16",
        "cep": "13560-460",
        "endereco": "Rua Alfredo Pereira Lopes",
        "numero": "1717",
        "cidade": "São Carlos",
        "estado": "SP",
        "users": [],
        "empresa": [
            {
                "planta": "PLANTA_1"
            },
            {
                "planta": "PLANTA_2"
            }
        ]
    },
    {
        "_id": "PARQTEC",
        "nome": "SF Labs",
        "cnpj": "16.685.925/0001-53",
        "cep": "13560-460",
        "endereco": "Rua Alfredo Pereira Lopes",
        "numero": "1717",
        "cidade": "São Carlos",
        "estado": "SP",
        "users": [],
        "empresa": [
            {
                "planta": "PLANTA_1"
            },
            {
                "planta": "PLANTA_2"
            }
        ]
    }
]

//Variáveis Usuários
let users = [{
    "_id": "jhonathan.viudes",
    "nome": "Jhonathan Viudes",
    "email": "jv@gmail.com",
    "cpf": "346.206.720-32",
    "role": 2,
    "empresas": [],
},
{
    "_id": "gustavo.tamanaka",
    "nome": "Gustavo Tamanaka",
    "email": "gustavo@gmail.com",
    "cpf": "659.702.880-55",
    "role": 4,
    "empresas": [],
}]

// Setando o PORT para utilização
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Esquemas para validação
const schemaUser = {
    _id: Joi.string().min(6).required(),
    nome: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    cpf: Joi.string().min(13).max(15).required(),
    role: Joi.number().options({convert: true}).required(),
    empresas: Joi.array()
};

const schemaPlanta = {
    planta: Joi.string().min(3).required()
};

const schemaEmpresa = {
    _id: Joi.string().min(6).required(),
    nome: Joi.string().min(3).required(),
    cnpj: Joi.string().min(14).max(20).required(),
    cep: Joi.string().min(9).max(10).required(),
    endereco: Joi.string().required(),
    numero: Joi.number().options({convert: true}).required(),
    cidade: Joi.string().required(),
    estado: Joi.string().min(2).max(2).required(),
    users: Joi.array().items(schemaUser),
    empresa: Joi.array().items(schemaPlanta)
};

//Tela Inicial
app.get('/', (req,res) => {
    res.send('Exercício - SF Labs');
});


/////////Usuários/////////////

app.get('/api/users', (req,res) =>{
    //retorna lista de usuários
    res.send(users);
});

//Criar User
app.post('/api/users/', (req,res) => {

    //valida as entradas
    const { error } = Joi.validate(req.body, schemaUser); //result.error
    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = {
        _id: req.body._id,
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        role: String(req.body.role),
        empresas: req.body.empresas
    };
    //cria o usuário
    users.push(user);
    res.send(user);
});

//Recuperar User
app.get('/api/users/:_id', (req,res) =>{
    //encontra o usuário
    const user = users.find(c => c._id === (req.params._id));
    if(!user){
        res.status(404).send('O usuário com o ID informado não foi encontrado!');
        return;
    }

    //retorna usuário
    res.send(user);
});

//Atualizar User
app.put('/api/users/:_id', (req,res) =>{
    //encontra usuário
    const user = users.find(c => c._id === (req.params._id));
    if(!user){
        res.status(404).send('O usuário com o ID informado não foi encontrado!');
        return;
    }

    //valida novos valores
    const { error } = Joi.validate(req.body, schemaUser); //result.error
    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }
    
    //grava alteração
    user._id = req.body._id,
    user.nome = req.body.nome,
    user.email = req.body.email,
    user.cpf = req.body.cpf,
    user.role = String(req.body.role),
    user.empresas = req.body.empresas
    res.send(user);

});

//Deleta User
app.delete('/api/users/:_id', (req,res) => {
    //encontra usuário
    var user = users.find(c => c._id === (req.params._id));
    if(!user){
        res.status(404).send('O usuário com o ID informado não foi encontrado!');
        return;
    }

    //remove usuário
    const index = users.indexOf(user);
    users.splice(index,1);

    //Retorna o usuário excluído
    res.send(user);
});


/////////Empresas/////////////

app.get('/api/empresas', (req,res) =>{
    //retorna lista de empresas
    res.send(empresas);
});

//Criar Empresa
app.post('/api/empresas/', (req,res) => {

    //valida as entradas
    const { error } = Joi.validate(req.body, schemaEmpresa);
    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    const empresa = {
        _id: req.body._id,
        nome: req.body.nome,
        cnpj: req.body.cnpj,
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: String(req.body.numero),
        cidade: req.body.role,
        estado: req.body.estado,
        users: req.body.users,
        empresa: req.body.empresa
    };
    //cria a empresa
    empresas.push(empresa);
    res.send(empresa);
});

//Recuperar Empresa
app.get('/api/empresas/:_id', (req,res) =>{
    //encontra a empresa
    const empresa = empresas.find(c => c._id === (req.params._id));
    if(!empresa){
        res.status(404).send('A empresa informada não foi encontrada!');
        return;
    }

    //retorna empresa
    res.send(empresa);
});

//Atualizar Empresa
app.put('/api/empresas/:_id', (req,res) =>{
    //encontra empresa
    const empresa = empresas.find(c => c._id === (req.params._id));
    if(!empresa){
        res.status(404).send('A empresa informada não foi encontrada!');
        return;
    }

    //valida novos valores
    const { error } = Joi.validate(req.body, schemaEmpresa); //result.error
    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    //grava alteração
    empresa._id = req.body._id,
    empresa.nome = req.body.nome,
    empresa.cnpj = req.body.cnpj,
    empresa.cep = req.body.cep,
    empresa.endereco = req.body.endereco,
    empresa.numero = String(req.body.numero),
    empresa.cidade = req.body.role,
    empresa.estado = req.body.estado,
    empresa.users = req.body.users,
    empresa.empresa = req.body.empresa

    res.send(empresa);

});

//Deleta Empresa
app.delete('/api/empresas/:_id', (req,res) => {
    //encontra empresa
    var empresa = empresas.find(c => c._id === (req.params._id));
    if(!empresa){
        res.status(404).send('A empresa informada não foi encontrada!');
        return;
    }

    //remove empresa
    const index = empresas.indexOf(empresa);
    empresas.splice(index,1);

    //Retorna a empresa excluída
    res.send(empresa);
});


///////////USER - EMPRESA////////////////////////

//Mostra os usuários de uma empresa
app.get('/api/empresas/:_id/users', (req,res) =>{
    //encontra a empresa
    const empresa = empresas.find(c => c._id === (req.params._id));
    if(!empresa){
        res.status(404).send('A empresa informada não foi encontrada!');
        return;
    }

    const users = empresa.users;

    res.send(users);
});

//Mostra UM usuário da empresa
app.get('/api/empresas/:_id1/users/:_id2', (req,res) => {
    //encontra a empresa
    const empresa = empresas.find(c => c._id === (req.params._id1));
    if(!empresa){
        res.status(404).send(`A empresa informada não foi encontrada!`);
        return;
    }

    //usuarios da empresa
    const users_empresa = empresa.users;

    //encontra usuario
    const usuario = users_empresa.find(c => c._id === (req.params._id2));
    if(!usuario){
        res.status(404).send('O usuário informado não está registrado na empresa!');
        return;
    }

    //Mostra usuário
    res.send(usuario);
});

//Inserindo um user na Empresa
app.put('/api/empresas/:_id/users', (req,res) =>{
    //encontra a empresa
    const empresa = empresas.find(c => c._id === (req.params._id));
    if(!empresa){
        res.status(404).send('A empresa informada não foi encontrada!');
        return;
    }

    const users_empresa = empresa.users;

    //valida novos valores
    const { error } = Joi.validate(req.body, schemaUser); //result.error
    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = {
        _id: req.body._id,
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        role: String(req.body.role),
        empresa: req.body.empresa
    };

    //cria o usuário
    users_empresa.push(user);
    res.send(empresa);
});

//Removendo um user da Empresa
app.delete('/api/empresas/:_id1/users/:_id2', (req,res) => {
    //encontra a empresa
    const empresa = empresas.find(c => c._id === (req.params._id1));
    if(!empresa){
        res.status(404).send(`A empresa informada não foi encontrada!`);
        return;
    }

    //usuarios da empresa
    const users_empresa = empresa.users;

    //encontra usuario
    const usuario = users_empresa.find(c => c._id === (req.params._id2));
    if(!usuario){
        res.status(404).send('O usuário informado não está registrado na empresa!');
        return;
    }

    //remove usuario
    const index = users_empresa.indexOf(usuario);
    users_empresa.splice(index,1);
    res.send(usuario);
});


///////////PLANTA - EMPRESA////////////////////////

//Mostra as plantas de uma empresa
app.get('/api/empresas/:_id/plantas', (req,res) =>{
    //encontra a empresa
    const empresa = empresas.find(c => c._id === (req.params._id));
    if(!empresa){
        res.status(404).send('A empresa informada não foi encontrada!');
        return;
    }

    const plantas = empresa.empresa;

    res.send(plantas);
});

//Mostra UMA planta da empresa
app.get('/api/empresas/:_id1/plantas/:_id2', (req,res) => {
    //encontra a empresa
    const empresa = empresas.find(c => c._id === (req.params._id1));
    if(!empresa){
        res.status(404).send(`A empresa informada não foi encontrada!`);
        return;
    }

    //plantas da empresa
    const plantas_empresa = empresa.empresa;

    //encontra planta
    const planta = plantas_empresa.find(c => c.planta === (req.params._id2));
    if(!planta){
        res.status(404).send('A planta informada não está registrada na empresa!');
        return;
    }

    //Mostra planta
    res.send(planta);
});

//Inserindo uma planta na Empresa
app.put('/api/empresas/:_id/plantas', (req,res) =>{
    //encontra a empresa
    const empresa = empresas.find(c => c._id === (req.params._id));
    if(!empresa){
        res.status(404).send('A empresa informada não foi encontrada!');
        return;
    }

    const plantas_empresa = empresa.empresa;

    //valida novos valores
    const { error } = Joi.validate(req.body, schemaPlanta); //result.error
    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    const planta = {
        planta: req.body.planta
    };

    //cria o usuário
    plantas_empresa.push(planta);
    res.send(planta);
});

//Removendo um user da Empresa
app.delete('/api/empresas/:_id1/plantas/:_id2', (req,res) => {
    //encontra a empresa
    const empresa = empresas.find(c => c._id === (req.params._id1));
    if(!empresa){
        res.status(404).send(`A empresa informada não foi encontrada!`);
        return;
    }

    //plantas da empresa
    const plantas_empresa = empresa.empresa;

    //encontra planta
    const planta = plantas_empresa.find(c => c.planta === (req.params._id2));
    if(!planta){
        res.status(404).send('A planta informada não está registrada na empresa!');
        return;
    }

    //remove planta
    const index = plantas_empresa.indexOf(planta);
    plantas_empresa.splice(index,1);
    res.send(planta);
});
