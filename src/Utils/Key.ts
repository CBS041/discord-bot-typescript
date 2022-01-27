export default function CreateKey(length: number) {
  var result = "";

  var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  var caracteresTamanhos = caracteres.length;

  for (var i = 0; i < length; i++) {
    result += caracteres.charAt(Math.floor(Math.random() * caracteresTamanhos));
  }

  return result;
};