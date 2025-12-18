function sum_to_n_a(n: number): number {
	return (n * (n + 1)) / 2; // Formula for the sum of the first n natural numbers
}

function sum_to_n_b(n: number): number {
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
	}
	return sum;
}

function sum_to_n_c(n: number): number {
	if (n === 1) {
		return 1;
	}
	return n + sum_to_n_c(n - 1);
}

console.log("method a: ", sum_to_n_a(10));
console.log("method b: ", sum_to_n_b(10));
console.log("method c: ", sum_to_n_c(10));
