const fs = require("fs");
const path = require('path');

function getPath(){
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  return filePath;
}

function saveUser(nuevoUsuario) {
  const usuarios = readUsers();
  usuarios.push(nuevoUsuario);
  const stringifiedUsers = JSON.stringify(usuarios, null, 2);
  //const result = fs.writeFileSync("../data/users.json", stringifiedUsers, "utf-8");
  const result = fs.writeFileSync(getPath(), stringifiedUsers, "utf-8");
  return result;
}

function readUsers() {
  /*const usuariosParsed = JSON.parse(fs.readFileSync("../data/users.json", "utf-8"));
  return usuariosParsed;*/
  
  const usuariosParsed = JSON.parse(fs.readFileSync(getPath(), 'utf-8'));
  return usuariosParsed;
}

function findUser(emailLogin) {  
  const usuarios = readUsers(); 
  const usuarioEncontrado = usuarios.find((usuario) => usuario.email === emailLogin);
  
  return usuarioEncontrado;
}

function checkUser(emailLogin) {  
  const usuarios = readUsers();  
  const usuarioEncontrado = usuarios.some((usuario) => usuario.email === emailLogin);  
  return usuarioEncontrado;
}

module.exports = {
  saveUser,
  readUsers,
  findUser,
  checkUser
};
