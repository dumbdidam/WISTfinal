// P_4_3_2_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * pixel mapping. each pixel is translated into a new element (letter)
 *
 * KEYS
 * 1                 : toogle font size mode (dynamic/static)
 * 2                 : toogle font color mode (color/b&w)
 * arrow up/down     : maximal fontsize +/-
 * arrow right/left  : minimal fontsize +/-
 * s                 : save png
 */

// this was also completed with the assistant of AI

'use strict';

var inputText = 'Presiden ke-7 RI, Joko Widodo mengatakan akan terus mendengarkan keluhan warga. Meskipun Jokowi tidak lagi menjabat sebagai presiden. Ada 622 pelanggaran dan serangan terhadap kebebasan sipil meliputi kebebasan berekspresi, berserikat, dan berkumpul secara damai. Jokowi dulu dan sekarang antara harapan dan kenyataan. Nawa Dosa Jokowi selama Dua Periode Menjabat Presiden. Merakyat, Gaya Kepemimpinan Jokowi. Diserang Netizen TikTok karena Sentil Jokowi, Buku-buku Najwa Shihab Dibakar. Pelanggaran HAM dalam sektor sumber daya alam dan pembangunan. Kontroversi Presiden Boleh Kampanye, Jokowi Dianggap Terlalu Ikut Campur Pemilu Kebijakan Jokowi membangun Indonesia sentris sudah sangat tepat, pembangunan tidak lagi hanya fokus di Jawa, melainkan juga ke seluruh wilayah Indonesia dari ujung barat hingga ujung timur. DINASTI POLITIK. RUU OMNIBUS LAW Cipta Kerja. TAPERA. Selama dua periode memimpin Indonesia, para ekonom sepakat bahwa Presiden Joko Widodo berhasil memperbanyak infrastruktur dan gencar menggaet investasi. Pernyataan Jokowi KONTRADIKTIF Soal Putusan MK. Namun warisan Jokowi di bidang pembangunan itu harus dibayar mahal dengan kemunduran demokrasi, kata pakar politik dan pegiat HAM. Bernafsu merevisi Undang-Undang KPK. DARI MERAKYAT JADI OLIGARKI. Menjelang akhir masa jabatannya, banyak yang menilai bahwa Jokowi telah berubah dari orang rakyat menjadi orang yang penuh kontradiksi sepanjang kariernya. GAYA BLUSUKAN. Jokowi diyakini mengintervensi Mahkamah Konstitusi (MK) melalui adik iparnya, Hakim MK Anwar Usman, untuk memutus perkara batas usia capres dalam UU Pemilu guna membuka ruang bagi Gibran untuk maju. ';
var fontSizeMax = 29;
var fontSizeMin = 15;
var spacing = 20; 
var kerning = 0.3; 

var fontSizeStatic = false; 
var blackAndWhite = false;

var img;
var imgTwo;
var imgThree;
var imgFour;
var typeface;
var hoverTypeface;

var letterPositions = []; 
var hoverRadius = 90; 

function preload() {
  img = loadImage('data/imgTwo.jpg');
  imgTwo = loadImage('data/imgOne.jpg');
  imgThree = loadImage('data/imgFour.png');
  imgFour = loadImage('data/imgFive.png');
  typeface = loadFont('data/HelveticaNowDisplay.otf');
  hoverTypeface = loadFont('data/Cinzel-Regular.otf');
}

function setup() {
  createCanvas(437, 614);
  textFont(typeface);
  textSize(10);
  textAlign(LEFT, CENTER);
  print(img.width + ' • ' + img.height);
  img.loadPixels();

  let cnv = createCanvas(437, 614);
  cnv.id('mycanvas');
  background(imgTwo, 437, 614);
  cnv = select('#mycanvas');
  cnv.style('border', '26px red solid');

  drawText();
}

function drawText() {
  var x = 0;
  var y = 10;
  var counter = 0;
  letterPositions = [];

  while (y < height) {
    var imgX = round(map(x, 0, width, 0, img.width));
    var imgY = round(map(y, 0, height, 0, img.height));
    var c = color(img.get(imgX, imgY));
    var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);

    push();
    translate(x, y);

    if (fontSizeStatic) {
      textSize(fontSizeMax);
      fill(255); 
    } else {
      var fontSize = map(greyscale, 0, 255, fontSizeMax, fontSizeMin);
      fontSize = max(fontSize, 1);
      textSize(fontSize);
      fill(255); 
    }

    var letter = inputText.charAt(counter);
    text(letter, 0, 0);
    var letterWidth = textWidth(letter) + kerning;

    letterPositions.push({ letter: letter, x: x, y: y, width: letterWidth, height: fontSize });

    x += letterWidth;

    pop();

    if (x + letterWidth >= width) {
      x = 0;
      y += spacing;
    }

    counter++;
    if (counter >= inputText.length) {
      break;
    }
  }

  image(imgThree, 1, 5);
  image(imgFour, 2, 5);
}

function draw() {
  background(imgTwo, 437, 614);
  drawText();

  for (let i = 0; i < letterPositions.length; i++) {
    let pos = letterPositions[i];
    if (dist(mouseX, mouseY, pos.x + pos.width / 2, pos.y) < hoverRadius) {
      fill(255, 10, 0); 
      textSize(18);
      text(pos.letter, pos.x, pos.y);
      
    }
  }
}

function mouseMoved() {
  let hovered = false;
  for (let i = 0; i < letterPositions.length; i++) {
    let pos = letterPositions[i];
    if (dist(mouseX, mouseY, pos.x + pos.width / 2, pos.y) < hoverRadius) {
      cursor(HAND);
      hovered = true;
      break;
    }
  }
  if (!hovered) {
    cursor(ARROW); 
  }
  redraw(); 
}

function mousePressed() {
  for (let i = 0; i < letterPositions.length; i++) {
    let pos = letterPositions[i];
    if (dist(mouseX, mouseY, pos.x + pos.width / 2, pos.y) < hoverRadius) {
      window.open('https://www.suara.com/kotaksuara/2023/10/24/125959/29-dosa-jokowi-sebagai-presiden-ri-menurut-kontras', '_blank');
    }
  }
}
