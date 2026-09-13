// src/api.js

const FILMES_MOCK = [
  {
    id: '1',
    titulo: 'Harry Potter e a Pedra Filosofal',
    ano: '2001',
    genero: 'Fantasia / Aventura',
    diretor: 'Chris Columbus',
    duracao: '152 min',
    sinopse: 'Um garoto órfão descobre que é um bruxo e é convidado a estudar na Escola de Magia e Bruxaria de Hogwarts.',
  },
  {
    id: '2',
    titulo: 'Vingadores: Ultimato',
    ano: '2019',
    genero: 'Ação / Ficção Científica',
    diretor: 'Anthony e Joe Russo',
    duracao: '181 min',
    sinopse: 'Após Thanos eliminar metade de todas as criaturas vivas, os Vingadores restantes precisam se unir para desfazer suas ações.',
  },
  {
    id: '3',
    titulo: 'Homem-Aranha: Sem Volta Para Casa',
    ano: '2021',
    genero: 'Ação / Aventura',
    diretor: 'Jon Watts',
    duracao: '148 min',
    sinopse: 'Peter Parker pede ajuda ao Doutor Estranho para fazer com que todos esqueçam sua identidade, mas o feitiço abre o multiverso.',
  },
];

export const buscarFilmes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FILMES_MOCK);
    }, 1000);
  });
};