#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <limits.h>
#include <sys/utsname.h>

int main() {

	char *os;

	#if defined(__linux__)
		struct utsname info;
		if(uname(&info) < 0) {
			os = "Linux";
		}
		os = info.sysname;
	#elif defined(__APPLE__) || defined(__MACH__)
		//os = "macOS";
		struct utsname info;
		if(uname(&info) < 0) {
			os = "err";
		}
		os = info.sysname;
	#elif defined(_WIN32) || defined(_WIN64) || defined(__CYGWIN__)
		os = "Windows";
	#elif defined(__FreeBSD__)
		os = "BSD";
	#endif

	char hostname[16];
	char username[16];
	gethostname(hostname, 16);
	getlogin_r(username, 16);

	printf("\n");
	printf("            %s\n", username);
	printf("     (o<    %s\n", hostname);
	printf("  ~~<__)~~  %s\n", os);
	printf("\n");
	return 0;
}
