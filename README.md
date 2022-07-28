```console
chi@blossom:~ $ duckfetch
        
   (o<  
~~<__)~~

user: chi
sys: blossom
os: debian

```

# Duckfetch
Duckfetch is a simple, multiplatform system fetcher built with NodeJS. It has been tested with Windows, macOS, Raspberry Pi OS/Debian, and EndeavourOS. It has untested support for most, if not all BSD and Linux distributions.

# Configuration
Duckfetch's output can be altered through a few optional flags, outlined in the help menu, visible with `duckfetch -h` or `duckfetch --help`. The flags can be combined to work concurrently. The addition options are as follows:
- `-h/--help`: Display help menu
- `-f/--flatten`: Prints horizontally as opposed to vertically

                 user: chiyeon
           (o<   sys: endeavorpad
        ~~<__)~~ os: endeavouros
        
- `-s/--simple`: Removes some of the output

           (o<  
        ~~<__)~~

        chiyeon
        endeavorpad
        endeavouros

- `-c/--center`: Centers the output

               (o<      
            ~~<__)~~    

          user: chiyeon  
        sys: endeavorpad
         os: endeavouros
      
- Example of more than one flag:

        ~ duckfetch -sc

            (o<   
         ~~<__)~~ 

          chiyeon  
        endeavorpad
        endeavouros
