/**
 * validaciones.ts - The World Is Yours (TWY)
 * Funciones de validacion y formateo para RUT chileno, correo electronico y telefono.
 */

/** Limpia un RUT: quita puntos, guiones y espacios */
export function limpiarRut(rut: string): string {
  return String(rut).replace(/[.\-\s]/g, '').toUpperCase().trim();
}

/** Formatea un RUT al formato estandar "12.345.678-9" */
export function formatearRut(rut: string): string {
  const limpio = limpiarRut(rut);
  if (limpio.length < 2) return rut;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${cuerpoFormateado}-${dv}`;
}

/** Valida el RUT chileno verificando el digito verificador con algoritmo modulo 11 */
export function validarRut(rut: string): boolean {
  const limpio = limpiarRut(rut);
  if (limpio.length < 2) return false;
  const cuerpo = limpio.slice(0, -1);
  const dvIngresado = limpio.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const dvCalc = 11 - (suma % 11);
  const dvEsp = dvCalc === 11 ? '0' : dvCalc === 10 ? 'K' : String(dvCalc);
  return dvIngresado === dvEsp;
}

/** Valida el formato de un correo electronico */
export function validarEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(String(email).toLowerCase().trim());
}

/** Valida un numero de telefono chileno (celular +56 9 XXXXXXXX) */
export function validarTelefono(telefono: string): boolean {
  const limpio = String(telefono).replace(/[\s()-]/g, '');
  const regex = /^(\+?56)?9\d{8}$/;
  return regex.test(limpio);
}
