App development guide
---------------------

### Code styling
To validate code styling, please use a jscs linter in your editor which uses the .jscsrc file located in the root of this repository.

### Boilerplates (todo)
Several boilerplates are available throughout the codebase.

### Stylesheets
You can find them in client/stylesheets. We're using Sass' indented syntax.

### Component structure
We're using **TouchstoneJS** for view management and **meteor:react-meteor-data** to provide data to components using containers. Views, containers and components are located respectively in imports/views, imports/containers and imports/components. The following chart shows how to use them all together (todo).
