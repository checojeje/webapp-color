// Referencias al DOM
const rangeRed = document.getElementById('rangeRed');
const rangeGreen = document.getElementById('rangeGreen');
const rangeBlue = document.getElementById('rangeBlue');

const labelRed = document.getElementById('labelRed');
const labelGreen = document.getElementById('labelGreen');
const labelBlue = document.getElementById('labelBlue');

const colorDisplay = document.getElementById('colorDisplay');
const hexText = document.getElementById('hexText');
const rgbText = document.getElementById('rgbText');
const colorPicker = document.getElementById('colorPicker');

// --- Funciones Auxiliares ---

function componentToHex(c) {
    const hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Determinar si el color de fondo es oscuro para cambiar el texto dentro de la caja (opcional)
function isDark(r, g, b) {
    // Fórmula de luminosidad simple
    return ((r * 299 + g * 587 + b * 114) / 1000) < 128;
}

// --- Actualización Principal ---
function updateColor() {
    const r = rangeRed.value;
    const g = rangeGreen.value;
    const b = rangeBlue.value;

    // Actualizar Badges (números)
    labelRed.textContent = r;
    labelGreen.textContent = g;
    labelBlue.textContent = b;

    // Actualizar UI Visual
    const rgbString = `rgb(${r}, ${g}, ${b})`;
    const hexString = rgbToHex(r, g, b).toUpperCase();

    colorDisplay.style.backgroundColor = rgbString;
    hexText.textContent = hexString;
    rgbText.textContent = rgbString;

    // Sincronizar Picker
    colorPicker.value = rgbToHex(r, g, b);
    
    // Cambiar color del texto Hex y RGB basado en el color generado para mejor contraste
    const textColor = isDark(r, g, b) ? '#000000' : '#000000'; 
    // Nota: En este diseño, los textos están fuera de la caja de color, 
    // así que los mantenemos negros por defecto, pero podrías cambiar el borde del card.
    
    // Efecto visual: cambiar sombra del card basado en el color
    colorDisplay.style.boxShadow = `0 0 20px ${rgbString}40`; // 40 es transparencia alpha
}

// --- Actualización desde Picker ---
function updateFromPicker() {
    const rgb = hexToRgb(colorPicker.value);
    rangeRed.value = rgb.r;
    rangeGreen.value = rgb.g;
    rangeBlue.value = rgb.b;
    updateColor();
}

// --- Listeners ---
rangeRed.addEventListener('input', updateColor);
rangeGreen.addEventListener('input', updateColor);
rangeBlue.addEventListener('input', updateColor);
colorPicker.addEventListener('input', updateFromPicker);

// Inicializar
updateColor();