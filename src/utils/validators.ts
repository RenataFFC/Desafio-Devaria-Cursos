/* Validar nome */

const ValidarNome = ( nome:string | undefined): boolean => {
  return nome!== undefined && nome.length >3;
}