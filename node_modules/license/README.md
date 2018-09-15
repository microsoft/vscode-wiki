license
=======

####TODO: much better docs

###a port / rip-off of [lice](https://github.com/jcarbaugh/lice) by [jcarbaugh](https://github.com/jcarbaugh), largely done as a (node/javascript) learning exercise.

npm module to generate common FOSS licenses with a cli
```
Usage: license [-h]
license [-l]
license [ -o [OWNER] -p [PROJECT] -y [YEAR] ] [license]
license [--config[.key <VALUE>]]
license [--header]

Options:
  -h, --help          show this help menu                                                                                     
  -l, --list          list all available license templates                                                                    
  -o, --organization  the organisation/owner that holds the copy[right,left]    [default: git user.name || env.USER]
  -p, --project       the name of the project                                   [default: current directory]
  -y, --year          copyright year                                            [default: current year]
  --config            set default values: usage --config.key value
 available:[year], [project], [licenseType], [organisation]
  --header            just get the license header                                                                             
```


##Installation

```
npm install license
```

##Contribution

Is **Very** welcome. Thanks :)
