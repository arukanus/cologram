# Cologram

## Overview
COLOGRAM provides an interactive way to create and manage color palettes, including functionalities for adding colors to a palette, saving palettes. The tool also supports downloading palettes as images. 

## Features
- **Color Picker**: Allows users to select colors using a color picker.
- **Sliders**: Enhances UX.
- **Add Color**: Users can add the selected color to their current palette.
- **Download Palette**: Users can download their current palette as a PNG image.
- **Save Palette**: Saves the current palette and displays it under the palette history.
- **Responsive Design**: Built with Bootstrap 5, ensuring that the tool is responsive and accessible on various devices.
- **Сomplimentary and Analogue colors**: With a click on any point on ur screen, this tool displays Сomplimentary and Analogue colors of ur base color.
- **Pre-Defined palettes**: Pre-defined palettes of 3 different distinct styles available on the next page of the website, their CSS copiable.


## Technologies Used
- **HTML5**
- **CSS3**
- **JavaScript**
  - Event handling
  - Canvas for downloading palettes as images
- **Bootstrap 5**: For responsive layout and styling components.

## Setup and Installation
1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd [local-directory]
2. **Go** to *.vscode* -> *launch.json* -> **adjust** "file": "/Users/arukanussipzhan/Downloads/cologram/index.html" to **your file address** in order to run the website

### Development
The development process involved:
- Implementing the color picker using native HTML5 elements.
- Scripting interactions in JavaScript to update color values and manage state.
- Using Canvas API for generating downloadable images of color palettes.

## Compromises and Known Issues
During development, the following compromises were made:
- **Performance Optimization**: Handling multiple color changes rapidly can cause slight delays in updating the UI due to the intensive calculations and DOM updates.
- **Color Accuracy**: Minor discrepancies in color representation can occur due to different color profiles and calibrations across user devices.

### Known Bugs
- **Palette Download**: Occasionally, the download feature may not render the colors accurately in the generated image, especially on high-resolution displays.
- **Color Picker Sync**: After base color is switched to complimentary or analogue color, if you press 'Add color', it will still show the base color of the color picker.

Highlights:

1)  Pastel rainbow gradient background made in style.css

background: linear-gradient(to right, 
        #FFB3BA 0%, #FFDFBA 5%, #FFFFBA 10%, #BAFFC9 15%, #BAE1FF 20%, 
        #F2C1D1 25%, #FDE4CF 30%, #FEFECB 35%, #CBFECF 40%, #CBF7FE 45%,
        #ECC7DE 50%, #FBDBC7 55%, #FEF9C7 60%, #C7FDD9 65%, #C7EEFD 70%,
        #D5C4E1 75%, #FAE7D0 80%, #FAFAD0 85%, #D0FAE4 90%, #D0E9FA 95%);

2) Color picker contains a pipette that can pick ANY color on your window! Including Complimentary and Analogue colors, which compensates for the known bug.

3) Using bootstrap 5, replaced the default modifier classes with the .btn-outline-* ones to remove all background images and colors on 'save palette to history' and 2 other buttons.

