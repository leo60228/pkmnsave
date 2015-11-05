function not(num) {
	var bin = num.toString(2);

	bin = ("00000000" + bin).substr(-8,8);

	bin = bin.replace(/0/g, '2');
	bin = bin.replace(/1/g, '0');
	bin = bin.replace(/2/g, '1');

	return parseInt(bin, 2);
}

module.exports = function(buffer) {
	if (!buffer instanceof Uint8Array) {
		throw new TypeError('buffer must be Uint8Array.');
		return false;
	}

	var checksum = 0;

	for (var i = 0x2598; i <= 0x3522; i++) {
		checksum += buffer[i];
	}

	checksum = checksum % 256;

	checksum = not(checksum);

	return {
		address: 0x3523,
		buffer: new Uint8Array([checksum])
	};
}
