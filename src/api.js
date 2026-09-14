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
  {
    id: '4',
    titulo: 'Batman: O Cavaleiro das Trevas',
    ano: '2008',
    genero: 'Ação / Crime',
    diretor: 'Christopher Nolan',
    duracao: '152 min',
    sinopse: 'Batman precisa aceitar um dos maiores testes psicológicos e físicos para combater o caos instaurado pelo Coringa em Gotham.',
  },
  {
    id: '5',
    titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
    ano: '2001',
    genero: 'Fantasia / Aventura',
    diretor: 'Peter Jackson',
    duracao: '178 min',
    sinopse: 'Um jovem hobbit recebe a missão de destruir um anel mágico e poderoso antes que ele caia nas mãos do Senhor do Mal.',
  },
  {
    id: '6',
    titulo: 'Interstellar',
    ano: '2014',
    genero: 'Ficção Científica / Drama',
    diretor: 'Christopher Nolan',
    duracao: '169 min',
    sinopse: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
  },
  {
    id: '7',
    titulo: 'Star Wars: Episódio V - O Império Contra-Ataca',
    ano: '1980',
    genero: 'Ação / Ficção Científica',
    diretor: 'Irvin Kershner',
    duracao: '124 min',
    sinopse: 'Os rebeldes se dispersam após o Império atacar sua base. Luke Skywalker inicia seu treinamento Jedi com o Mestre Yoda.',
  },
  {
    id: '8',
    titulo: 'Jurassic Park: Parque dos Dinossauros',
    ano: '1993',
    genero: 'Aventura / Ficção Científica',
    diretor: 'Steven Spielberg',
    duracao: '127 min',
    sinopse: 'Um parque temático com dinossauros clonados entra em colapso após uma falha de segurança durante uma visita de avaliação.',
  },
  {
    id: '9',
    titulo: 'Matrix',
    ano: '1999',
    genero: 'Ação / Ficção Científica',
    diretor: 'Lana e Lilly Wachowski',
    duracao: '136 min',
    sinopse: 'Um programador descobre que a realidade em que vive é uma simulação criada por máquinas para dominar a humanidade.',
  },
  {
    id: '10',
    titulo: 'Divertida Mente',
    ano: '2015',
    genero: 'Animação / Família',
    diretor: 'Pete Docter',
    duracao: '95 min',
    sinopse: 'As emoções de uma garota de 11 anos tentam guiá-la através de uma grande mudança de vida após sua família se mudar de cidade.',
  },
];

export const buscarFilmes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FILMES_MOCK);
    }, 1000);
  });
};