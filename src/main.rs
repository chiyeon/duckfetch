use libmacchina::{GeneralReadout};

fn main() {
	use libmacchina::traits::GeneralReadout as _;

	let general_readout = GeneralReadout::new();

	let cpu = general_readout.cpu_model_name().unwrap();
	let username = general_readout.username().unwrap();
	let hostname = general_readout.hostname().unwrap();
	let os = general_readout.os_name().unwrap();

	println!("");
	println!("            {}@{}", username, hostname);
	println!("     (o<    {}", os);
	println!("  ~~<__)~~  {}", cpu);
	println!("");
}
