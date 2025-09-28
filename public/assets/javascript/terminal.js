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

// Functions Object
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
    if (!/^[01]+$/.test(n)) return "Erro: valor não é um binário válido";
    return parseInt(n, 2).toString(16);
  },
  bin2octal(n) {
    if (!/^[01]+$/.test(n)) return "Erro: valor não é um binário válido";
    return parseInt(n, 2).toString(8);
  },
  bin2dec(n) {
    if (!/^[01]+$/.test(n)) return "Erro: valor não é um binário válido";
    return parseInt(n, 2).toString(10);
  },
  hex2octal(n) {
    if (!/^[0-9a-fA-F]+$/.test(n))
      return "Erro: valor não é um hexadecimal válido";
    return parseInt(n, 16).toString(8);
  },
  hex2bin(n) {
    if (!/^[0-9a-fA-F]+$/.test(n))
      return "Erro: valor não é um hexadecimal válido";
    return parseInt(n, 16).toString(2);
  },
  hex2dec(n) {
    if (!/^[0-9a-fA-F]+$/.test(n))
      return "Erro: valor não é um hexadecimal válido";
    return parseInt(n, 16).toString(16);
  },
  octal2hex(n) {
    if (!/^[0-7]+$/.test(n)) return "Erro: valor não é octal válido";
    return parseInt(n, 8).toString(16);
  },
  octal2bin(n) {
    if (!/^[0-7]+$/.test(n)) return "Erro: valor não é octal válido";
    return parseInt(n, 8).toString(2);
  },
  octal2dec(n) {
    if (!/^[0-7]+$/.test(n)) return "Erro: valor não é octal válido";
    return parseInt(n, 8).toString(10);
  },
};

// Functions Map
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

// Input Number
var i = 0;

// Add a event e, when key Enter is pressed
commandsInput.addEventListener("keydown", function handleEnter(e) {
  if (e.key === "Enter") {
    const command = commandsInput.value.trim();
    let words = command.split(/\s+/);
    let func = words[0];
    let param = words[1];

    // Validation with maps for the functions objetcs
    if (commandMap[func]) {
      resultCommand.innerHTML += `<span style="color: white;">${copy} <br><br> ${func}: ${param} ~> ${commandMap[func](param)}</span><br>`;
    } else if (command === "ls") {
      resultCommand.innerHTML += `${ls}`;
    } else {
      resultCommand.innerHTML += `<span style="color: white">${command}: comando não encontrado</span><br>`;
    }

    // Diasable anoter input
    commandsInput.disabled = true;

    // Set the line
    const line = document.createElement("div");

    // Add a class name to line
    line.className = "terminal-line";

    // Prompt command
    const prompt = document.createElement("span");

    // Set content of prompt content
    prompt.innerHTML = `${newLine}`;

    // Set the new input
    const newInput = document.createElement("input");

    // Atributtes for input
    newInput.id = `commands${i++}`;
    newInput.className = "terminal-input";
    newInput.style.background = "black";
    newInput.style.color = "white";
    newInput.style.border = "none";
    newInput.style.outline = "none";
    newInput.style.width = "25%";

    // Add as new child new line content
    line.appendChild(prompt);

    // Add as new child a new input
    line.appendChild(newInput);

    // Add as child a new line
    resultCommand.appendChild(line);

    // Set the new input
    commandsInput = newInput;

    // Call the function handleEnter
    commandsInput.addEventListener("keydown", handleEnter);

    // Set focus on the next input
    commandsInput.focus();
  }
});
