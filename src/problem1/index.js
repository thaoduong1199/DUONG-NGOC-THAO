const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function sum_to_n_a (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

function sum_to_n_b (n) {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_b(n - 1);
}

function sum_to_n_c (n) {
  return (n * (n + 1)) / 2;
}

function testSumToN() {
  readline.question("Enter a number N1: ", (n) => {
    const nA = Number(n);
    console.log("SUM TO N1 SOLUTION:", sum_to_n_a(nA));
    readline.question("Enter a number N2: ", (n) => {
      const nB = +n;
      console.log("SUM TO N2 SOLUTION:", sum_to_n_b(nB));
      readline.question("Enter a number N3: ", (n) => {
        const nC = +n;
        console.log("SUM TO N3 SOLUTION:", sum_to_n_c(nC));
        readline.close();
      });
    });
  });
}

testSumToN();
