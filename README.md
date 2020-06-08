# scaf

scaf cli tool to generate component's boilerplate. Basically it will take component name and generate folders and respective files.

## Usage

Run following script to generate boilerplate for `React` component.

```bash
scaf Avatar --dir src/components --typescript
```

## options

- first argument will be component name
- `--dir` default it will create files at root directory if you specified --dir name then it will create files at specific directory.
- `--typescript` it will generate .ts/.tsx files
