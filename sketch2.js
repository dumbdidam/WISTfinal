'use strict';

var inputText = 'Presiden ke-7 RI, Joko Widodo mengatakan akan terus mendengarkan keluhan warga. Meskipun Jokowi tidak lagi menjabat sebagai presiden. Ada 622 pelanggaran dan serangan terhadap kebebasan sipil meliputi kebebasan berekspresi, berserikat, dan berkumpul secara damai. Jokowi dulu dan sekarang antara harapan dan kenyataan. Nawa Dosa Jokowi selama Dua Periode Menjabat Presiden. Merakyat, Gaya Kepemimpinan Jokowi. Diserang Netizen TikTok karena Sentil Jokowi, Buku-buku Najwa Shihab Dibakar. Pelanggaran HAM dalam sektor sumber daya alam dan pembangunan. Kontroversi Presiden Boleh Kampanye, Jokowi Dianggap Terlalu Ikut Campur Pemilu Kebijakan Jokowi membangun Indonesia sentris sudah sangat tepat, pembangunan tidak lagi hanya fokus di Jawa, melainkan juga ke seluruh wilayah Indonesia dari ujung barat hingga ujung timur. DINASTI POLITIK. RUU OMNIBUS LAW Cipta Kerja. TAPERA. Selama dua periode memimpin Indonesia, para ekonom sepakat bahwa Presiden Joko Widodo berhasil memperbanyak infrastruktur dan gencar menggaet investasi. Pernyataan Jokowi KONTRADIKTIF Soal Putusan MK. Namun warisan Jokowi di bidang pembangunan itu harus dibayar mahal dengan kemunduran demokrasi, kata pakar politik dan pegiat HAM. Bernafsu merevisi Undang-Undang KPK. DARI MERAKYAT JADI OLIGARKI. Menjelang akhir masa jabatannya, banyak yang menilai bahwa Jokowi telah berubah dari orang rakyat menjadi orang yang penuh kontradiksi sepanjang kariernya. GAYA BLUSUKAN. Jokowi diyakini mengintervensi Mahkamah Konstitusi (MK) melalui adik iparnya, Hakim MK Anwar Usman, untuk memutus perkara batas usia capres dalam UU Pemilu guna membuka ruang bagi Gibran untuk maju. ';
var fontSizeMax = 25;
var fontSizeMin = 15;
var spacing = 17; // line height
var kerning = 0.3; // between letters

var fontSizeStatic = false; 
var blackAndWhite = false;

var img;
var imgTwo;
var imgThree;
var imgFour;
var typeface;

var letterPositions = []; 

// Define clickable words and their URLs
var clickableWords = {
    "Jokowi": "https://en.wikipedia.org/wiki/Joko_Widodo",
    "Presiden": "https://id.wikipedia.org/wiki/Presiden_Indonesia",
    "HAM": "https://id.wikipedia.org/wiki/Hak_Asasi_Manusia",
    "RUU": "https://id.wikipedia.org/wiki/RUU_Omnibus_Law_Cipta_Kerja"
};

function preload() {
  img = loadImage('data/imgTwo.jpg');
  imgTwo = loadImage('data/imgOne.jpg');
  imgThree = loadImage('data/imgFour.png');
  imgFour = loadImage('data/imgFive.png');
  typeface = loadFont('data/HelveticaNowDisplay.otf');
  hoverTypeface = loadfont('data/Cinzel-Regular.otf');
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
}



function draw() {

  var x = 0;
  var y = 10;
  var counter = 0;
  letterPositions = []; // Clear previous positions

  while (y < height) {
    img.loadPixels();
    var imgX = round(map(x, 0, width, 0, img.width));
    var imgY = round(map(y, 0, height, 0, img.height));
    var c = color(img.get(imgX, imgY));
    var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);

    push();
    translate(x, y);

    if (fontSizeStatic) {
      textSize(fontSizeMax);
      fill(255); // Set text color to black
    } else {
      var fontSize = map(greyscale, 0, 255, fontSizeMax, fontSizeMin);
      fontSize = max(fontSize, 1);
      textSize(fontSize);
      fill(255); // Set text color to black
    }

    var letter = inputText.charAt(counter);
    text(letter, 0, 0);
    var letterWidth = textWidth(letter) + kerning;
    x += letterWidth;

    pop();

    if (x + letterWidth >= width) {
      x = 0;
      y += spacing;
    }

    counter++;
    if (counter >= inputText.length) {
      counter = 0;
    }
  }




  noLoop()
  image(imgThree, 2, 5);
  image(imgFour, 2, 5);
}


