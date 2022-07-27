const fs = require("fs")
const os = require("os")

const ducky = [
	"            ",
	"     (o\x1b[33m<\x1b[0m    ",
	"  \x1b[34m~~\x1b[0m<__)\x1b[34m~~\x1b[0m  ",
]

async function get_distro() {
	return new Promise((resolve, reject) => {
		fs.readFile("/etc/os-release", "utf8", (err, data) => {
			if (err) throw err

			const lines = data.split("\n")
			lines.forEach((line, index) => {
				const words = line.split("=")
				if(words.length > 0) {
					if(words[0] == "ID") resolve(words[1])
					return;
				}
			})

			resolve("linux")
		})
	})
}

async function get_os() {
	switch(os.platform()) {
		case "linux": return await get_distro()
		case "darwin": return "macOS"
		case "win32": return "windows"
		case "openbsd":
		case "freebsd": return "bsd"
		case "android": return "android"
		default: return "unknown"
	}
}

async function start() {
	console.log("\n" + ducky[0] + os.userInfo().username)
	console.log(ducky[1] + os.hostname())
	console.log(ducky[2] + await get_os() + "\n")
}

start()
