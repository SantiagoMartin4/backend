import bcrypt from 'bcrypt';

// reminder of syntaxis: funcion flecha que recibe un solo parámetro por eso no usa ()
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//creo una funcion para comparar la password ingresada con la que tengo en la base de datos
//recibe dos parametros "user" que traigo desde la db con la password registrada y "password" con la pass ingresada
// bcrypt.compare devuelve bollean
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);