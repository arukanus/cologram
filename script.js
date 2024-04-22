document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('colorPicker');
    const hueSlider = document.getElementById('hueSlider');
    const saturationSlider = document.getElementById('saturationSlider');
    const lightnessSlider = document.getElementById('lightnessSlider');
    const hueValue = document.getElementById('hueValue');
    const saturationValue = document.getElementById('saturationValue');
    const lightnessValue = document.getElementById('lightnessValue');

    const addColorBtn = document.getElementById('addColorBtn');
    const colorList = document.getElementById('colorList');
    const savePaletteBtn = document.getElementById('savePaletteBtn');
    const newPaletteBtn = document.getElementById('newPaletteBtn');
    const paletteHistory = document.getElementById('paletteHistory');

    let palette = [];
    let paletteHistoryData = [];
    let currentColorHSL = { h: 0, s: 1, l: 0.5 };  // Default to middle gray

    function downloadPaletteAsImage() {
        if (!palette.length) {
            alert('No colors in the palette to download!');
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const colorWidth = 100; 
        const colorHeight = 100; 

        canvas.width = palette.length * colorWidth; 
        canvas.height = colorHeight; 

        palette.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.fillRect(index * colorWidth, 0, colorWidth, colorHeight); // Draw the color on canvas
        });

        // Convert canvas to an image and trigger download
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'palette.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // Clean up
        });
    }

    // Link function to a button
    document.getElementById('downloadImageBtn').addEventListener('click', downloadPaletteAsImage);

    colorPicker.addEventListener('input', function () {
        const rgb = hexToRgb(colorPicker.value);
        currentColorHSL = rgbToHsl(rgb.r, rgb.g, rgb.b);
        updateSliders();
    });

    [hueSlider, saturationSlider, lightnessSlider].forEach(slider => {
        slider.addEventListener('input', function () {
            updateColorDisplay();
        });
    });

    addColorBtn.addEventListener('click', function () {
        const color = hslToHex(currentColorHSL.h, currentColorHSL.s, currentColorHSL.l);
        palette.push(color);
        displayColors();
    });

    savePaletteBtn.addEventListener('click', function () {
        paletteHistoryData.push([...palette]);
        displayPaletteHistory();
        alert('Palette saved!');
    });

    newPaletteBtn.addEventListener('click', function () {
        palette = [];
        displayColors();
    });

    function updateSliders() {
        hueSlider.value = currentColorHSL.h;
        saturationSlider.value = currentColorHSL.s * 100;
        lightnessSlider.value = currentColorHSL.l * 100;
        hueValue.textContent = currentColorHSL.h.toFixed(0);
        saturationValue.textContent = (currentColorHSL.s * 100).toFixed(0);
        lightnessValue.textContent = (currentColorHSL.l * 100).toFixed(0);
    }

    function updateColorDisplay() {
        currentColorHSL.h = parseInt(hueSlider.value);
        currentColorHSL.s = parseFloat(saturationSlider.value / 100);
        currentColorHSL.l = parseFloat(lightnessSlider.value / 100);
        hueValue.textContent = hueSlider.value;
        saturationValue.textContent = saturationSlider.value;
        lightnessValue.textContent = lightnessSlider.value;
        const updatedHex = hslToHex(currentColorHSL.h, currentColorHSL.s, currentColorHSL.l);
        colorPicker.value = updatedHex;
    }

    function displayColors() {
        colorList.innerHTML = ''; // Clear existing colors
        palette.forEach(color => {
            const colorElement = document.createElement('li');
            colorElement.style.backgroundColor = color;
            colorElement.style.width = '50px'; // Ensure the size is sufficient to be visible
            colorElement.style.height = '50px';
            colorElement.style.borderRadius = '25px';
            colorElement.style.display = 'inline-block';
            colorElement.style.margin = '5px';
            colorList.appendChild(colorElement);
            colorElement.addEventListener('click', () => alert('Color code: ' + color)); // Add click event to show color code
        });
    }
    

    function displayPaletteHistory() {
        paletteHistory.innerHTML = '<h3>History of Palettes</h3>';
        paletteHistoryData.forEach((pal, index) => {
            const palDiv = document.createElement('div');
            pal.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.style.backgroundColor = color;
                colorDiv.style.width = '50px';
                colorDiv.style.height = '50px';
                colorDiv.style.borderRadius = '25px';
                colorDiv.style.display = 'inline-block';
                colorDiv.style.margin = '5px';
                palDiv.appendChild(colorDiv);
            });
            paletteHistory.appendChild(palDiv);
        });
    }

    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        // 3 digits
        if (hex.length == 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        // 6 digits
        else if (hex.length == 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return {r, g, b};
    }

    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; 
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return {h: h * 360, s, l};
    }
        
    function hslToHex(h, s, l) {
        h /= 360;
        let r, g, b;
        if (s == 0) {
            r = g = b = l; 
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length == 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    // Function to get the complementary color
    function getComplementaryColor(rgb) {
    let [h, s, l] = rgbToHsl(...rgb);
    h = (h + 0.5) % 1; 
    return hslToRgb(h, s, l);
    }

    // Function to get analogous colors
    function getAnalogousColors(rgb, count=2, slice=30) {
    let [h, s, l] = rgbToHsl(...rgb);
    let colors = [];
    let degreeAdd = slice / 360; // Convert slice degree to a fraction of the circle
    for (let i = 1; i <= count; i++) {
        let newH = (h + degreeAdd * i) % 1;
        let newH2 = (h - degreeAdd * i + 1) % 1; // Normalize for negative values
        colors.push(hslToRgb(newH, s, l));
        colors.push(hslToRgb(newH2, s, l));
        }
    return colors;
    }

});
