## Começando
Para executar o projeto, será necessário ter o node e o docker instalados na máquina.
Rode os seguintes comandos no cmd
`docker-compose up -d`
`yarn dev`

## Rotas
| `GET /getAllUSers` | Retorna as informações de todos os registros. |
| `GET /getUser/:username` | Retorna as informações de um registros pelo nome. |
| `POST /creatUser` | Cria um novo registro. |
| `PUT /updateUser/:username` | Atualiza dados de um registro pelo nome. |
| `DELETE /deleteUser/:username` | Remove um registro pelo nome. |

## Exemplo de post/put

`{ "username": "test", "password": "test"}`