function DNAtoText(input, key) {
   //key
   const dna = {'A': '00', 'C': '01', 'G': '10', 'T': '11'}

   var second_parent_int = Math.floor(key/10);
   var crossover_point = key % 10;

   var error = 0;
   if(key < 11 || key > 1277 || key%10 == 0 || key%10 > 7)
   {
      return "Error Bad Key";
   }
   //Validating input
   sequence = input.replace(/ /g,'') //removes whitespaces from input
   for(i = 0; i < sequence.length; i++){
      if(!(sequence[i] in dna)){
         console.log('Input Error, try again as these results will be inaccurate!')
         error = 1;
         break
      }
   }
   if(error)
   {
      return "Error Bad Input";
   }
   // Generate binary blocks of 8 bits each B1, B2, B3, ....., Bn. Where n is number of blocks generated.
   binary1 = []
   binary2 = []
   var alternator = -4;
   var index1 = -1;
   var index2 = -1;
   for(ch of input)
   {
      if(alternator > 3)
      {
         alternator = -4;
      }
      if(alternator < 0)
      {
         if(alternator == -4)
         {
            index1++;
            binary1[index1] = "";
         }
         binary1[index1] += dna[ch]
         alternator++;
      }
      else
      {
         if(alternator == 0)
         {
            index2++;
            binary2[index2] = "";
         }
         binary2[index2] += dna[ch]
         alternator++;
      }
   }
   var parent1_arr = binary1;
   var parent2_arr = binary2;
   var child_arr = []

   // Apply mutation for the bit number given in key and generate M1, M2, M3, ......, Mn.
   for(let i = 0; i < parent1_arr.length; i++)
   {
      if(parent1_arr[i].charAt(crossover_point - 1) === '0')
      {
         parent1_arr[i] = parent1_arr[i].substring(0,crossover_point - 1) + '1' + parent1_arr[i].substring(crossover_point, 8)
      }
      else
      {
         parent1_arr[i] = parent1_arr[i].substring(0,crossover_point - 1) + '0' + parent1_arr[i].substring(crossover_point, 8)
      }
   }
   // Apply crossover with the left out blocks L1, L2, L3, ......, Ln to get the new child C1, C2, C3, ......, Cn..
   for(let i = 0; i < parent1_arr.length; i++)
   {
      child_arr[i] = parent1_arr[i].substring(0, crossover_point) + parent2_arr[i].substring(crossover_point, 8);
   }
   // Convert the binary blocks into decimal form and then into ASCII characters to get the original text.
   var result = "";
   for(let i = 0; i < child_arr.length; i++)
   {
      result += String.fromCharCode(parseInt(child_arr[i], 2));
   }
   document.getElementById("output").innerHTML = result;
   return result;
}