document.addEventListener("DOMContentLoaded", () => {
  let terminalButton = document.getElementById("terminal");

  terminalButton.addEventListener("click", () => {
    window.open(
      "terminal.html",
      "Terminal",
      "width=618,height=378,menubar=no,toolbar=no,location=no,status=no,scrollbars=no,resizable=no",
    );
  });
});

let resultCommand = document.getElementById("result");
let commandsInput = document.getElementById("commands");
let ls = `
  <ul>
      <li>'Área de Trabalho'</li>
      <li>Documentos</li>
      <li>Downloads</li>
      <li>Imagens</li>
      <li>Modelos</li>
      <li>Música</li>
      <li>Público</li>
      <li>Vídeo</li>
  </ul>
  `;
let newLine = `
  <span style="color: #33da7a">
    marley@sptech
    <span style="color: #fff">:
      <span style="color: #33da7a">~</span>
    </span>
    <span style="color: #fff">$</span>
  </span>
`;

let copy = `© 2025 Marley Santos <a title="Abrir github" style="color: white;" href="https://github.com/MarleyS439/">(MarleyS439)</a> · Todos os direitos reservados.`;

const Functions = {
  octal(n) {
    return Number(n).toString(8);
  },
  bin(n) {
    return Number(n).toString(2);
  },
  hex(n) {
    return Number(n).toString(16);
  },
  bin2hex(n) {
    return parseInt(n, 2).toString(16);
  },
  bin2octal(n) {
    return parseInt(n, 2).toString(8);
  },
  bin2dec(n) {
    return parseInt(n, 2).toString(10);
  },
  hex2octal(n) {
    return parseInt(n, 16).toString(8);
  },
  hex2bin(n) {
    return parseInt(n, 16).toString(2);
  },
  hex2dec(n) {
    return parseInt(n, 16).toString(16);
  },
  octal2hex(n) {
    return parseInt(n, 8).toString(16);
  },
  octal2bin(n) {
    return parseInt(n, 8).toString(2);
  },
  octal2dec(n) {
    return parseInt(n, 8).toString(10);
  },
};

const commandMap = {
  octal: Functions.octal,
  bin: Functions.bin,
  hex: Functions.hex,
  bin2hex: Functions.bin2hex,
  bin2octal: Functions.bin2octal,
  bin2dec: Functions.bin2dec,
  hex2octal: Functions.hex2octal,
  hex2bin: Functions.hex2bin,
  hex2dec: Functions.hex2dec,
  octal2hex: Functions.octal2hex,
  octal2bin: Functions.octal2bin,
  octal2dec: Functions.octal2dec,
};

var i = 0;

commandsInput.addEventListener("keydown", function handleEnter(e) {
  if (e.key === "Enter") {
    const command = commandsInput.value.trim();
    let words = command.split(/\s+/);
    let func = words[0];
    let param = words[1];

    if (commandMap[func]) {
      resultCommand.innerHTML += `<span style="color: white;">${copy} <br><br> ${func}: ${param} ~> ${commandMap[func](param)}</span><br>`;
    } else if (command === "ls") {
      resultCommand.innerHTML += `${ls}`;
    } else {
      resultCommand.innerHTML += `<span style="color: white">${command}: comando não encontrado</span><br>`;
    }

    commandsInput.disabled = true;

    const line = document.createElement("div");
    line.className = "terminal-line";

    const prompt = document.createElement("span");
    prompt.innerHTML = `${newLine}`;

    const newInput = document.createElement("input");
    newInput.id = `commands${i++}`;
    newInput.className = "terminal-input";
    newInput.style.background = "black";
    newInput.style.color = "white";
    newInput.style.border = "none";
    newInput.style.outline = "none";
    newInput.style.width = "25%";

    line.appendChild(prompt);
    line.appendChild(newInput);
    resultCommand.appendChild(line);

    commandsInput = newInput;
    commandsInput.addEventListener("keydown", handleEnter);
    commandsInput.focus();
  }
});
