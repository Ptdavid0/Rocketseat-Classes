module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // Criara colunas que falara quando foi criado e editado
    underscored: true,
    underscoredAll: true,
  },
};
