class Ppu {
  constructor(ppu) {
    this.ppu = ppu.toUpperCase().replace(/[^A-Z0-9]/g, '');
    this.dv = this.calcularDV();
  }

  calcularDV() {
    const letras = this.ppu.slice(0, -2);
    const numeros = this.ppu.slice(-2);
    
    const conversion = {
      'B': 1, 'C': 2, 'D': 3, 'F': 4, 'G': 5,
      'H': 6, 'J': 7, 'K': 8, 'L': 9, 'P': 0,
      'R': 2, 'S': 3, 'T': 4, 'V': 5, 'W': 6,
      'X': 7, 'Y': 8, 'Z': 9
    };

    const letrasNumeros = letras.split('').map(letra => {
      return conversion[letra] || 0; // Utiliza la tabla de conversión
    });

    const ppuArray = letrasNumeros.concat(numeros.split('').map(Number)); // Combina las letras convertidas y los números
    const factors = [2, 3, 4, 5, 6, 7];
    let sum = 0;

    for (let i = 0; i < ppuArray.length; i++) {
      sum += ppuArray[ppuArray.length - 1 - i] * factors[i % factors.length];
    }

    const remainder = sum % 11;
    const dv = 11 - remainder;

    if (dv === 11) return '0';
    if (dv === 10) return 'K';
    return dv.toString();
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Ppu;
} else {
  window.Ppu = Ppu;
}

// Ejemplo de uso
const patente = 'JZKH39';
const ppuInstance = new Ppu(patente);
console.log(`Dígito verificador ${ppuInstance.dv}`); // Debería imprimir: La patente JZKH39 tiene el dígito verificador 4
