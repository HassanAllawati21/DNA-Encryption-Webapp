function textToDNA(input) {
  var DNA_nucleotides = { "00": "A", "01": "C" };
  DNA_nucleotides["10"] = "G";
  DNA_nucleotides["11"] = "T";

  // Data in the file in its ASCII form is converted into their corresponding binary form.
  var first_parent_bin = "";

  for (let i = 0; i < input.length; i++) {
    first_parent_bin += input[i].charCodeAt(0).toString(2) + " ";
  }

  // Splits the binary string into an array of 8-bit binary numbers.
  var first_parent_arr = first_parent_bin.split(" ");

  // Removes the last element of the array which is an empty string.
  first_parent_arr.pop();

  // Padding 0's to the binary numbers to make them 8-bit.
  for (let i = 0; i < first_parent_arr.length; i++) {
    while (first_parent_arr[i].length < 8) {
      first_parent_arr[i] = "0" + first_parent_arr[i];
    }
  }

  // Produces a decimal key between the range 0011 to 1277. if the last digit is 0, it is replaced by 7.
  // if the last digit is 9, replace it by 8.

  var key = Math.floor(Math.random() * 1277) + 11;
  if (key % 10 == 0) {
    key += 1;
  }
  else if(key % 10 > 7)
  {
    key += 4;
  }

  // first three digits is the second parent. the last digit is the crossover/mutation point.
  var second_parent_int = Math.floor(key/10);
  var crossover_point = key % 10;

  var second_parent = second_parent_int.toString(2);
  // Padding 0's to the binary numbers to make them 8-bit.
  while (second_parent.length < 8) {
    second_parent = "0" + second_parent;
  }

  var child_arr = [];
  var leftover_arr = [];

  // Use binary form of first three digits and perform crossover for all the n blocks and the generated child blocks be C1, C2, C3, ......, Cn.
  for(let i = 0; i < first_parent_arr.length; i++)
  {
    child_arr[i] = first_parent_arr[i].substring(0, crossover_point) + second_parent.substring(crossover_point, 8);
    // Identify the left out block as L1, L2, L3, ......, Ln which will be later used for crossover in decryption process.
    leftover_arr[i] = second_parent.substring(0, crossover_point) + first_parent_arr[i].substring(crossover_point, 8);
  }
  // Perform mutation on bit number denoted in key and generate M1, M2, M3, ......, Mn.
  for(let i = 0; i < child_arr.length; i++)
  {
    if(child_arr[i].charAt(crossover_point - 1) === '0')
    {
      child_arr[i] = child_arr[i].substring(0,crossover_point - 1) + '1' + child_arr[i].substring(crossover_point, 8)
    }
    else
    {
      child_arr[i] = child_arr[i].substring(0,crossover_point - 1) + '0' + child_arr[i].substring(crossover_point, 8)
    }
  }
  // Convert all the blocks into binary form into ASCII form and then into its text equivalent.
  var result = "";
  for(let i = 0; i < child_arr.length; i++)
  {
    for(let j = 0; j < 8; j = j+2)
    {
      var ascii = child_arr[i].substring(j, j+2)
      if(ascii.localeCompare("00") === 0)
      {
        result = result + 'A';
      }
      else if(ascii.localeCompare("01") === 0)
      {
        result = result + 'C';
      }
      else if(ascii.localeCompare("10") === 0)
      {
        result = result + 'G';
      }
      else if(ascii.localeCompare("11") === 0)
      {
        result = result + 'T'
      }
    }
    for(let j = 0; j < 8; j = j+2)
    {
      var ascii = leftover_arr[i].substring(j, j+2)
      if(ascii.localeCompare("00") === 0)
      {
        result = result + 'A';
      }
      else if(ascii.localeCompare("01") === 0)
      {
        result = result + 'C';
      }
      else if(ascii.localeCompare("10") === 0)
      {
        result = result + 'G';
      }
      else if(ascii.localeCompare("11") === 0)
      {
        result = result + 'T'
      }
    }
  }
  result = result + " with key " + key;
  document.getElementById("output").innerHTML = result;
  return result;
  // Convert the binary data along with the left out into its DNA sequence and store the result in a file.
}
