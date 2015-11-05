var self = {
	calculateChecksum: require('./calculateChecksum'),
	chain: require('./chain')
};

delete self.package;

self.chain._setPkmnSave(self);

module.exports = self;
