#How to use

##Adding new entity
First of all you need to define an interface for new entity.

1 - Go to `src/lib/` change `sample` folder name to whatever you want for it.

1 - Create your new interface file in `src/lib/<YOUR_LIB_NAME>/interfaces/models` then export it from `index.ts` file.

1- You need to add new entity service in `src/lib/<YOUR_LIB_NAME>/interfaces/services`, for CRUD operations can have an interface that extends `ICRUDService<T>`, Don't forget to export it from `index.ts` file.

1- Add the new interface symbol to `types/index.ts` file.
