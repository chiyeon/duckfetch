#if defined(unix) || defined(__unix__) || defined(__unix)
# define PREDEF_PLATFORM_UNIX
#endif

#include <stdio.h>
#include <unistd.h>
#include <limits.h>

int main() {

	char *os;

	#if defined(__linux__)
		os = "Linux";
		// TODO get distribution
	#elif defined(__APPLE__) || defined(__MACH__)
		os = "macOS";
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
	return 0;
}
